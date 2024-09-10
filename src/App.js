import logo from './logo.svg';
import './App.css';
import { useEffect, useState,useContext,CSSProperties  } from 'react';
import PocketBase from 'pocketbase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FilterContext } from './context/filterContext';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './baseurl';
import { useLocation } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
const override= {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function App() {
const [peopleData,setPeopleData]=useState([])
let [loading, setLoading] = useState(true);
let [color, setColor] = useState("#ffffff");

  const [people, setPeople] = useState(peopleData);
  const [tags, setTags] = useState([])
  const [selectedTag, setSelectedTag] = useState("All");
  const [startIndex,setStartIndex]=useState(1)
  const [endIndex,setEndIndex]=useState(4)
  const [bots,setBots]=useState([])
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedGenderAll, setSelectedGenderAll] = useState(null);
  const [selectedRecentHits, setSelectedRecentHits] = useState(null);

  const { filter, setFilter } = useContext(FilterContext);
  let navigate=useNavigate();
let pb=new PocketBase('http://data.gmini.ai');
  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };
  const handleSelect = (menu, option) => {
    if (menu === 'recentHits') {
      setSelectedRecentHits(option);
    } else if (menu === 'genderAll') {
      setSelectedGenderAll(option);
    }
    setOpenDropdown(null); // Close dropdown after selection
  };

  const clearAll = () => {
    setSelectedRecentHits(null);
    setSelectedGenderAll(null);
    fetchBotsAgain()
  setSelectedTag("All")
  };
  const truncateText = (text, maxWords) => {
    const words = text?.split(' ');
    if (words?.length <= maxWords) return text;
    return `${words?.slice(0, maxWords).join(' ')}...`;
  };
  const handleLikeToggle = (id) => {
    setPeople(prevPeople =>
      prevPeople.map(person =>
        person.id === id ? { ...person, liked: !person.liked } : person
      )
    );
  };
let location=useLocation();
  useEffect(()=>{
const fetchBots=async()=>{
  try{
    console.log(pb)
    console.log("PB")
 if(pb){
  const records = await pb.collection('user_modes').getFullList();
  const resultList = await pb.collection('Chatbots').getList(1,50);
  const recordsTags = await pb.collection('tags').getFullList();
  setTags(recordsTags)
 
  let updateResultList = resultList.items.map((val) => {
    
let eachtags=val?.Tags?.map((tag,index)=>{ 
return recordsTags?.filter(u=>u.id==tag)
})
return {
  ...val,
  Pic: `http://data.gmini.ai/api/files/yttfv3r7vgmd959/${val.id}/${val.Pic}`,
 Tags:eachtags
};
  });
  console.log("UPDATED RESULT")
  console.log(updateResultList)
  setBots(updateResultList)

console.log("resultList")

 }
  }catch(e){

  }
}
fetchBots();

  },[])

  useEffect(()=>{
 const loginGoogle=async()=>{
  let params=new URLSearchParams(location.search)
  let code=params.get('code')
  if(code){
    let codeVerifer=JSON.parse(localStorage.getItem('googleData'))
    const authData = pb.collection('users').authWithOAuth2Code(
      'google',
        code,
       codeVerifer.coderVerifier,
     "http://localhost:3000"
       ).then((authdata)=>{
        console.log("AUTHDATA")
        console.log(authdata)
        localStorage.setItem('user',JSON.stringify(authdata))
         
       }).catch(err=>{

      
        
       })
  }
  
 }
 loginGoogle();
  },[])
  const fetchBots=async()=>{
  try{
    console.log(pb)
    console.log("PB")
 if(pb){
  const records = await pb.collection('user_modes').getFullList();
  const resultList = await pb.collection('Chatbots').getList(1,50);
  setBots(resultList.items)

console.log("resultList")
console.log(resultList)
 }
  }catch(e){

  }
}
  
  const fetchMoreItems = async () => {
    try {
      console.log('Fetching more items...');
      const records = await pb.collection('user_modes').getFullList();
      const resultList = await pb.collection('Chatbots').getList(startIndex, endIndex);
      setBots((prevBots) => [...prevBots, ...resultList.items]);
      setStartIndex((prev) => prev + 4);
      setEndIndex((prev) => prev + 4);
    } catch (e) {
      console.error('Failed to fetch items', e);
    }
  };


  const fetchBotsAgain=async()=>{
    try{
      console.log(pb)
      console.log("PB")
   if(pb){
    const records = await pb.collection('user_modes').getFullList();
    const resultList = await pb.collection('Chatbots').getList(1,50);
     const recordsTags = await pb.collection('tags').getFullList();
     let updateResultList = resultList.items.map((val) => {
    
      let eachtags=val?.Tags?.map((tag,index)=>{ 
      return recordsTags?.filter(u=>u.id==tag)
      })
      return {
        ...val,
        Pic: `http://data.gmini.ai/api/files/yttfv3r7vgmd959/${val.id}/${val.Pic}`,
       Tags:eachtags
      };
        });
    setBots(updateResultList)
  
  console.log("resultList")
  console.log(resultList)
   }
    }catch(e){
  
    }
  }

  const fetchAccordingToTags = async (tag) => {
    try {
    
        setSelectedTag(tag);
        const resultList = await pb.collection('Chatbots').getList(1, 50, {
          filter: `Tags?~"${tag}"`,
        });
        const recordsTags = await pb.collection('tags').getFullList();
        let updateResultList = resultList.items.map((val) => {
       
         let eachtags=val?.Tags?.map((tag,index)=>{ 
         return recordsTags?.filter(u=>u.id==tag)
         })
         return {
           ...val,
           Pic: `http://data.gmini.ai/api/files/yttfv3r7vgmd959/${val.id}/${val.Pic}`,
          Tags:eachtags
         };
           });
        console.log(resultList)
    setBots(updateResultList)

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

const fetchAccordingToName = async (tag) => {
  try {
      setSelectedTag(tag);
      const resultList = await pb.collection('Chatbots').getList(1, 50, {
        filter: `Name="${tag}"`,
      });
      let updateResultList = resultList.items.map((val) => {
        return {
          ...val,
          Pic: `http://data.gmini.ai/api/files/yttfv3r7vgmd959/${val.id}/${val.Pic}`
        };
      });
      console.log(resultList)
  setBots(updateResultList)

  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
  }
};

useEffect(()=>{
  fetchAccordingToName (filter)
},[filter])
  return (
    <>
    <ToastContainer/>
    
    <div className=" text-white py-[3rem] gap-[3rem] flex flex-col text-sm min-h-[100vh] max-h-[scrollable]">
     
      <div className='flex justify-center gap-[3rem]'>

        <button className="w-[10rem] h-[3rem] rounded-[5rem] bg-[#C4B8F9] hover:bg-[#AB9BFE] text-black font-semibold py-2 px-4 ">
          Characters
        </button>
        <button className="w-[10rem] h-[3rem] rounded-[5rem] bg-[#030308]  text-white font-semibold py-2 px-4 ">
         Memories
        </button>

      </div>
      <div className='xl:px-[2rem] px-[20px] border-none'>
        <div className='flex xl:flex-row flex-col gap-[40px] justify-between'>
          <div className='flex flex-row gap-[1rem] overflow-x-auto tags no-scrollbar'>
            <div className='flex flex-row gap-[0.5rem]'>
              {tags?.map((tag, i) => {
                const isSelected = selectedTag === tag?.id;
                return (
                  <div
                    className={`text-center justify-center items-center flex px-4 h-[2rem] rounded-[5rem] hover:cursor-pointer 
              ${isSelected ? 'bg-[#AB9BFE] text-black' : 'bg-[#25273F] text-white hover:bg-[#AB9BFE] hover:text-black'}`}
                    key={i.toString()}
                    onClick={() => fetchAccordingToTags(tag?.id)}
                  >
                    <p>{tag?.Tag}</p>
                  </div>
                );
              })}


            </div>
            <p className='underline flex items-center text-[#AB9BFE] hover:cursor-pointer'>View All</p>
          </div>
          <div className='flex flex-row gap-[0.5rem]'>
            <div className="relative inline-block w-fit">
              <div
                className='bg-[#030308] border border-[#25273F] text-center justify-center items-center px-[20px] py-[10px] flex text-[12px] rounded-[5rem] cursor-pointer'
                onClick={() => toggleDropdown('recentHits')}
              >
                <p>{selectedRecentHits || 'Recent Hits'}</p>
              </div>
              {openDropdown === 'recentHits' && (
                <div className='absolute z-[9999] mt-2 bg-[#030308] border border-[#25273F] rounded-md w-fit p-2'>
                  <p className='hover:bg-[#25273F] px-4 py-2 cursor-pointer' onClick={() => handleSelect('recentHits', 'Option 1')}>Option 1</p>
                  <p className='hover:bg-[#25273F] px-4 py-2 cursor-pointer' onClick={() => handleSelect('recentHits', 'Option 2')}>Option 2</p>
                  <p className='hover:bg-[#25273F] px-4 py-2 cursor-pointer' onClick={() => handleSelect('recentHits', 'Option 3')}>Option 3</p>
                </div>
              )}
            </div>

            <div className="relative inline-block w-fit">
              <div
                className='bg-[#030308] border border-[#25273F] text-center justify-center items-center flex px-[20px] py-[10px] rounded-[5rem] text-[12px] cursor-pointer'
                onClick={() => toggleDropdown('genderAll')}
              >
                <p>{selectedGenderAll || 'Gender All'}</p>
              </div>
              {openDropdown === 'genderAll' && (
                <div className='absolute z-[9999] mt-2 bg-[#030308] border border-[#25273F] rounded-md w-fit p-2'>
                  <p className='hover:bg-[#25273F] px-4 py-2 cursor-pointer' onClick={() => handleSelect('genderAll', 'Male')}>Male</p>
                  <p className='hover:bg-[#25273F] px-4 py-2 cursor-pointer' onClick={() => handleSelect('genderAll', 'Female')}>Female</p>
                  <p className='hover:bg-[#25273F] px-4 py-2 cursor-pointer' onClick={() => handleSelect('genderAll', 'All')}>All</p>
                </div>
              )}
            </div>

            <p className='underline text-[#AB9BFE] flex items-center cursor-pointer' onClick={clearAll}>Clear All</p>
          </div>
        </div>

      </div>
      <div className='w-full lg:px-[20px]'>
        <div className='grid bg-gradient-to-r from-[#1d162d] to-[#422066] xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 border border-[#25273F] p-[20px] gap-[6px] lg:gap-[20px] rounded-[24px]'>
          {
           bots?.length>0?bots?.map(pep => {
              return (
                <div onClick={()=>{
                  navigate(`/aiprofile?id=${pep?.id}`)
                }} className='card bg-gradient-to-r cursor-pointer from-[#1d162d] to-[#422066] w-full flex flex-col gap-[6px] rounded-[20px] border relative'>
                  <div className='w-full h-[190px] relative'>
                    <img src={pep?.Pic} alt="img" className='w-full h-full object-cover border-t rounded-t-[20px]' />
                    <div className='absolute w-full flex items-center justify-between top-0 left-0 p-[10px]'>
                      <span
                        className='hover:cursor-pointer'
                        onClick={() => handleLikeToggle(pep?.id)}
                      >
                        {pep?.liked ? (
                          <svg width="24px" height="24px" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        ) : (
                          <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 20.476C11.4251 20.4765 10.8622 20.3118 10.3782 20.0015C9.00522 19.1189 6.36467 17.3076 4.13108 15.096C1.39002 12.3797 0 9.82151 0 7.49071C0 5.87112 0.478902 4.38718 1.38508 3.19981C2.24439 2.0708 3.45826 1.2634 4.83169 0.907322C6.20511 0.551241 7.65837 0.66715 8.95799 1.23643C10.1212 1.7384 11.1586 2.58471 12 3.70782C12.8414 2.58196 13.8788 1.73565 15.042 1.23643C16.3416 0.66715 17.7949 0.551241 19.1683 0.907322C20.5417 1.2634 21.7556 2.0708 22.6149 3.19981C23.5211 4.38718 24 5.87112 24 7.49071C24 9.82151 22.61 12.3786 19.8689 15.0938C17.6353 17.3054 14.9959 19.1167 13.6218 19.9993C13.1381 20.3103 12.5751 20.4758 12 20.476ZM6.40696 2.0811C5.97257 2.0807 5.54006 2.13796 5.12073 2.25135C4.06827 2.54029 3.13944 3.16607 2.47634 4.03295C1.75469 4.97867 1.373 6.17483 1.373 7.4929C1.373 9.44366 2.62572 11.6734 5.09712 14.1206C7.23899 16.2438 9.79112 17.9925 11.1202 18.8438C11.3826 19.0114 11.6875 19.1005 11.9989 19.1005C12.3103 19.1005 12.6152 19.0114 12.8776 18.8438C14.2067 17.9903 16.7566 16.2416 18.9007 14.1206C21.3721 11.6734 22.6248 9.44366 22.6248 7.4929C22.6248 6.17483 22.2431 4.98087 21.5215 4.03295C20.8584 3.16607 19.9295 2.54029 18.8771 2.25135C17.0005 1.74169 14.3638 2.27441 12.5898 5.2983C12.5294 5.40164 12.4429 5.48735 12.339 5.54691C12.2352 5.60648 12.1175 5.63781 11.9978 5.63781C11.8781 5.63781 11.7604 5.60648 11.6566 5.54691C11.5527 5.48735 11.4662 5.40164 11.4058 5.2983C10.0119 2.91807 8.08092 2.0811 6.40696 2.0811Z" fill="white" />
                          </svg>
                        )}
                      </span>
                      <span className='lg:flex hidden gap-[6px]  px-[20px] py-[10px] items-center border-transparent border rounded-[20px] bg-[#00000087]'>
                        <span className='flex gap-[4px] ms-basitems-center text-white text-[16px]'>
                          <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9777 0.0520933C11.3347 3.88125e-08 10.534 0 9.51371 0H6.48635C5.46607 0 4.66532 3.88125e-08 4.02234 0.0520933C3.36746 0.106419 2.82643 0.216559 2.33675 0.466606C1.53153 0.876867 0.876868 1.53153 0.466606 2.33675C0.216559 2.82643 0.106419 3.36745 0.0528374 4.02234C-1.66339e-08 4.66532 0 5.46607 0 6.48635V9.65808C0 10.1 0.087044 10.5376 0.256162 10.9459C0.425281 11.3542 0.673161 11.7252 0.985651 12.0377C1.61675 12.6688 2.47271 13.0233 3.36522 13.0233H3.81248C3.99778 13.0233 4.12429 13.2101 4.05583 13.382C3.54457 14.659 5.01583 15.814 6.13509 15.0148L8.07817 13.6268L8.11538 13.6008C8.64274 13.2291 9.27116 13.0276 9.91632 13.0233H10.4789C11.6317 13.0233 12.3342 13.0233 12.9251 12.8507C13.6133 12.6489 14.2398 12.2773 14.7469 11.7702C15.2541 11.263 15.6256 10.6366 15.8274 9.94832C16.0001 9.35743 16.0001 8.65492 16.0001 7.50217V6.48635C16.0001 5.46607 16.0001 4.66532 15.948 4.02234C15.8936 3.36745 15.7835 2.82643 15.5335 2.33675C15.1232 1.53153 14.4685 0.876867 13.6633 0.466606C13.1736 0.216559 12.6326 0.105675 11.9777 0.0520933ZM2.84355 1.46159C3.14941 1.30531 3.52746 1.21377 4.11313 1.16614C4.70551 1.11777 5.46011 1.11703 6.51165 1.11703H9.48841C10.5399 1.11703 11.2946 1.11703 11.8869 1.16614C12.4726 1.21377 12.8507 1.30605 13.1573 1.46159C13.7524 1.76499 14.2361 2.24902 14.5392 2.84429C14.6955 3.15015 14.787 3.5282 14.8347 4.11388C14.883 4.70625 14.8838 5.46086 14.8838 6.5124V7.39352C14.8838 8.68989 14.8778 9.21827 14.7558 9.63501C14.6066 10.1436 14.332 10.6065 13.9573 10.9813C13.5825 11.356 13.1196 11.6306 12.611 11.7798C12.1943 11.9018 11.6659 11.9078 10.3695 11.9078H9.90887C9.03578 11.9135 8.18532 12.1861 7.47166 12.6892L5.48691 14.1068C5.27407 14.2587 4.995 14.0399 5.09248 13.7973C5.17621 13.5882 5.20737 13.3617 5.18325 13.1377C5.15913 12.9138 5.08046 12.6992 4.95413 12.5127C4.82779 12.3262 4.65766 12.1735 4.45862 12.0681C4.25959 11.9626 4.03773 11.9076 3.81248 11.9078H3.36522C2.76877 11.9078 2.19674 11.6708 1.77498 11.2491C1.35322 10.8273 1.11628 10.2553 1.11628 9.65883V6.51165C1.11628 5.46011 1.11628 4.70551 1.1654 4.11313C1.21303 3.52746 1.30531 3.14941 1.46084 2.84355C1.76412 2.24816 2.24816 1.76486 2.84355 1.46159Z" fill="white" />
                            <path d="M5.76743 6.51164C5.76743 6.70902 5.68903 6.8983 5.54946 7.03787C5.4099 7.17743 5.22061 7.25583 5.02324 7.25583C4.82587 7.25583 4.63658 7.17743 4.49702 7.03787C4.35746 6.8983 4.27905 6.70902 4.27905 6.51164C4.27905 6.31427 4.35746 6.12499 4.49702 5.98542C4.63658 5.84586 4.82587 5.76746 5.02324 5.76746C5.22061 5.76746 5.4099 5.84586 5.54946 5.98542C5.68903 6.12499 5.76743 6.31427 5.76743 6.51164ZM8.74419 6.51164C8.74419 6.70902 8.66578 6.8983 8.52622 7.03787C8.38666 7.17743 8.19737 7.25583 8 7.25583C7.80263 7.25583 7.61334 7.17743 7.47378 7.03787C7.33421 6.8983 7.25581 6.70902 7.25581 6.51164C7.25581 6.31427 7.33421 6.12499 7.47378 5.98542C7.61334 5.84586 7.80263 5.76746 8 5.76746C8.19737 5.76746 8.38666 5.84586 8.52622 5.98542C8.66578 6.12499 8.74419 6.31427 8.74419 6.51164ZM11.7209 6.51164C11.7209 6.70902 11.6425 6.8983 11.503 7.03787C11.3634 7.17743 11.1741 7.25583 10.9768 7.25583C10.7794 7.25583 10.5901 7.17743 10.4505 7.03787C10.311 6.8983 10.2326 6.70902 10.2326 6.51164C10.2326 6.31427 10.311 6.12499 10.4505 5.98542C10.5901 5.84586 10.7794 5.76746 10.9768 5.76746C11.1741 5.76746 11.3634 5.84586 11.503 5.98542C11.6425 6.12499 11.7209 6.31427 11.7209 6.51164Z" fill="white" />
                          </svg>
                          {pep?.messages}
                        </span>
                        <span className='flex gap-[4px] items-center text-white text-[16px]'>
                          <svg width="24" height="24" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.93267 15.2026C1.74282 15.2018 1.55554 15.1586 1.38457 15.0761C1.175 14.9776 0.9977 14.8216 0.873302 14.6263C0.748904 14.431 0.682524 14.2044 0.681885 13.9728V2.02715C0.6828 1.86414 0.715932 1.70292 0.779374 1.55277C0.842817 1.40261 0.935318 1.26647 1.05156 1.15219C1.1678 1.03791 1.30549 0.947738 1.4567 0.886856C1.60791 0.825975 1.76967 0.795588 1.93267 0.797443H11.7703C12.0959 0.799288 12.4076 0.929438 12.6378 1.15965C12.868 1.38987 12.9982 1.70158 13 2.02715V13.9728C12.9954 14.1954 12.9306 14.4125 12.8123 14.601C12.694 14.7896 12.5268 14.9425 12.3285 15.0435C12.1301 15.1445 11.9081 15.1897 11.686 15.1744C11.464 15.1591 11.2502 15.0838 11.0676 14.9566L6.99202 11.8999C6.96211 11.876 6.92494 11.8629 6.88662 11.8629C6.8483 11.8629 6.81113 11.876 6.78122 11.8999L2.67049 14.9566C2.45717 15.1154 2.19858 15.2016 1.93267 15.2026ZM1.93267 1.85148C1.88608 1.85148 1.8414 1.86998 1.80845 1.90293C1.77551 1.93587 1.757 1.98056 1.757 2.02715V13.9728C1.75675 14.0054 1.76591 14.0372 1.78336 14.0647C1.80081 14.0921 1.82582 14.1139 1.85537 14.1274C1.88227 14.1459 1.91412 14.1557 1.94672 14.1557C1.97933 14.1557 2.01117 14.1459 2.03807 14.1274L6.1488 11.0567C6.36255 10.8992 6.6211 10.8142 6.88662 10.8142C7.15214 10.8142 7.41069 10.8992 7.62444 11.0567L11.7 14.1134C11.7269 14.1318 11.7588 14.1417 11.7914 14.1417C11.824 14.1417 11.8558 14.1318 11.8827 14.1134C11.9123 14.0998 11.9373 14.078 11.9548 14.0506C11.9722 14.0232 11.9814 13.9913 11.9811 13.9588V2.02715C11.9816 2.0008 11.9762 1.97467 11.9653 1.95069C11.9544 1.92672 11.9382 1.90551 11.9179 1.88864C11.8977 1.87177 11.8739 1.85967 11.8484 1.85323C11.8228 1.8468 11.7961 1.8462 11.7703 1.85148H1.93267Z" fill="white" />
                          </svg>

                          {pep?.bookmarked}
                        </span>
                        <span className='flex gap-[4px] items-center text-white text-[16px]'>
                          <svg width="24" height="24" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 13.1808C7.61674 13.1811 7.24145 13.0713 6.91881 12.8644C6.00348 12.276 4.24311 11.0685 2.75405 9.59412C0.926682 7.78323 0 6.07778 0 4.52391C0 3.44419 0.319268 2.4549 0.923387 1.66332C1.49626 0.910645 2.30551 0.372379 3.22113 0.134992C4.13674 -0.102395 5.10558 -0.0251227 5.97199 0.354395C6.74746 0.689041 7.43908 1.25325 8 2.00199C8.56091 1.25142 9.25254 0.68721 10.028 0.354395C10.8944 -0.0251227 11.8633 -0.102395 12.7789 0.134992C13.6945 0.372379 14.5037 0.910645 15.0766 1.66332C15.6807 2.4549 16 3.44419 16 4.52391C16 6.07778 15.0733 7.7825 13.2459 9.59266C11.7569 11.0671 9.99725 12.2746 9.08119 12.863C8.75871 13.0703 8.38341 13.1807 8 13.1808ZM4.2713 0.917508C3.98171 0.917247 3.69337 0.955414 3.41382 1.03101C2.71218 1.22364 2.09296 1.64082 1.65089 2.21874C1.16979 2.84922 0.915332 3.64666 0.915332 4.52538C0.915332 5.82588 1.75048 7.31238 3.39808 8.94387C4.82599 10.3593 6.52741 11.5251 7.41346 12.0926C7.5884 12.2044 7.79167 12.2638 7.99927 12.2638C8.20687 12.2638 8.41013 12.2044 8.58508 12.0926C9.47112 11.5236 11.1711 10.3579 12.6005 8.94387C14.2481 7.31238 15.0832 5.82588 15.0832 4.52538C15.0832 3.64666 14.8287 2.85069 14.3476 2.21874C13.9056 1.64082 13.2864 1.22364 12.5847 1.03101C11.3336 0.691238 9.57583 1.04639 8.39323 3.06231C8.35291 3.1312 8.29527 3.18835 8.22603 3.22805C8.15679 3.26776 8.07836 3.28865 7.99854 3.28865C7.91872 3.28865 7.84029 3.26776 7.77104 3.22805C7.7018 3.18835 7.64416 3.1312 7.60384 3.06231C6.6746 1.47549 5.38728 0.917508 4.2713 0.917508Z" fill="white" />
                          </svg>


                          {pep?.likes}
                        </span>
                      </span>
                    </div>
                    <span className='flex lg:hidden sm:w-full absolute bottom-0 right-0 gap-[6px] max-w-[160px] px-[20px] py-[10px] items-center border-transparent border rounded-[20px] bg-[#00000087]'>
                        <span className='flex gap-[4px] ms-basitems-center text-white text-[12px]'>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9777 0.0520933C11.3347 3.88125e-08 10.534 0 9.51371 0H6.48635C5.46607 0 4.66532 3.88125e-08 4.02234 0.0520933C3.36746 0.106419 2.82643 0.216559 2.33675 0.466606C1.53153 0.876867 0.876868 1.53153 0.466606 2.33675C0.216559 2.82643 0.106419 3.36745 0.0528374 4.02234C-1.66339e-08 4.66532 0 5.46607 0 6.48635V9.65808C0 10.1 0.087044 10.5376 0.256162 10.9459C0.425281 11.3542 0.673161 11.7252 0.985651 12.0377C1.61675 12.6688 2.47271 13.0233 3.36522 13.0233H3.81248C3.99778 13.0233 4.12429 13.2101 4.05583 13.382C3.54457 14.659 5.01583 15.814 6.13509 15.0148L8.07817 13.6268L8.11538 13.6008C8.64274 13.2291 9.27116 13.0276 9.91632 13.0233H10.4789C11.6317 13.0233 12.3342 13.0233 12.9251 12.8507C13.6133 12.6489 14.2398 12.2773 14.7469 11.7702C15.2541 11.263 15.6256 10.6366 15.8274 9.94832C16.0001 9.35743 16.0001 8.65492 16.0001 7.50217V6.48635C16.0001 5.46607 16.0001 4.66532 15.948 4.02234C15.8936 3.36745 15.7835 2.82643 15.5335 2.33675C15.1232 1.53153 14.4685 0.876867 13.6633 0.466606C13.1736 0.216559 12.6326 0.105675 11.9777 0.0520933ZM2.84355 1.46159C3.14941 1.30531 3.52746 1.21377 4.11313 1.16614C4.70551 1.11777 5.46011 1.11703 6.51165 1.11703H9.48841C10.5399 1.11703 11.2946 1.11703 11.8869 1.16614C12.4726 1.21377 12.8507 1.30605 13.1573 1.46159C13.7524 1.76499 14.2361 2.24902 14.5392 2.84429C14.6955 3.15015 14.787 3.5282 14.8347 4.11388C14.883 4.70625 14.8838 5.46086 14.8838 6.5124V7.39352C14.8838 8.68989 14.8778 9.21827 14.7558 9.63501C14.6066 10.1436 14.332 10.6065 13.9573 10.9813C13.5825 11.356 13.1196 11.6306 12.611 11.7798C12.1943 11.9018 11.6659 11.9078 10.3695 11.9078H9.90887C9.03578 11.9135 8.18532 12.1861 7.47166 12.6892L5.48691 14.1068C5.27407 14.2587 4.995 14.0399 5.09248 13.7973C5.17621 13.5882 5.20737 13.3617 5.18325 13.1377C5.15913 12.9138 5.08046 12.6992 4.95413 12.5127C4.82779 12.3262 4.65766 12.1735 4.45862 12.0681C4.25959 11.9626 4.03773 11.9076 3.81248 11.9078H3.36522C2.76877 11.9078 2.19674 11.6708 1.77498 11.2491C1.35322 10.8273 1.11628 10.2553 1.11628 9.65883V6.51165C1.11628 5.46011 1.11628 4.70551 1.1654 4.11313C1.21303 3.52746 1.30531 3.14941 1.46084 2.84355C1.76412 2.24816 2.24816 1.76486 2.84355 1.46159Z" fill="white" />
                            <path d="M5.76743 6.51164C5.76743 6.70902 5.68903 6.8983 5.54946 7.03787C5.4099 7.17743 5.22061 7.25583 5.02324 7.25583C4.82587 7.25583 4.63658 7.17743 4.49702 7.03787C4.35746 6.8983 4.27905 6.70902 4.27905 6.51164C4.27905 6.31427 4.35746 6.12499 4.49702 5.98542C4.63658 5.84586 4.82587 5.76746 5.02324 5.76746C5.22061 5.76746 5.4099 5.84586 5.54946 5.98542C5.68903 6.12499 5.76743 6.31427 5.76743 6.51164ZM8.74419 6.51164C8.74419 6.70902 8.66578 6.8983 8.52622 7.03787C8.38666 7.17743 8.19737 7.25583 8 7.25583C7.80263 7.25583 7.61334 7.17743 7.47378 7.03787C7.33421 6.8983 7.25581 6.70902 7.25581 6.51164C7.25581 6.31427 7.33421 6.12499 7.47378 5.98542C7.61334 5.84586 7.80263 5.76746 8 5.76746C8.19737 5.76746 8.38666 5.84586 8.52622 5.98542C8.66578 6.12499 8.74419 6.31427 8.74419 6.51164ZM11.7209 6.51164C11.7209 6.70902 11.6425 6.8983 11.503 7.03787C11.3634 7.17743 11.1741 7.25583 10.9768 7.25583C10.7794 7.25583 10.5901 7.17743 10.4505 7.03787C10.311 6.8983 10.2326 6.70902 10.2326 6.51164C10.2326 6.31427 10.311 6.12499 10.4505 5.98542C10.5901 5.84586 10.7794 5.76746 10.9768 5.76746C11.1741 5.76746 11.3634 5.84586 11.503 5.98542C11.6425 6.12499 11.7209 6.31427 11.7209 6.51164Z" fill="white" />
                          </svg>
                          {pep?.messages}
                        </span>
                        <span className='flex gap-[4px] items-center text-white text-[12px]'>
                          <svg width="16" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.93267 15.2026C1.74282 15.2018 1.55554 15.1586 1.38457 15.0761C1.175 14.9776 0.9977 14.8216 0.873302 14.6263C0.748904 14.431 0.682524 14.2044 0.681885 13.9728V2.02715C0.6828 1.86414 0.715932 1.70292 0.779374 1.55277C0.842817 1.40261 0.935318 1.26647 1.05156 1.15219C1.1678 1.03791 1.30549 0.947738 1.4567 0.886856C1.60791 0.825975 1.76967 0.795588 1.93267 0.797443H11.7703C12.0959 0.799288 12.4076 0.929438 12.6378 1.15965C12.868 1.38987 12.9982 1.70158 13 2.02715V13.9728C12.9954 14.1954 12.9306 14.4125 12.8123 14.601C12.694 14.7896 12.5268 14.9425 12.3285 15.0435C12.1301 15.1445 11.9081 15.1897 11.686 15.1744C11.464 15.1591 11.2502 15.0838 11.0676 14.9566L6.99202 11.8999C6.96211 11.876 6.92494 11.8629 6.88662 11.8629C6.8483 11.8629 6.81113 11.876 6.78122 11.8999L2.67049 14.9566C2.45717 15.1154 2.19858 15.2016 1.93267 15.2026ZM1.93267 1.85148C1.88608 1.85148 1.8414 1.86998 1.80845 1.90293C1.77551 1.93587 1.757 1.98056 1.757 2.02715V13.9728C1.75675 14.0054 1.76591 14.0372 1.78336 14.0647C1.80081 14.0921 1.82582 14.1139 1.85537 14.1274C1.88227 14.1459 1.91412 14.1557 1.94672 14.1557C1.97933 14.1557 2.01117 14.1459 2.03807 14.1274L6.1488 11.0567C6.36255 10.8992 6.6211 10.8142 6.88662 10.8142C7.15214 10.8142 7.41069 10.8992 7.62444 11.0567L11.7 14.1134C11.7269 14.1318 11.7588 14.1417 11.7914 14.1417C11.824 14.1417 11.8558 14.1318 11.8827 14.1134C11.9123 14.0998 11.9373 14.078 11.9548 14.0506C11.9722 14.0232 11.9814 13.9913 11.9811 13.9588V2.02715C11.9816 2.0008 11.9762 1.97467 11.9653 1.95069C11.9544 1.92672 11.9382 1.90551 11.9179 1.88864C11.8977 1.87177 11.8739 1.85967 11.8484 1.85323C11.8228 1.8468 11.7961 1.8462 11.7703 1.85148H1.93267Z" fill="white" />
                          </svg>

                          {pep?.bookmarked}
                        </span>
                        <span className='flex gap-[4px] items-center text-white text-[12px]'>
                          <svg width="16" height="16" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 13.1808C7.61674 13.1811 7.24145 13.0713 6.91881 12.8644C6.00348 12.276 4.24311 11.0685 2.75405 9.59412C0.926682 7.78323 0 6.07778 0 4.52391C0 3.44419 0.319268 2.4549 0.923387 1.66332C1.49626 0.910645 2.30551 0.372379 3.22113 0.134992C4.13674 -0.102395 5.10558 -0.0251227 5.97199 0.354395C6.74746 0.689041 7.43908 1.25325 8 2.00199C8.56091 1.25142 9.25254 0.68721 10.028 0.354395C10.8944 -0.0251227 11.8633 -0.102395 12.7789 0.134992C13.6945 0.372379 14.5037 0.910645 15.0766 1.66332C15.6807 2.4549 16 3.44419 16 4.52391C16 6.07778 15.0733 7.7825 13.2459 9.59266C11.7569 11.0671 9.99725 12.2746 9.08119 12.863C8.75871 13.0703 8.38341 13.1807 8 13.1808ZM4.2713 0.917508C3.98171 0.917247 3.69337 0.955414 3.41382 1.03101C2.71218 1.22364 2.09296 1.64082 1.65089 2.21874C1.16979 2.84922 0.915332 3.64666 0.915332 4.52538C0.915332 5.82588 1.75048 7.31238 3.39808 8.94387C4.82599 10.3593 6.52741 11.5251 7.41346 12.0926C7.5884 12.2044 7.79167 12.2638 7.99927 12.2638C8.20687 12.2638 8.41013 12.2044 8.58508 12.0926C9.47112 11.5236 11.1711 10.3579 12.6005 8.94387C14.2481 7.31238 15.0832 5.82588 15.0832 4.52538C15.0832 3.64666 14.8287 2.85069 14.3476 2.21874C13.9056 1.64082 13.2864 1.22364 12.5847 1.03101C11.3336 0.691238 9.57583 1.04639 8.39323 3.06231C8.35291 3.1312 8.29527 3.18835 8.22603 3.22805C8.15679 3.26776 8.07836 3.28865 7.99854 3.28865C7.91872 3.28865 7.84029 3.26776 7.77104 3.22805C7.7018 3.18835 7.64416 3.1312 7.60384 3.06231C6.6746 1.47549 5.38728 0.917508 4.2713 0.917508Z" fill="white" />
                          </svg>


                          {pep?.likes}
                        </span>
                      </span>
                  </div>
                  <div className='flex px-[10px] justify-between lg:items-center lg:flex-row flex-col gap-[4px] mt-[20px]'>
                    <p className='text-white text-[16px] font-semibold m-0'>{pep?.Name}</p>
                    <p className='text-white m-0 text-[12px]'>@{pep?.Name}</p>
                  </div>
                  <p className='text-white text-[14px] m-0 px-[10px] '>
                    {truncateText(pep?.Description, 10)}
                  </p>
                  <div className='flex gap-[10px] items-center p-[10px] lg:px-[20px] py-[20px]'>
                  {pep?.Tags?.map((tag,j)=>{
                    
                    return <span key={j.toString()} className='rounded-[20px] px-[10px] py-[6px] text-[16px] border'>
                   {tag[j]?.Tag}
                  </span>
                  })}
                  </div>
                </div>
              )
            })
          :'No results'}
        </div>

      </div>
    </div >
    </>
  );
}

export default App;
