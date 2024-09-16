import { useEffect, useState } from "react";
import "./Botprofile.css"
import "./chat.css"
import SliderComponent from "./components/sliderComponent";
import PocketBase from 'pocketbase';
import { useLocation, useNavigate } from "react-router-dom";

export default function BotProfile() {
    const [chatType, setChatType] = useState("comments");
    const [openDropdown, setOpenDropdown] = useState(null);
    const [Comments, setComments] = useState('Popular');
    const [currentBot, setCurrentBot] = useState()
    let location = useLocation();
    const pb = new PocketBase('http://data.gmini.ai');
    let navigate = useNavigate()

    const toggleDropdown = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    const handleSelect = (option) => {
        setComments(option);
        setOpenDropdown(null);
    };
    const settypechat = (type) => {
        setChatType(type)
    }

    useEffect(() => {
        const getBotData = async () => {
            try {
                let params = new URLSearchParams(location.search)
                let id = params.get('id')
                let record = await pb.collection('Chatbots').getOne(id, {
                    expand: 'relField1,relField2.subRelField',
                });
                let tagrecord = record.Tags.map(async (val, i) => {
                    let tagsrecord = await pb.collection('tags').getOne(val, {
                        expand: 'relField1,relField2.subRelField',
                    });
                    return tagsrecord
                })
                record.Tags = []

                let tagsData = Promise.all(tagrecord).then((data) => {
                    data.map((val, i) => {
                        record = {
                            ...record,
                            Tags: [...record?.Tags, val.Tag]
                        }
                    })

                    setCurrentBot(record)
console.log("RECORD IS")
                    console.log(record)

                })



            } catch (e) {

            }
        }
        getBotData();
    }, [])

    const reduceDescription = (desc) => {
        if (desc?.length > 30) {
            return desc?.slice(0, 50) + '....'
        } else {
            return desc
        }
    }

    return (
        <div className="w-full h-[100vh]">
            <div className="desktop-aiprofile h-full">
                <div className="h-full w-full border-r-[1px] border-r-[#25273f]">
                    <div className="px-[10px] py-[20px] flex flex-col gap-[10px] bg-[#3a355793]">
                        <div className="w-full h-[200px] rounded-[20px]">
                            <img src={`http://data.gmini.ai/api/files/yttfv3r7vgmd959/${currentBot?.id}/` + currentBot?.Pic
                            } alt="img" className="w-full rounded-[20px] h-full object-cover" />
                        </div>
                        <div className="w-full space-x-2 flex-row flex items-center justify-center text-[12px] text-[#CFCFCF]">
                            @{currentBot?.Name}
                            <svg width={30} height={30} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#3d115a"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.5609 10.7386L20.2009 9.15859C19.9409 8.85859 19.7309 8.29859 19.7309 7.89859V6.19859C19.7309 5.13859 18.8609 4.26859 17.8009 4.26859H16.1009C15.7109 4.26859 15.1409 4.05859 14.8409 3.79859L13.2609 2.43859C12.5709 1.84859 11.4409 1.84859 10.7409 2.43859L9.17086 3.80859C8.87086 4.05859 8.30086 4.26859 7.91086 4.26859H6.18086C5.12086 4.26859 4.25086 5.13859 4.25086 6.19859V7.90859C4.25086 8.29859 4.04086 8.85859 3.79086 9.15859L2.44086 10.7486C1.86086 11.4386 1.86086 12.5586 2.44086 13.2486L3.79086 14.8386C4.04086 15.1386 4.25086 15.6986 4.25086 16.0886V17.7986C4.25086 18.8586 5.12086 19.7286 6.18086 19.7286H7.91086C8.30086 19.7286 8.87086 19.9386 9.17086 20.1986L10.7509 21.5586C11.4409 22.1486 12.5709 22.1486 13.2709 21.5586L14.8509 20.1986C15.1509 19.9386 15.7109 19.7286 16.1109 19.7286H17.8109C18.8709 19.7286 19.7409 18.8586 19.7409 17.7986V16.0986C19.7409 15.7086 19.9509 15.1386 20.2109 14.8386L21.5709 13.2586C22.1509 12.5686 22.1509 11.4286 21.5609 10.7386ZM16.1609 10.1086L11.3309 14.9386C11.1909 15.0786 11.0009 15.1586 10.8009 15.1586C10.6009 15.1586 10.4109 15.0786 10.2709 14.9386L7.85086 12.5186C7.56086 12.2286 7.56086 11.7486 7.85086 11.4586C8.14086 11.1686 8.62086 11.1686 8.91086 11.4586L10.8009 13.3486L15.1009 9.04859C15.3909 8.75859 15.8709 8.75859 16.1609 9.04859C16.4509 9.33859 16.4509 9.81859 16.1609 10.1086Z" fill="#311a65"></path> </g></svg>
                        </div>
                        <div className="w-full flex items-center justify-center text-[12px] text-center text-[#CFCFCF]">{reduceDescription(currentBot?.Description)}</div>
                        <div className="w-full flex items-center justify-center gap-[10px]">
                            {currentBot?.Tags?.map((tag, i) => {
                                return <span key={currentBot?.id + i} className='rounded-[20px] text-white px-[12px] border-[1px] border-[#CFCFCF] py-[6px] text-[12px] bg-[#433e64b5] '>
                                    {tag}
                                </span>
                            })}

                        </div>
                    </div>
                    <div className="w-full px-[10px] py-[20px]">
                        <p className="m-0 font-semibold text-[#AB9BFE] text-[20px]">Character Definition</p>
                        <div className="flex flex-col gap-[20px] mt-[20px] px-[20px]">
                            <div className="w-full flex flex-col gap-[10px]">
                                <p className=" font-semibold text-[16px] text-white">Greeting</p>
                                <p className="text-white text-[14px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>
                            </div>
                            <div className="w-full flex flex-col gap-[10px]">
                                <p className=" font-semibold text-[16px] text-white">Personality</p>
                                <p className="text-white text-[14px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                            </div>
                            <div className="w-full flex flex-col gap-[10px]">
                                <p className=" font-semibold text-[16px] text-white">Scenario</p>
                                <p className="text-white text-[14px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full ">
                    <div className="grid desktop-numbering px-[20px] py-[40px] bg-[#3a355729] border-b-[1px] border-b-[#25273f]">
                        <div className="flex flex-col gap-[20px]">
                            <p className="text-white font-semibold text-[14px]">Sharing a bed with your enemy</p>
                            <span className="grid grid-cols-3 items-center gap-[10px] bg-black px-[10px] py-[6px] rounded-[8px]">
                                <span className="flex gap-[4px] items-center">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9777 0.0520933C11.3347 3.88125e-08 10.534 0 9.51371 0H6.48635C5.46607 0 4.66532 3.88125e-08 4.02234 0.0520933C3.36746 0.106419 2.82643 0.216559 2.33675 0.466606C1.53153 0.876867 0.876868 1.53153 0.466606 2.33675C0.216559 2.82643 0.106419 3.36745 0.0528374 4.02234C-1.66339e-08 4.66532 0 5.46607 0 6.48635V9.65808C0 10.1 0.087044 10.5376 0.256162 10.9459C0.425281 11.3542 0.673161 11.7252 0.985651 12.0377C1.61675 12.6688 2.47271 13.0233 3.36522 13.0233H3.81248C3.99778 13.0233 4.12429 13.2101 4.05583 13.382C3.54457 14.659 5.01583 15.814 6.13509 15.0148L8.07817 13.6268L8.11538 13.6008C8.64274 13.2291 9.27116 13.0276 9.91632 13.0233H10.4789C11.6317 13.0233 12.3342 13.0233 12.9251 12.8507C13.6133 12.6489 14.2398 12.2773 14.7469 11.7702C15.2541 11.263 15.6256 10.6366 15.8274 9.94832C16.0001 9.35743 16.0001 8.65492 16.0001 7.50217V6.48635C16.0001 5.46607 16.0001 4.66532 15.948 4.02234C15.8936 3.36745 15.7835 2.82643 15.5335 2.33675C15.1232 1.53153 14.4685 0.876867 13.6633 0.466606C13.1736 0.216559 12.6326 0.105675 11.9777 0.0520933ZM2.84355 1.46159C3.14941 1.30531 3.52746 1.21377 4.11313 1.16614C4.70551 1.11777 5.46011 1.11703 6.51165 1.11703H9.48841C10.5399 1.11703 11.2946 1.11703 11.8869 1.16614C12.4726 1.21377 12.8507 1.30605 13.1573 1.46159C13.7524 1.76499 14.2361 2.24902 14.5392 2.84429C14.6955 3.15015 14.787 3.5282 14.8347 4.11388C14.883 4.70625 14.8838 5.46086 14.8838 6.5124V7.39352C14.8838 8.68989 14.8778 9.21827 14.7558 9.63501C14.6066 10.1436 14.332 10.6065 13.9573 10.9813C13.5825 11.356 13.1196 11.6306 12.611 11.7798C12.1943 11.9018 11.6659 11.9078 10.3695 11.9078H9.90887C9.03578 11.9135 8.18532 12.1861 7.47166 12.6892L5.48691 14.1068C5.27407 14.2587 4.995 14.0399 5.09248 13.7973C5.17621 13.5882 5.20737 13.3617 5.18325 13.1377C5.15913 12.9138 5.08046 12.6992 4.95413 12.5127C4.82779 12.3262 4.65766 12.1735 4.45862 12.0681C4.25959 11.9626 4.03773 11.9076 3.81248 11.9078H3.36522C2.76877 11.9078 2.19674 11.6708 1.77498 11.2491C1.35322 10.8273 1.11628 10.2553 1.11628 9.65883V6.51165C1.11628 5.46011 1.11628 4.70551 1.1654 4.11313C1.21303 3.52746 1.30531 3.14941 1.46084 2.84355C1.76412 2.24816 2.24816 1.76486 2.84355 1.46159Z" fill="white" />
                                    </svg>
                                    <p className="m-0 text-[10px] text-white">1.5K</p>
                                </span>
                                <span className="flex gap-[4px] items-center">
                                    <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.25078 15.2026C1.06094 15.2019 0.873657 15.1586 0.702688 15.0761C0.493115 14.9776 0.315815 14.8217 0.191417 14.6264C0.0670197 14.431 0.000639402 14.2044 0 13.9729V2.02718C0.000915636 1.86417 0.0340473 1.70295 0.0974897 1.5528C0.160932 1.40264 0.253433 1.26651 0.369674 1.15222C0.485915 1.03794 0.623601 0.947768 0.774814 0.886887C0.926028 0.826006 1.08779 0.795619 1.25078 0.797474H11.0884C11.414 0.799319 11.7257 0.929469 11.9559 1.15968C12.1861 1.3899 12.3163 1.70161 12.3181 2.02718V13.9729C12.3136 14.1954 12.2487 14.4125 12.1304 14.6011C12.0122 14.7896 11.8449 14.9426 11.6466 15.0435C11.4482 15.1445 11.2262 15.1898 11.0041 15.1745C10.7821 15.1592 10.5684 15.0839 10.3857 14.9566L6.31014 11.8999C6.28023 11.876 6.24305 11.863 6.20474 11.863C6.16642 11.863 6.12924 11.876 6.09933 11.8999L1.98861 14.9566C1.77528 15.1154 1.51669 15.2016 1.25078 15.2026ZM1.25078 1.85151C1.20419 1.85151 1.15951 1.87001 1.12657 1.90296C1.09362 1.9359 1.07511 1.98059 1.07511 2.02718V13.9729C1.07487 14.0054 1.08402 14.0373 1.10147 14.0647C1.11893 14.0921 1.14394 14.1139 1.17349 14.1275C1.20039 14.1459 1.23223 14.1558 1.26484 14.1558C1.29745 14.1558 1.32929 14.1459 1.35619 14.1275L5.46691 11.0567C5.68067 10.8992 5.93922 10.8142 6.20474 10.8142C6.47026 10.8142 6.72881 10.8992 6.94256 11.0567L11.0182 14.1134C11.045 14.1318 11.0769 14.1417 11.1095 14.1417C11.1421 14.1417 11.174 14.1318 11.2008 14.1134C11.2304 14.0999 11.2554 14.0781 11.2729 14.0506C11.2903 14.0232 11.2995 13.9913 11.2992 13.9588V2.02718C11.2998 2.00083 11.2944 1.9747 11.2834 1.95072C11.2725 1.92675 11.2563 1.90554 11.2361 1.88867C11.2158 1.8718 11.192 1.8597 11.1665 1.85326C11.1409 1.84683 11.1142 1.84623 11.0884 1.85151H1.25078Z" fill="white" />
                                    </svg>

                                    <p className="m-0 text-[10px] text-white">10K</p>
                                </span>
                                <span className="flex gap-[4px] items-center">
                                    <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.31836 13.1808C7.9351 13.1811 7.55981 13.0713 7.23717 12.8644C6.32184 12.276 4.56147 11.0685 3.07241 9.59412C1.24504 7.78323 0.318359 6.07778 0.318359 4.52391C0.318359 3.44419 0.637627 2.4549 1.24175 1.66332C1.81462 0.910645 2.62387 0.372379 3.53949 0.134992C4.4551 -0.102395 5.42394 -0.0251227 6.29035 0.354395C7.06582 0.689041 7.75744 1.25325 8.31836 2.00199C8.87927 1.25142 9.5709 0.68721 10.3464 0.354395C11.2128 -0.0251227 12.1816 -0.102395 13.0972 0.134992C14.0128 0.372379 14.8221 0.910645 15.395 1.66332C15.9991 2.4549 16.3184 3.44419 16.3184 4.52391C16.3184 6.07778 15.3917 7.7825 13.5643 9.59266C12.0752 11.0671 10.3156 12.2746 9.39955 12.863C9.07707 13.0703 8.70177 13.1807 8.31836 13.1808ZM4.58966 0.917508C4.30007 0.917247 4.01173 0.955414 3.73218 1.03101C3.03054 1.22364 2.41132 1.64082 1.96925 2.21874C1.48815 2.84922 1.23369 3.64666 1.23369 4.52538C1.23369 5.82588 2.06884 7.31238 3.71644 8.94387C5.14435 10.3593 6.84577 11.5251 7.73181 12.0926C7.90676 12.2044 8.11003 12.2638 8.31763 12.2638C8.52523 12.2638 8.72849 12.2044 8.90344 12.0926C9.78948 11.5236 11.4894 10.3579 12.9188 8.94387C14.5664 7.31238 15.4016 5.82588 15.4016 4.52538C15.4016 3.64666 15.1471 2.85069 14.666 2.21874C14.2239 1.64082 13.6047 1.22364 12.9031 1.03101C11.652 0.691238 9.89419 1.04639 8.71159 3.06231C8.67127 3.1312 8.61363 3.18835 8.54439 3.22805C8.47515 3.26776 8.39672 3.28865 8.31689 3.28865C8.23707 3.28865 8.15864 3.26776 8.0894 3.22805C8.02016 3.18835 7.96252 3.1312 7.9222 3.06231C6.99296 1.47549 5.70564 0.917508 4.58966 0.917508Z" fill="white" />
                                    </svg>

                                    <p className="m-0 text-[10px] text-white">25K</p>
                                </span>
                            </span>
                        </div>
                        <div className="grid grid-cols-3 py-[6px] px-[6px] bg-[#3a3557b5] rounded-[10px]">
                            <div className="flex flex-col  border-r-[1px] border-[#CFCFCF] px-[6px] gap-[10px] ">
                                <p className="text-white font-semibold text-[14px]">613</p>
                                <p className="text-[#CFCFCF] text-[12px]">Total Chars</p>
                            </div>
                            <div className="flex flex-col  border-r-[1px] border-[#CFCFCF] px-[6px] gap-[10px] ">
                                <p className="text-white font-semibold text-[14px]">07/10/24</p>
                                <p className="text-[#CFCFCF] text-[12px]">Create Time</p>
                            </div>
                            <div className="flex flex-col  px-[6px] gap-[10px]">
                                <p className="text-white font-semibold text-[14px]">07/10/24</p>
                                <p className="text-[#CFCFCF] text-[12px]">Update's Time</p>
                            </div>
                        </div>
                        <span onClick={(e) => {
                            navigate(`/chat?id=${currentBot?.id}`)
                        }} className="bg-[#bdb0f9] rounded-[20px] text-[14px] flex h-fit px-[10px] py-[6px] m-auto hover:cursor-pointer">Start Chat</span>
                    </div>
                    <div className="px-[20px] py-[40px] flex items-center justify-between w-full border-b-[1px] border-b-[#25273f]">
                        <div className="flex gap-[10px] items-center">
                            <span className="w-[60px]  h-[60px] rounded-[100%]">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s"
                                    alt="img"
                                    className="rounded-[100%] w-full h-full object-cover"
                                />
                            </span>
                            <span className=" justify-between ml-[10px] relative">
                                <span className="flex flex-col">
                                    <p className="text-[14px] font-bold text-white m-0">@{currentBot?.Name}</p>
                                    <p className="text-[10px] text-[#AB9BFE] m-0 underline hover:cursor-pointer">view profile</p>
                                </span>
                            </span>
                        </div>
                        <span className=" text-[#bdb0f9] border-[#bdb0f9] border-[1px] py-[10px] px-[20px]  font-bold text-[14px] text-center rounded-[10px] hover:cursor-pointer">
                            Follow
                        </span>
                    </div>
                    <div className="px-[20px] py-[40px] grid grid-cols-3 lg:grid-cols-4 gap-[6px] w-full border-b-[1px] border-b-[#25273f]">
                        <div className="rounded-[10px] flex items-center bg-[#3a355793] ">
                            <span className="w-[40%]">
                                <img src="http://data.gmini.ai/api/files/yttfv3r7vgmd959/5bg7d0trgmudz0d/williammedina_portrait_of_cybernetic_digital_demon_with_neon_bd25f819_caa8_4ae8_848a_54eb6861a19d_1_gLw85R8KFy.png" className="w-full object-cover h-full rounded-tl-[10px] rounded-bl-[10px]" />
                            </span>
                            <span className="flex flex-col w-[60%] px-[10px]">
                                <p className="text-white font-semibold text-[14px]">Colian</p>
                                <p className="text-[#CFCFCF] text-[10px]">Lorem ipsum dolor sit amet, consectetr adipiscing elit, sed...</p>
                            </span>
                        </div>
                        <div className="rounded-[10px] flex items-center bg-[#3a355793] ">
                            <span className="w-[40%]">
                                <img src="http://data.gmini.ai/api/files/yttfv3r7vgmd959/5bg7d0trgmudz0d/williammedina_portrait_of_cybernetic_digital_demon_with_neon_bd25f819_caa8_4ae8_848a_54eb6861a19d_1_gLw85R8KFy.png" className="w-full object-cover h-full rounded-tl-[10px] rounded-bl-[10px]" />
                            </span>
                            <span className="flex flex-col w-[60%] px-[10px]">
                                <p className="text-white font-semibold text-[14px]">Colian</p>
                                <p className="text-[#CFCFCF] text-[10px]">Lorem ipsum dolor sit amet, consectetr adipiscing elit, sed...</p>
                            </span>
                        </div>
                        <div className="rounded-[10px] flex items-center bg-[#3a355793] ">
                            <span className="w-[40%]">
                                <img src="http://data.gmini.ai/api/files/yttfv3r7vgmd959/5bg7d0trgmudz0d/williammedina_portrait_of_cybernetic_digital_demon_with_neon_bd25f819_caa8_4ae8_848a_54eb6861a19d_1_gLw85R8KFy.png" className="w-full object-cover h-full rounded-tl-[10px] rounded-bl-[10px]" />
                            </span>
                            <span className="flex flex-col w-[60%] px-[10px]">
                                <p className="text-white font-semibold text-[14px]">Colian</p>
                                <p className="text-[#CFCFCF] text-[10px]">Lorem ipsum dolor sit amet, consectetr adipiscing elit, sed...</p>
                            </span>
                        </div>
                        <div className="rounded-[10px] flex items-center bg-[#3a355793] ">
                            <span className="w-[40%]">
                                <img src="http://data.gmini.ai/api/files/yttfv3r7vgmd959/5bg7d0trgmudz0d/williammedina_portrait_of_cybernetic_digital_demon_with_neon_bd25f819_caa8_4ae8_848a_54eb6861a19d_1_gLw85R8KFy.png" className="w-full object-cover h-full rounded-tl-[10px] rounded-bl-[10px]" />
                            </span>
                            <span className="flex flex-col w-[60%] px-[10px]">
                                <p className="text-white font-semibold text-[14px]">Colian</p>
                                <p className="text-[#CFCFCF] text-[10px]">Lorem ipsum dolor sit amet, consectetr adipiscing elit, sed...</p>
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col w-full p-[20px]">
                        <div className="flex w-full items-center justify-between">
                            <div className="bg-black w-[300px] border-[1px] border-[#25273f] rounded-[30px] flex mb-[20px]">
                                <span className={`rounded-[30px] ${chatType == 'publicmemories' ? 'bg-[#bdb0f9] text-black' : 'text-white'}
                             flex justify-center py-[6px] px-[16px] text-[14px] hover:cursor-pointer w-[50%]`}
                                    onClick={() => { settypechat('publicmemories') }}>
                                    Public Memories
                                </span>
                                <span className={`rounded-[30px] ${chatType == 'comments' ? 'bg-[#bdb0f9] text-black' : 'text-white'}
                             flex justify-center py-[6px] px-[16px] text-[14px] hover:cursor-pointer w-[50%]`}
                                    onClick={() => { settypechat('comments') }}>
                                    Comments
                                </span>
                            </div>
                            <div className="relative inline-block w-fit">
                                <div
                                    className='bg-[#030308] border border-[#25273F] text-center justify-center items-center px-[20px] py-[10px] flex text-[12px] rounded-[5rem] cursor-pointer'
                                    onClick={() => toggleDropdown('comments')}
                                >
                                    <p className="text-white">{Comments}</p>
                                </div>
                                {openDropdown === 'comments' && (
                                    <div className='absolute z-[9999] mt-2 bg-[#030308] border border-[#25273F] rounded-md w-fit p-2'>
                                        <p className='hover:bg-[#25273F] text-white px-4 py-2 cursor-pointer' onClick={() => handleSelect('Option 1')}>Option 1</p>
                                        <p className='hover:bg-[#25273F] text-white px-4 py-2 cursor-pointer' onClick={() => handleSelect('Option 2')}>Option 2</p>
                                        <p className='hover:bg-[#25273F] text-white px-4 py-2 cursor-pointer' onClick={() => handleSelect('Option 3')}>Option 3</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        {chatType == 'comments' ? <div className="flex flex-col gap-[20px] px-[10px] py-[20px]">
                            <div className=" rounded-[10px] border-[1px] border-[#25273F] p-[10px] flex flex-col gap-[10px]">
                                <div className="flex gap-[10px] items-center">
                                    <span className="w-[60px]  h-[60px] rounded-[100%]">
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s"
                                            alt="img"
                                            className="rounded-[100%] w-full h-full object-cover"
                                        />
                                    </span>
                                    <span className=" justify-between ml-[10px] relative">
                                        <span className="flex flex-col">
                                            <p className="text-[14px] font-bold text-white m-0">SAM TIMOTHY JONAS...</p>
                                            <p className="text-[10px] text-[#CFCFCF] m-0 ">07/26/2023</p>
                                        </span>
                                    </span>
                                </div>
                                <p className="text-[10px] text-[#CFCFCF]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>

                            </div>
                            <div className=" rounded-[10px] border-[1px] border-[#25273F] p-[10px] flex flex-col gap-[10px]">
                                <div className="flex gap-[10px] items-center">
                                    <span className="w-[60px]  h-[60px] rounded-[100%]">
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s"
                                            alt="img"
                                            className="rounded-[100%] w-full h-full object-cover"
                                        />
                                    </span>
                                    <span className=" justify-between ml-[10px] relative">
                                        <span className="flex flex-col">
                                            <p className="text-[14px] font-bold text-white m-0">SAM TIMOTHY JONAS...</p>
                                            <p className="text-[10px] text-[#CFCFCF] m-0 ">07/26/2023</p>
                                        </span>
                                    </span>
                                </div>
                                <p className="text-[10px] text-[#CFCFCF]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>

                            </div>
                        </div> : <div className="grid lg:grid-cols-3 grid-cols-1 gap-[20px] p-[10px]">
                            <div className=" rounded-[10px] border-[1px] border-[#25273F] p-[10px] flex flex-col gap-[10px]">
                                <div className="flex justify-between items-center">
                                    <p className="text-[14px] text-[#AB9BFE]">1 Interactions</p>
                                    <p className="text-[14px] text-[#CFCFCF]">20 Messages</p>
                                </div>
                                <div className="flex flex-col gap-[20px] border-b-[1px] border-b-[#25273F]">
                                    <div className="w-full user-message flex gap-[10px]">
                                        <div className="w-[10%] h-[30px] rounded-[100%] ">
                                            <img src='http://data.gmini.ai/api/files/yttfv3r7vgmd959/5bg7d0trgmudz0d/williammedina_portrait_of_cybernetic_digital_demon_with_neon_bd25f819_caa8_4ae8_848a_54eb6861a19d_1_gLw85R8KFy.png' alt="avatar" vclassName="w-full h-full rounded-[100%]" />
                                            {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s" alt="avatar" className="w-full h-full rounded-[100%]" /> */}
                                        </div>
                                        <div className="flex flex-col gap-[10px] w-[80%]">
                                            <span className="w-fit py-[10px] px-[20px] flex flex-col user-message-container">
                                                <p className="text-[14px] text-[#CFCFCFCF] m-0">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
                                                </p>
                                                <span className="text-[12px] text-[#CFCFCFCF] self-end usermessage-date">
                                                    26/08
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    {/* <div className="w-full ai-message flex gap-[10px]">
                                        <div className="w-[10%] h-[30px] rounded-[100%] ">
                                            <img src='http://data.gmini.ai/api/files/yttfv3r7vgmd959/5bg7d0trgmudz0d/williammedina_portrait_of_cybernetic_digital_demon_with_neon_bd25f819_caa8_4ae8_848a_54eb6861a19d_1_gLw85R8KFy.png' alt="avatar" vclassName="w-full h-full rounded-[100%]" />
                                        </div>
                                        <div className="flex flex-col gap-[10px] w-[80%]">
                                            <span className="w-fit py-[10px] px-[20px] flex flex-col ai-message-container">
                                                <p className="text-[14px] text-[#CFCFCFCF] m-0">
                                                    Lorem ipsum dolor sit
                                                </p>
                                                <span className="text-[12px] text-[#CFCFCFCF] aimessage-date">
                                                    06/28
                                                </span>
                                            </span>
                                        </div>
                                    </div> */}
                                    <div className="w-full ai-message flex gap-[10px]">
                                        <div className="w-[10%] h-[30px] rounded-[100%] ">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s" alt="avatar" className="w-full h-full rounded-[100%]" />

                                        </div>
                                        <div className="flex flex-col gap-[10px] w-[80%]">
                                            <span className="w-fit py-[10px] px-[20px] flex flex-col ai-message-container">
                                                <p className="text-[14px] text-[#CFCFCFCF] m-0">
                                                    Lorem ipsum dolor sit
                                                </p>
                                                <span className="text-[12px] text-[#CFCFCFCF] aimessage-date">
                                                    06/28
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between ">
                                    <div className="flex items-center">
                                        <div className="w-[30px] h-[30px] rounded-[100%] ">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s" alt="avatar" className="w-full h-full rounded-[100%]" />
                                        </div>
                                        <div className="w-[30px] ml-[-10px] h-[30px] rounded-[100%] z-[99999] ">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s" alt="avatar" className="w-full h-full rounded-[100%]" />
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-white font-semibold">Sharing a bed with your enemy / Secret Person</p>
                                </div>

                            </div>
                            <div className=" rounded-[10px] border-[1px] border-[#25273F] p-[10px] flex flex-col gap-[10px]">
                                <div className="flex justify-between items-center">
                                    <p className="text-[14px] text-[#AB9BFE]">1 Interactions</p>
                                    <p className="text-[14px] text-[#CFCFCF]">20 Messages</p>
                                </div>
                                <div className="flex flex-col gap-[20px] border-b-[1px] border-b-[#25273F]">
                                    <div className="w-full user-message flex gap-[10px]">
                                        <div className="w-[10%] h-[30px] rounded-[100%] ">
                                            <img src='http://data.gmini.ai/api/files/yttfv3r7vgmd959/5bg7d0trgmudz0d/williammedina_portrait_of_cybernetic_digital_demon_with_neon_bd25f819_caa8_4ae8_848a_54eb6861a19d_1_gLw85R8KFy.png' alt="avatar" vclassName="w-full h-full rounded-[100%]" />

                                        </div>
                                        <div className="flex flex-col gap-[10px] w-[80%]">
                                            <span className="w-fit py-[10px] px-[20px] flex flex-col user-message-container">
                                                <p className="text-[14px] text-[#CFCFCFCF] m-0">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
                                                </p>
                                                <span className="text-[12px] text-[#CFCFCFCF] self-end usermessage-date">
                                                    26/08
                                                </span>
                                            </span>
                                        </div>
                                        {/* <div className="w-[10%] h-[30px] rounded-[100%] ">
                                            <img src='http://data.gmini.ai/api/files/yttfv3r7vgmd959/5bg7d0trgmudz0d/williammedina_portrait_of_cybernetic_digital_demon_with_neon_bd25f819_caa8_4ae8_848a_54eb6861a19d_1_gLw85R8KFy.png' alt="avatar" vclassName="w-full h-full rounded-[100%]" />
                                        </div>
                                        <div className="flex flex-col gap-[10px] w-[80%]">
                                            <span className="w-fit py-[10px] px-[20px] flex flex-col ai-message-container">
                                                <p className="text-[14px] text-[#CFCFCFCF] m-0">
                                                    Lorem ipsum dolor sit
                                                </p>
                                                <span className="text-[12px] text-[#CFCFCFCF] aimessage-date">
                                                    06/28
                                                </span>
                                            </span>
                                        </div> */}
                                    </div>
                                    <div className="w-full  ai-message flex gap-[10px]">
                                        <div className="w-[10%] h-[30px] rounded-[100%] ">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s" alt="avatar" className="w-full h-full rounded-[100%]" />
                                        </div>
                                        <div className="flex flex-col gap-[10px] w-[80%]">
                                            <span className="w-fit py-[10px] px-[20px] flex flex-col ai-message-container">
                                                <p className="text-[14px] text-[#CFCFCFCF] m-0">
                                                    Lorem ipsum dolor sit
                                                </p>
                                                <span className="text-[12px] text-[#CFCFCFCF] aimessage-date">
                                                    06/28
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between ">
                                    <div className="flex items-center">
                                        <div className="w-[30px] h-[30px] rounded-[100%] ">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s" alt="avatar" className="w-full h-full rounded-[100%]" />
                                        </div>
                                        <div className="w-[30px] ml-[-10px] h-[30px] rounded-[100%] z-[99999] ">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s" alt="avatar" className="w-full h-full rounded-[100%]" />
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-white font-semibold">Sharing a bed with your enemy / Secret Person</p>
                                </div>

                            </div>
                            <div className=" rounded-[10px] border-[1px] border-[#25273F] p-[10px] flex flex-col gap-[10px]">
                                <div className="flex justify-between items-center">
                                    <p className="text-[14px] text-[#AB9BFE]">1 Interactions</p>
                                    <p className="text-[14px] text-[#CFCFCF]">20 Messages</p>
                                </div>
                                <div className="flex flex-col gap-[20px] border-b-[1px] border-b-[#25273F]">
                                    <div className="w-full user-message flex gap-[10px]">
                                        <div className="w-[10%] h-[30px] rounded-[100%] ">
                                            <img src='http://data.gmini.ai/api/files/yttfv3r7vgmd959/5bg7d0trgmudz0d/williammedina_portrait_of_cybernetic_digital_demon_with_neon_bd25f819_caa8_4ae8_848a_54eb6861a19d_1_gLw85R8KFy.png' alt="avatar" vclassName="w-full h-full rounded-[100%]" />
                                        </div>
                                        <div className="flex flex-col gap-[10px] w-[80%]">
                                            <span className="w-fit py-[10px] px-[20px] flex flex-col user-message-container">
                                                <p className="text-[14px] text-[#CFCFCFCF] m-0">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
                                                </p>
                                                <span className="text-[12px] text-[#CFCFCFCF] self-end usermessage-date">
                                                    26/08
                                                </span>
                                            </span>
                                        </div>

                                    </div>
                                    <div className="w-full ai-message flex gap-[10px]">

                                        <div className="w-[10%] h-[30px] rounded-[100%] ">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s" alt="avatar" className="w-full h-full rounded-[100%]" />

                                        </div>
                                        <div className="flex flex-col gap-[10px] w-[80%]">
                                            <span className="w-fit py-[10px] px-[20px] flex flex-col ai-message-container">
                                                <p className="text-[14px] text-[#CFCFCFCF] m-0">
                                                    Lorem ipsum dolor sit
                                                </p>
                                                <span className="text-[12px] text-[#CFCFCFCF] aimessage-date">
                                                    06/28
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between ">
                                    <div className="flex items-center">
                                        <div className="w-[30px] h-[30px] rounded-[100%] ">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s" alt="avatar" className="w-full h-full rounded-[100%]" />
                                        </div>
                                        <div className="w-[30px] ml-[-10px] h-[30px] rounded-[100%] z-[99999] ">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s" alt="avatar" className="w-full h-full rounded-[100%]" />
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-white font-semibold">Sharing a bed with your enemy / Secret Person</p>
                                </div>

                            </div>
                        </div>

                        }
                    </div>
                </div>
            </div>
            <div className="mobile-aiprofile h-full flex flex-col">
                <div className="w-full border-b-[1px] border-b-[#b3a6ff]">
                    <div className="px-[10px] py-[20px] flex flex-col gap-[10px] bg-[#3a355793]">
                        <div className="w-full h-[200px] rounded-[20px]">
                            <img src={`http://data.gmini.ai/api/files/yttfv3r7vgmd959/${currentBot?.id}/` + currentBot?.Pic
                            } alt="img" className="w-full rounded-[20px] h-full object-cover" />
                        </div>
                        <div className="w-full flex gap-[0.5rem] items-center justify-center text-[12px] text-[#CFCFCF]">
                            @{currentBot?.Name}
                            {currentBot?.Link?.length > 0 ? <a href={currentBot?.Link}>

                                <div style={{ border: "1px solid #25273F" }} className="bg-[#060610]  rounded-full h-[33px] w-[33px] flex justify-center items-center">
                                    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.6056 12.039C11.7802 12.039 11.0365 12.3954 10.5204 12.9624L5.87811 10.0872C6.00556 9.76141 6.07091 9.41463 6.07077 9.06479C6.07093 8.71495 6.00559 8.36817 5.87811 8.04237L10.5204 5.16705C11.0366 5.73406 11.7802 6.09064 12.6056 6.09064C14.1604 6.09064 15.4253 4.82574 15.4253 3.2709C15.4253 1.71606 14.1604 0.451294 12.6056 0.451294C11.0508 0.451294 9.78585 1.7162 9.78585 3.27104C9.78578 3.62086 9.85112 3.96761 9.97851 4.29342L5.33634 7.16864C4.8202 6.60163 4.07658 6.24505 3.2512 6.24505C1.69636 6.24505 0.431458 7.51009 0.431458 9.06479C0.431458 10.6196 1.69636 11.8845 3.2512 11.8845C4.07655 11.8845 4.82024 11.5281 5.33634 10.9609L9.97854 13.8362C9.85113 14.162 9.78578 14.5088 9.78585 14.8587C9.78585 16.4134 11.0507 17.6783 12.6056 17.6783C14.1604 17.6783 15.4253 16.4134 15.4253 14.8587C15.4253 13.3038 14.1604 12.039 12.6056 12.039ZM10.814 3.27104C10.814 2.28318 11.6177 1.4795 12.6056 1.4795C13.5934 1.4795 14.3971 2.28318 14.3971 3.27104C14.3971 4.2589 13.5934 5.06258 12.6056 5.06258C11.6177 5.06258 10.814 4.25886 10.814 3.27104ZM3.2512 10.8563C2.2632 10.8563 1.45953 10.0526 1.45953 9.06479C1.45953 8.07696 2.2632 7.27325 3.2512 7.27325C4.23906 7.27325 5.0426 8.07696 5.0426 9.06479C5.0426 10.0526 4.23903 10.8563 3.2512 10.8563ZM10.814 14.8586C10.814 13.8707 11.6177 13.067 12.6056 13.067C13.5934 13.067 14.3971 13.8707 14.3971 14.8585C14.3971 15.8464 13.5934 16.6501 12.6056 16.6501C11.6177 16.6501 10.814 15.8464 10.814 14.8585V14.8586Z" fill="white" />
                                    </svg>

                                </div>

                            </a>
                                : ``}
                        </div>
                        <div className="w-full flex items-center justify-center text-[12px] text-center text-[#CFCFCF]">{reduceDescription(currentBot?.Description)}</div>
                        <div className="w-[100%] flex space-x-2 flex-row justify-center items-center">
                            {currentBot?.Telegram_link?.length > 0 ?
                                <a href={currentBot?.TikTok_user}>
                                    <div style={{ border: "1px solid #25273F" }} className="bg-[#060610] rounded-full h-[40px] w-[40px] flex justify-center items-center">
                                        <svg width={15} height={15} fill="#fcfcfc" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#fcfcfc"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>tiktok</title> <path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z"></path> </g></svg>
                                    </div>

                                </a> : ``}

                            {currentBot?.Telegram_link?.length > 0 ?
                                <a href={currentBot?.Telegram_link}>
                                    <div style={{ border: "1px solid #25273F" }} className="bg-[#060610] rounded-full h-[40px] w-[40px] flex justify-center items-center">
                                        <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 0.853694L15.9949 16.0048C15.9949 16.0048 15.5748 17.0554 14.4188 16.5511L7.45295 11.2195C8.38923 10.3779 15.6527 3.8477 15.9704 3.55157C16.4613 3.09326 16.1567 2.82051 15.5859 3.16711L4.85713 9.98045L0.717912 8.58698C0.717912 8.58698 0.0662655 8.35579 0.00355013 7.85147C-0.0595363 7.34715 0.739064 7.07402 0.739064 7.07402L17.6132 0.454394C17.6132 0.454394 19 -0.154947 19 0.853694Z" fill="white" />
                                        </svg>

                                    </div>

                                </a> : ``}
                            {currentBot?.Instagram_handle?.length > 0 ? <a href={currentBot?.Instagram_handle}>
                                <div style={{ border: "1px solid #25273F" }} className="bg-[#060610] rounded-full h-[40px] w-[40px] flex justify-center items-center">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.50002 4.74902C5.98202 4.74902 4.74902 5.98202 4.74902 7.50002C4.74902 9.01802 5.98202 10.254 7.50002 10.254C9.01802 10.254 10.254 9.01802 10.254 7.50002C10.254 5.98202 9.01802 4.74902 7.50002 4.74902Z" fill="white" />
                                        <path d="M11.652 0H3.348C1.503 0 0 1.503 0 3.348V11.652C0 13.5 1.503 15 3.348 15H11.652C13.5 15 15 13.5 15 11.652V3.348C15 1.503 13.5 0 11.652 0ZM7.5 12.36C4.821 12.36 2.64 10.179 2.64 7.5C2.64 4.821 4.821 2.643 7.5 2.643C10.179 2.643 12.36 4.821 12.36 7.5C12.36 10.179 10.179 12.36 7.5 12.36ZM12.462 3.525C11.895 3.525 11.433 3.066 11.433 2.499C11.433 1.932 11.895 1.47 12.462 1.47C13.029 1.47 13.491 1.932 13.491 2.499C13.491 3.066 13.029 3.525 12.462 3.525Z" fill="white" />
                                    </svg>

                                </div>
                            </a> : ``}


                        </div>
                        <div className="w-full flex items-center justify-center gap-[10px]">
                            {currentBot?.Tags?.map((tag, i) => {
                                return <span key={currentBot?.id + i} className='rounded-[20px] text-white px-[12px] border-[1px] border-[#CFCFCF] py-[6px] text-[12px] bg-[#433e64b5] '>
                                    {tag}
                                </span>
                            })}
                        </div>
                    </div>
                </div>
{currentBot?.Link?.length>0?                <a href={currentBot?.Link}>
                    <div className="collin-div flex rounded-[20px] flex-row h-[200px] w-[90%] mt-[1rem] ml-[1rem]">
                        <div className="flex-grow h-full w-[40rem]">
                            <img
                                style={{ borderRadius: '12px 0px 0px 12px' }}
                                className="w-full h-full object-cover"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s"
                            />
                        </div>
                        <div className="flex-grow rounded-tr-[20px] rounded-br-[20px]  text-white px-[2rem] py-[1rem] flex flex-col justify-center" style={{ background: "linear-gradient(90deg, rgba(196, 184, 249, 0.1) 0%, rgba(171, 155, 254, 0.1) 100%)" }}>
                            <h3 className="font-bold text-[20px]">Colin</h3>
                            <p style={{ color: '#FFFFFF' }} className="py-[0.5rem]">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                    </div>
                </a>:``}
                <span onClick={(e) => {
                    navigate(`/chat?id=${currentBot?.id}`)
                }} className="bg-[#bdb0f9] my-[20px] rounded-[10px] w-[60%]  text-[14px]  h-[3rem] text-center flex items-center justify-center px-[10px] py-[6px] m-auto hover:cursor-pointer">Start Chat</span>

                <div className="grid grid-cols-1 px-[20px] gap-[20px] py-[40px] bg-[#3a355729] border-b-[1px] border-b-[#25273f]">
                    <div className="flex flex-col gap-[20px]">
                        <p className="text-white font-semibold text-[14px]">Sharing a bed with your enemy</p>
                        <span className="grid grid-cols-3 items-center gap-[10px] bg-black px-[10px] py-[6px] rounded-[8px]">
                            <span className="flex gap-[4px] items-center">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9777 0.0520933C11.3347 3.88125e-08 10.534 0 9.51371 0H6.48635C5.46607 0 4.66532 3.88125e-08 4.02234 0.0520933C3.36746 0.106419 2.82643 0.216559 2.33675 0.466606C1.53153 0.876867 0.876868 1.53153 0.466606 2.33675C0.216559 2.82643 0.106419 3.36745 0.0528374 4.02234C-1.66339e-08 4.66532 0 5.46607 0 6.48635V9.65808C0 10.1 0.087044 10.5376 0.256162 10.9459C0.425281 11.3542 0.673161 11.7252 0.985651 12.0377C1.61675 12.6688 2.47271 13.0233 3.36522 13.0233H3.81248C3.99778 13.0233 4.12429 13.2101 4.05583 13.382C3.54457 14.659 5.01583 15.814 6.13509 15.0148L8.07817 13.6268L8.11538 13.6008C8.64274 13.2291 9.27116 13.0276 9.91632 13.0233H10.4789C11.6317 13.0233 12.3342 13.0233 12.9251 12.8507C13.6133 12.6489 14.2398 12.2773 14.7469 11.7702C15.2541 11.263 15.6256 10.6366 15.8274 9.94832C16.0001 9.35743 16.0001 8.65492 16.0001 7.50217V6.48635C16.0001 5.46607 16.0001 4.66532 15.948 4.02234C15.8936 3.36745 15.7835 2.82643 15.5335 2.33675C15.1232 1.53153 14.4685 0.876867 13.6633 0.466606C13.1736 0.216559 12.6326 0.105675 11.9777 0.0520933ZM2.84355 1.46159C3.14941 1.30531 3.52746 1.21377 4.11313 1.16614C4.70551 1.11777 5.46011 1.11703 6.51165 1.11703H9.48841C10.5399 1.11703 11.2946 1.11703 11.8869 1.16614C12.4726 1.21377 12.8507 1.30605 13.1573 1.46159C13.7524 1.76499 14.2361 2.24902 14.5392 2.84429C14.6955 3.15015 14.787 3.5282 14.8347 4.11388C14.883 4.70625 14.8838 5.46086 14.8838 6.5124V7.39352C14.8838 8.68989 14.8778 9.21827 14.7558 9.63501C14.6066 10.1436 14.332 10.6065 13.9573 10.9813C13.5825 11.356 13.1196 11.6306 12.611 11.7798C12.1943 11.9018 11.6659 11.9078 10.3695 11.9078H9.90887C9.03578 11.9135 8.18532 12.1861 7.47166 12.6892L5.48691 14.1068C5.27407 14.2587 4.995 14.0399 5.09248 13.7973C5.17621 13.5882 5.20737 13.3617 5.18325 13.1377C5.15913 12.9138 5.08046 12.6992 4.95413 12.5127C4.82779 12.3262 4.65766 12.1735 4.45862 12.0681C4.25959 11.9626 4.03773 11.9076 3.81248 11.9078H3.36522C2.76877 11.9078 2.19674 11.6708 1.77498 11.2491C1.35322 10.8273 1.11628 10.2553 1.11628 9.65883V6.51165C1.11628 5.46011 1.11628 4.70551 1.1654 4.11313C1.21303 3.52746 1.30531 3.14941 1.46084 2.84355C1.76412 2.24816 2.24816 1.76486 2.84355 1.46159Z" fill="white" />
                                </svg>
                                <p className="m-0 text-[10px] text-white">1.5K</p>
                            </span>
                            <span className="flex gap-[4px] items-center">
                                <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.25078 15.2026C1.06094 15.2019 0.873657 15.1586 0.702688 15.0761C0.493115 14.9776 0.315815 14.8217 0.191417 14.6264C0.0670197 14.431 0.000639402 14.2044 0 13.9729V2.02718C0.000915636 1.86417 0.0340473 1.70295 0.0974897 1.5528C0.160932 1.40264 0.253433 1.26651 0.369674 1.15222C0.485915 1.03794 0.623601 0.947768 0.774814 0.886887C0.926028 0.826006 1.08779 0.795619 1.25078 0.797474H11.0884C11.414 0.799319 11.7257 0.929469 11.9559 1.15968C12.1861 1.3899 12.3163 1.70161 12.3181 2.02718V13.9729C12.3136 14.1954 12.2487 14.4125 12.1304 14.6011C12.0122 14.7896 11.8449 14.9426 11.6466 15.0435C11.4482 15.1445 11.2262 15.1898 11.0041 15.1745C10.7821 15.1592 10.5684 15.0839 10.3857 14.9566L6.31014 11.8999C6.28023 11.876 6.24305 11.863 6.20474 11.863C6.16642 11.863 6.12924 11.876 6.09933 11.8999L1.98861 14.9566C1.77528 15.1154 1.51669 15.2016 1.25078 15.2026ZM1.25078 1.85151C1.20419 1.85151 1.15951 1.87001 1.12657 1.90296C1.09362 1.9359 1.07511 1.98059 1.07511 2.02718V13.9729C1.07487 14.0054 1.08402 14.0373 1.10147 14.0647C1.11893 14.0921 1.14394 14.1139 1.17349 14.1275C1.20039 14.1459 1.23223 14.1558 1.26484 14.1558C1.29745 14.1558 1.32929 14.1459 1.35619 14.1275L5.46691 11.0567C5.68067 10.8992 5.93922 10.8142 6.20474 10.8142C6.47026 10.8142 6.72881 10.8992 6.94256 11.0567L11.0182 14.1134C11.045 14.1318 11.0769 14.1417 11.1095 14.1417C11.1421 14.1417 11.174 14.1318 11.2008 14.1134C11.2304 14.0999 11.2554 14.0781 11.2729 14.0506C11.2903 14.0232 11.2995 13.9913 11.2992 13.9588V2.02718C11.2998 2.00083 11.2944 1.9747 11.2834 1.95072C11.2725 1.92675 11.2563 1.90554 11.2361 1.88867C11.2158 1.8718 11.192 1.8597 11.1665 1.85326C11.1409 1.84683 11.1142 1.84623 11.0884 1.85151H1.25078Z" fill="white" />
                                </svg>

                                <p className="m-0 text-[10px] text-white">10K</p>
                            </span>
                            <span className="flex gap-[4px] items-center">
                                <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.31836 13.1808C7.9351 13.1811 7.55981 13.0713 7.23717 12.8644C6.32184 12.276 4.56147 11.0685 3.07241 9.59412C1.24504 7.78323 0.318359 6.07778 0.318359 4.52391C0.318359 3.44419 0.637627 2.4549 1.24175 1.66332C1.81462 0.910645 2.62387 0.372379 3.53949 0.134992C4.4551 -0.102395 5.42394 -0.0251227 6.29035 0.354395C7.06582 0.689041 7.75744 1.25325 8.31836 2.00199C8.87927 1.25142 9.5709 0.68721 10.3464 0.354395C11.2128 -0.0251227 12.1816 -0.102395 13.0972 0.134992C14.0128 0.372379 14.8221 0.910645 15.395 1.66332C15.9991 2.4549 16.3184 3.44419 16.3184 4.52391C16.3184 6.07778 15.3917 7.7825 13.5643 9.59266C12.0752 11.0671 10.3156 12.2746 9.39955 12.863C9.07707 13.0703 8.70177 13.1807 8.31836 13.1808ZM4.58966 0.917508C4.30007 0.917247 4.01173 0.955414 3.73218 1.03101C3.03054 1.22364 2.41132 1.64082 1.96925 2.21874C1.48815 2.84922 1.23369 3.64666 1.23369 4.52538C1.23369 5.82588 2.06884 7.31238 3.71644 8.94387C5.14435 10.3593 6.84577 11.5251 7.73181 12.0926C7.90676 12.2044 8.11003 12.2638 8.31763 12.2638C8.52523 12.2638 8.72849 12.2044 8.90344 12.0926C9.78948 11.5236 11.4894 10.3579 12.9188 8.94387C14.5664 7.31238 15.4016 5.82588 15.4016 4.52538C15.4016 3.64666 15.1471 2.85069 14.666 2.21874C14.2239 1.64082 13.6047 1.22364 12.9031 1.03101C11.652 0.691238 9.89419 1.04639 8.71159 3.06231C8.67127 3.1312 8.61363 3.18835 8.54439 3.22805C8.47515 3.26776 8.39672 3.28865 8.31689 3.28865C8.23707 3.28865 8.15864 3.26776 8.0894 3.22805C8.02016 3.18835 7.96252 3.1312 7.9222 3.06231C6.99296 1.47549 5.70564 0.917508 4.58966 0.917508Z" fill="white" />
                                </svg>

                                <p className="m-0 text-[10px] text-white">25K</p>
                            </span>
                        </span>
                    </div>
                    <div className="grid grid-cols-3 py-[6px] px-[6px] bg-[#3a3557b5] rounded-[10px]">
                        <div className="flex flex-col  border-r-[1px] border-[#CFCFCF] px-[6px] gap-[10px] ">
                            <p className="text-white font-semibold text-[14px]">613</p>
                            <p className="text-[#CFCFCF] text-[12px]">Total Chars</p>
                        </div>
                        <div className="flex flex-col  border-r-[1px] border-[#CFCFCF] px-[6px] gap-[10px] ">
                            <p className="text-white font-semibold text-[14px]">07/10/24</p>
                            <p className="text-[#CFCFCF] text-[12px]">Create Time</p>
                        </div>
                        <div className="flex flex-col  px-[6px] gap-[10px]">
                            <p className="text-white font-semibold text-[14px]">07/10/24</p>
                            <p className="text-[#CFCFCF] text-[12px]">Update's Time</p>
                        </div>
                    </div>

                </div>
                {/* character defination */}
                <div className="w-full px-[10px] py-[20px]">
                    <p className="m-0 font-semibold text-[#AB9BFE] text-[20px]">Character Definition</p>
                    <div className="flex flex-col gap-[20px] mt-[20px] px-[20px]">
                        <div className="w-full flex flex-col gap-[10px]">
                            <p className=" font-semibold text-[16px] text-white">Greeting</p>
                            <p className="text-white text-[14px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>
                        </div>
                        <div className="w-full flex flex-col gap-[10px]">
                            <p className=" font-semibold text-[16px] text-white">Personality</p>
                            <p className="text-white text-[14px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                        </div>
                        <div className="w-full flex flex-col gap-[10px]">
                            <p className=" font-semibold text-[16px] text-white">Scenario</p>
                            <p className="text-white text-[14px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                        </div>
                    </div>
                </div>
                {/* profileai */}
                <div className="px-[20px] py-[40px] flex flex-col items-center justify-between w-full border-b-[1px] border-b-[#888fd4]">
                    <div className="flex gap-[20px] flex-col items-center">
                        <span className="w-[60px]  h-[60px] rounded-[100%]">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s"
                                alt="img"
                                className="rounded-[100%] w-full h-full object-cover"
                            />
                        </span>
                        <span className=" justify-between ml-[10px] relative">
                            <span className="flex flex-col">
                                <p className="text-[14px] font-bold text-white m-0 text-center">@SAM TIMOTHY JONAS...</p>
                                <p className="text-[10px] text-[#AB9BFE] text-center m-0 underline hover:cursor-pointer">view profile</p>
                            </span>
                        </span>
                    </div>
                    <span className=" text-[#bdb0f9] mt-[20px] border-[#bdb0f9] border-[1px] py-[10px] px-[20px]  font-bold text-[14px] text-center rounded-[10px] hover:cursor-pointer">
                        Follow
                    </span>
                </div>
                {/* slider */}
                <SliderComponent />
                {/* comments/publicmesg */}
                <div className="flex flex-col w-full p-[20px]">
                    <div className="flex w-full items-center justify-between">
                        <div className="bg-black w-[300px] border-[1px] border-[#25273f] rounded-[30px] flex mb-[20px]">
                            <span className={`rounded-[30px] ${chatType == 'publicmemories' ? 'bg-[#bdb0f9] text-black' : 'text-white'}
                             flex justify-center py-[6px] px-[16px] text-[14px] hover:cursor-pointer w-[50%]`}
                                onClick={() => { settypechat('publicmemories') }}>
                                Public Memories
                            </span>
                            <span className={`rounded-[30px] ${chatType == 'comments' ? 'bg-[#bdb0f9] text-black' : 'text-white'}
                             flex justify-center py-[6px] px-[16px] text-[14px] hover:cursor-pointer w-[50%]`}
                                onClick={() => { settypechat('comments') }}>
                                Comments
                            </span>
                        </div>

                    </div>
                    {chatType == 'comments' ? <div className="flex flex-col gap-[20px] px-[10px] py-[20px]">
                        <div className=" rounded-[10px] border-[1px] border-[#25273F] p-[10px] flex flex-col gap-[10px]">
                            <div className="flex gap-[10px] items-center">
                                <span className="w-[60px]  h-[60px] rounded-[100%]">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s"
                                        alt="img"
                                        className="rounded-[100%] w-full h-full object-cover"
                                    />
                                </span>
                                <span className=" justify-between ml-[10px] relative">
                                    <span className="flex flex-col">
                                        <p className="text-[14px] font-bold text-white m-0">SAM TIMOTHY JONAS...</p>
                                        <p className="text-[10px] text-[#CFCFCF] m-0 ">07/26/2023</p>
                                    </span>
                                </span>
                            </div>
                            <p className="text-[10px] text-[#CFCFCF]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>

                        </div>
                        <div className=" rounded-[10px] border-[1px] border-[#25273F] p-[10px] flex flex-col gap-[10px]">
                            <div className="flex gap-[10px] items-center">
                                <span className="w-[60px]  h-[60px] rounded-[100%]">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s"
                                        alt="img"
                                        className="rounded-[100%] w-full h-full object-cover"
                                    />
                                </span>
                                <span className=" justify-between ml-[10px] relative">
                                    <span className="flex flex-col">
                                        <p className="text-[14px] font-bold text-white m-0">SAM TIMOTHY JONAS...</p>
                                        <p className="text-[10px] text-[#CFCFCF] m-0 ">07/26/2023</p>
                                    </span>
                                </span>
                            </div>
                            <p className="text-[10px] text-[#CFCFCF]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>

                        </div>
                    </div> : <div className="grid lg:grid-cols-3 grid-cols-1 gap-[20px] p-[10px]">
                        <div className=" rounded-[10px] border-[1px] border-[#25273F] p-[10px] flex flex-col gap-[10px]">
                            <div className="flex justify-between items-center">
                                <p className="text-[14px] text-[#AB9BFE]">1 Interactions</p>
                                <p className="text-[14px] text-[#CFCFCF]">20 Messages</p>
                            </div>
                            <div className="flex flex-col gap-[20px] border-b-[1px] border-b-[#25273F]">
                                <div className="w-full ai-message flex gap-[10px]">
                                    <div className="w-[5%] h-[30px] rounded-[100%] ">
                                        <img src='http://data.gmini.ai/api/files/yttfv3r7vgmd959/5bg7d0trgmudz0d/williammedina_portrait_of_cybernetic_digital_demon_with_neon_bd25f819_caa8_4ae8_848a_54eb6861a19d_1_gLw85R8KFy.png' alt="avatar" vclassName="w-full h-full rounded-[100%]" />
                                    </div>
                                    <div className="flex flex-col gap-[10px] w-[80%]">
                                        <span className="w-fit py-[10px] px-[20px] flex flex-col ai-message-container">
                                            <p className="text-[14px] text-[#CFCFCFCF] m-0">
                                                Lorem ipsum dolor sit
                                            </p>
                                            <span className="text-[12px] text-[#CFCFCFCF] aimessage-date">
                                                06/28
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full user-message flex gap-[10px]">
                                    <div className="w-[5%] h-[30px] rounded-[100%] ">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s" alt="avatar" className="w-full h-full rounded-[100%]" />
                                    </div>
                                    <div className="flex flex-col gap-[10px] w-[80%]">
                                        <span className="w-fit py-[10px] px-[20px] flex flex-col user-message-container">
                                            <p className="text-[14px] text-[#CFCFCFCF] m-0">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
                                            </p>
                                            <span className="text-[12px] text-[#CFCFCFCF] self-end usermessage-date">
                                                26/08
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between ">
                                <div className="flex items-center">
                                    <div className="w-[30px] h-[30px] rounded-[100%] ">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s" alt="avatar" className="w-full h-full rounded-[100%]" />
                                    </div>
                                    <div className="w-[30px] ml-[-10px] h-[30px] rounded-[100%] z-[99999] ">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s" alt="avatar" className="w-full h-full rounded-[100%]" />
                                    </div>
                                </div>
                                <p className="text-[10px] text-white font-semibold">Sharing a bed with your enemy / Secret Person</p>
                            </div>

                        </div>
                        <div className=" rounded-[10px] border-[1px] border-[#25273F] p-[10px] flex flex-col gap-[10px]">
                            <div className="flex justify-between items-center">
                                <p className="text-[14px] text-[#AB9BFE]">1 Interactions</p>
                                <p className="text-[14px] text-[#CFCFCF]">20 Messages</p>
                            </div>
                            <div className="flex flex-col gap-[20px] border-b-[1px] border-b-[#25273F]">
                                <div className="w-full ai-message flex gap-[10px]">
                                    <div className="w-[5%] h-[30px] rounded-[100%] ">
                                        <img src='http://data.gmini.ai/api/files/yttfv3r7vgmd959/5bg7d0trgmudz0d/williammedina_portrait_of_cybernetic_digital_demon_with_neon_bd25f819_caa8_4ae8_848a_54eb6861a19d_1_gLw85R8KFy.png' alt="avatar" vclassName="w-full h-full rounded-[100%]" />
                                    </div>
                                    <div className="flex flex-col gap-[10px] w-[80%]">
                                        <span className="w-fit py-[10px] px-[20px] flex flex-col ai-message-container">
                                            <p className="text-[14px] text-[#CFCFCFCF] m-0">
                                                Lorem ipsum dolor sit
                                            </p>
                                            <span className="text-[12px] text-[#CFCFCFCF] aimessage-date">
                                                06/28
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full user-message flex gap-[10px]">
                                    <div className="w-[5%] h-[30px] rounded-[100%] ">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s" alt="avatar" className="w-full h-full rounded-[100%]" />
                                    </div>
                                    <div className="flex flex-col gap-[10px] w-[80%]">
                                        <span className="w-fit py-[10px] px-[20px] flex flex-col user-message-container">
                                            <p className="text-[14px] text-[#CFCFCFCF] m-0">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
                                            </p>
                                            <span className="text-[12px] text-[#CFCFCFCF] self-end usermessage-date">
                                                26/08
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between ">
                                <div className="flex items-center">
                                    <div className="w-[30px] h-[30px] rounded-[100%] ">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s" alt="avatar" className="w-full h-full rounded-[100%]" />
                                    </div>
                                    <div className="w-[30px] ml-[-10px] h-[30px] rounded-[100%] z-[99999] ">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s" alt="avatar" className="w-full h-full rounded-[100%]" />
                                    </div>
                                </div>
                                <p className="text-[10px] text-white font-semibold">Sharing a bed with your enemy / Secret Person</p>
                            </div>

                        </div>
                        <div className=" rounded-[10px] border-[1px] border-[#25273F] p-[10px] flex flex-col gap-[10px]">
                            <div className="flex justify-between items-center">
                                <p className="text-[14px] text-[#AB9BFE]">1 Interactions</p>
                                <p className="text-[14px] text-[#CFCFCF]">20 Messages</p>
                            </div>
                            <div className="flex flex-col gap-[20px] border-b-[1px] border-b-[#25273F]">
                                <div className="w-full ai-message flex gap-[10px]">
                                    <div className="w-[5%] h-[30px] rounded-[100%] ">
                                        <img src='http://data.gmini.ai/api/files/yttfv3r7vgmd959/5bg7d0trgmudz0d/williammedina_portrait_of_cybernetic_digital_demon_with_neon_bd25f819_caa8_4ae8_848a_54eb6861a19d_1_gLw85R8KFy.png' alt="avatar" vclassName="w-full h-full rounded-[100%]" />
                                    </div>
                                    <div className="flex flex-col gap-[10px] w-[80%]">
                                        <span className="w-fit py-[10px] px-[20px] flex flex-col ai-message-container">
                                            <p className="text-[14px] text-[#CFCFCFCF] m-0">
                                                Lorem ipsum dolor sit
                                            </p>
                                            <span className="text-[12px] text-[#CFCFCFCF] aimessage-date">
                                                06/28
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full user-message flex gap-[10px]">
                                    <div className="w-[5%] h-[30px] rounded-[100%] ">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s" alt="avatar" className="w-full h-full rounded-[100%]" />
                                    </div>
                                    <div className="flex flex-col gap-[10px] w-[80%]">
                                        <span className="w-fit py-[10px] px-[20px] flex flex-col user-message-container">
                                            <p className="text-[14px] text-[#CFCFCFCF] m-0">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
                                            </p>
                                            <span className="text-[12px] text-[#CFCFCFCF] self-end usermessage-date">
                                                26/08
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between ">
                                <div className="flex items-center">
                                    <div className="w-[30px] h-[30px] rounded-[100%] ">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s" alt="avatar" className="w-full h-full rounded-[100%]" />
                                    </div>
                                    <div className="w-[30px] ml-[-10px] h-[30px] rounded-[100%] z-[99999] ">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s" alt="avatar" className="w-full h-full rounded-[100%]" />
                                    </div>
                                </div>
                                <p className="text-[10px] text-white font-semibold">Sharing a bed with your enemy / Secret Person</p>
                            </div>

                        </div>
                    </div>

                    }
                </div>
            </div>
        </div>
    )
}