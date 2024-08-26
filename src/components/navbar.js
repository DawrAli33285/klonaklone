import Flag from 'react-flagkit';
import { useContext, useEffect, useRef, useState } from 'react';
import { FaHome, FaCalendarAlt, FaShoppingCart, FaCog, FaQuestion, FaQuestionCircle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { FilterContext} from '../context/filterContext'
import { Button, Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;
export default function NavBar({ children }) {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();
    const [visible, setVisible] = useState(false);
 const [currentUser,setCurrentUser]=useState()
    const toggleMobileSidebar = () => {
        setVisible(!visible);
    };
    const [search,setSearch]=useState()
    const languages = [
        { code: 'en', name: 'English', countryCode: 'US' },
        { code: 'fr', name: 'French', countryCode: 'FR' },
        { code: 'de', name: 'German', countryCode: 'DE' },
        { code: 'es', name: 'Spanish', countryCode: 'ES' },

    ];
    const { filter, setFilter } = useContext(FilterContext);
    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };


    const handleLanguageChange = (languageCode) => {
        setSelectedLanguage(languageCode);
        setIsDropdownOpen(false); // Close the dropdown after selection
    };


    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        if(localStorage.getItem('user')){
            let user=JSON.parse(localStorage.getItem('user'))
            if(user){
                console.log("USER")
                console.log(user)
                setCurrentUser(user)
            }
            
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
     
    }, []);
    const handleMenuClick = ({ key }) => {
        switch (key) {
            case '1':
                navigate('/');
                break;
            case '2':
                navigate('/recent-chats');
                break;
            case '3':
                navigate('/profile');
                break;
            case '4':
                navigate('/notification');
                break;
            case '5':
                navigate('/settings');
                break;
                case '7':
                    navigate('/subscription');
                    break;
            default:
                break;
        }
    };
    const truncateText = (text, maxWords) => {
        const words = text?.split(' ');
        if (words?.length <= maxWords) return text;
        return `${words?.slice(0, maxWords).join(' ')}...`;
      };
    return (
        <div className='w-full flex flex-wrap relative min-h-[100vh] max-h-scrollable overflow-y-scroll '>
            <div className={`${visible ? 'block' : 'hidden'} lg:hidden fixed top-0 left-0 h-full z-50`}>
                <Sider
                    trigger={null}
                    style={{ borderRight: '1px solid #25273f', height: '100%', position: 'relative', background:'#060610' }}
                    collapsible
                    collapsed={false}
                >
                    {/* Close Button */}
                    <div onClick={toggleMobileSidebar} className='absolute top-4 right-4 cursor-pointer'>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="#25273f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 6L18 18" stroke="#25273f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    <div className='flex flex-col'>
                        <div className='flex flex-col gap-[20px] px-[20px] pt-[40px]' >
                            <h3 className={`text-[#b4a5fd] text-[32px] font-bold`}>LOGO</h3>
                            <div className='flex items-center gap-[6px] w-full border-b-[1px] border-b-[#25273f] pb-[30px]' >
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s"
                                    alt="User Avatar"
                                    className='w-[50px] h-[50px] rounded-[100%] object-cover'
                                />
                                <span className='flex flex-col'>
                                    <p className='text-white text-[18px]'>{currentUser?.record?.username}</p>
                                    <p className='text-white text-[10x]'>{currentUser?.record?.email}</p>
                                </span>
                            </div>
                        </div>
                    </div>

                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        onClick={handleMenuClick}
                        style={{ backgroundColor: 'transparent', borderRight: 'none' }}
                        items={[
                            {
                                key: 'group1',
                                type: 'group',
                                children: [
                                    {
                                        key: '1',
                                        icon: <FaHome />,
                                        label: 'Home',
                                    },
                                    {
                                        key: '2',
                                        icon: <VideoCameraOutlined />,
                                        label: 'Recent Chats',
                                    },
                                    {
                                        key: '3',
                                        icon: <UploadOutlined />,
                                        label: 'Profile',
                                    },
                                    {
                                        key: '4',
                                        icon: <UploadOutlined />,
                                        label: 'Notification',
                                    },
                                    {
                                        key: '7',
                                        icon: <FaHome />,
                                        label: 'Subscription',
                                    },
                                ],
                            },
                            {
                                key: 'divider',
                                type: 'divider',
                            },
                            {
                                key: 'group2',
                                type: 'group',
                                children: [
                                    {
                                        key: '5',
                                        icon: <FaHome />,
                                        label: 'Settings',
                                    },
                                    {
                                        key: '6',
                                        icon: <VideoCameraOutlined />,
                                        label: 'Profile',
                                    },
                                ],
                            },
                        ]}
                    />

                </Sider>
            </div>
            <div className='lg:block hidden overflow-x-visible'>
                <Sider trigger={null}
                    style={{ borderRight: '1px solid #25273f', height: '100%', position: 'relative' }} collapsible collapsed={collapsed}>
                    <div className='arrow-toggle  absolute w-[35px] h-[35px] flex justify-center items-center p-[6px] rounded-[100%] right-[-17px] top-[2.4rem] bg-[#060610] border-[1px] border-[#25273f] cursor-pointer' onClick={toggleSidebar}>
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.7 7.7L9.7 12.7L14.7 17.7L16.1 16.3L12.4 12.7L16.1 9L14.7 7.7Z" fill="#25273f" />
                        </svg>
                    </div>
                    <div className='flex flex-col'>

                        <div className='flex flex-col gap-[20px] px-[20px] pt-[40px]' >
                            <h3 className={`text-[#b4a5fd] text-[32px] font-bold ${collapsed ? 'hidden' : 'block'}`} >LOGO</h3>
                            <div className='flex items-center gap-[6px] w-full border-b-[1px] border-b-[#25273f] pb-[30px]' >

                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s"
                                    alt="User Avatar"
                                    className='w-[50px] h-[50px] rounded-[100%] object-cover'
                                />
                                <span className={`${collapsed ? 'hidden' : 'flex'} flex-col`}>
                                <p className='text-white text-[18px]'>{currentUser?.record?.username}</p>
                                <p className='text-white text-[10px]'>{currentUser?.record?.email}</p>
                                </span>
                            </div>

                        </div>
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        onClick={handleMenuClick}
                        style={{ backgroundColor: 'transparent', borderRight: 'none' }}
                        items={[
                            {
                                key: 'group1',
                                type: 'group',
                                children: [
                                    {
                                        key: '1',
                                        icon: <FaHome />,
                                        label: 'Home',
                                    },
                                    {
                                        key: '2',
                                        icon: <VideoCameraOutlined />,
                                        label: 'Recent Chats',
                                    },
                                    {
                                        key: '3',
                                        icon: <UploadOutlined />,
                                        label: 'Profile',
                                    },
                                    {
                                        key: '4',
                                        icon: <UploadOutlined />,
                                        label: 'Notification',
                                    },
                                    {
                                        key: '7',
                                        icon: <FaHome />,
                                        label: 'Subscription',
                                    },
                                ],
                            },
                            {
                                key: 'divider',
                                type: 'divider',
                            },
                            {
                                key: 'group2',
                                type: 'group',
                                children: [
                                    {
                                        key: '5',
                                        icon: <FaHome />,
                                        label: 'Settings',
                                    },
                                    {
                                        key: '6',
                                        icon: <VideoCameraOutlined />,
                                        label: 'Profile',
                                    },
                                ],
                            },
                        ]}
                    />

                </Sider>
            </div>
            <div className='w-full lg:w-[80%]'>
                <navbar className="w-full  flex justify-between items-center py-[10px] pl-[40px] pr-[80px] border-b-[1px] border-[#25273f]">
                    <h2 className='text-white text-[24px] hidden md:flex'>Home</h2>
                    <div className='flex -mx-[1rem] w-[100%] flex-row justify-between '>
                        <h3 className={`text-[#b4a5fd] md:hidden text-[32px] font-bold ${collapsed ? 'hidden' : 'block'}`} >LOGO</h3>
                        <div className='flex md:hidden -mx-[3rem] flex-row justify-center items-center gap-[1rem]'>
                            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.7189 21.3641L16.1784 14.8235C17.4453 13.2586 18.2081 11.27 18.2081 9.10418C18.2081 4.08443 14.1237 0 9.10404 0C4.08434 0 0 4.08439 0 9.10414C0 14.1239 4.08439 18.2083 9.10408 18.2083C11.2699 18.2083 13.2584 17.4455 14.8233 16.1786L21.3639 22.7192C21.5508 22.9061 21.7961 23 22.0414 23C22.2868 23 22.5321 22.9061 22.719 22.7192C23.0937 22.3445 23.0937 21.7388 22.7189 21.3641ZM9.10408 16.2916C5.14044 16.2916 1.91666 13.0678 1.91666 9.10414C1.91666 5.14046 5.14044 1.91664 9.10408 1.91664C13.0677 1.91664 16.2915 5.14046 16.2915 9.10414C16.2915 13.0678 13.0677 16.2916 9.10408 16.2916Z" fill="#B4A5FC" />
                            </svg>
                            <svg onClick={toggleMobileSidebar} className='burger' width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M27.4999 22H1.83334C0.820778 22 0 21.1792 0 20.1667C0 19.1542 0.820778 18.3333 1.83334 18.3333H27.5C28.5125 18.3333 29.3333 19.1542 29.3333 20.1667C29.3332 21.1792 28.5125 22 27.4999 22ZM27.4999 12.8333H1.83334C0.820778 12.8333 0 12.0125 0 11C0 9.98753 0.820778 9.16669 1.83334 9.16669H27.5C28.5125 9.16669 29.3333 9.98747 29.3333 11C29.3333 12.0126 28.5125 12.8333 27.4999 12.8333ZM27.4999 3.66668H1.83334C0.820778 3.66668 0 2.8459 0 1.83334C0 0.820778 0.820778 0 1.83334 0H27.5C28.5125 0 29.3333 0.820778 29.3333 1.83334C29.3333 2.8459 28.5125 3.66668 27.4999 3.66668Z" fill="#B4A5FC" />
                            </svg>


                        </div>
                    </div>
                    <menu className='lg:flex hidden gap-[10px] items-center'>
                        <div className='flex rounded-[20px] border-[1px] border-[#25273f] py-[4px] px-[10px] w-[200px] justify-between items-center'>
                            <input value={search} onChange={(e)=>{
                                setSearch(e.target.value)
                            }} type="text" className='border-none outline-none bg-transparent text-[14px] text-[#575b8b] w-[60%]' placeholder='Search here....' />
                            <span onClick={()=>{
                                setSearch("")
                                setFilter(search)
                            }} className='w-[24px] h-[24px]'>
                                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0_15_152)"> <rect width="24" height="24" fill=""></rect> <circle cx="10.5" cy="10.5" r="6.5" stroke="#575b8b" stroke-linejoin="round"></circle> <path d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z" fill="#575b8b"></path> </g> <defs> <clipPath id="clip0_15_152"> <rect width="24" height="24" fill="white"></rect> </clipPath> </defs> </g></svg>
                            </span>
                        </div>
                        <a href='#' className='w-[30px] h-[30px] p-[6px] rounded-[100%] hover:cursor-pointer border-[1px] border-[#25273f] flex justify-center items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" width="24px" height="24px">
                                <path d="M448 209.9v-61.1c-18.1 8-37.8 12.2-58.2 12.2-32.7 0-61.6-14.4-81.6-37.3-12.6-14.5-21.3-33.2-24.4-53.5h-61v293.1c0 34.7-28 62.7-62.7 62.7-34.7 0-62.7-28-62.7-62.7 0-34.7 28-62.7 62.7-62.7 8.4 0 16.4 1.7 23.7 4.8v-66.1c-7.8-1.1-15.8-1.7-23.7-1.7-71.9 0-130.3 58.4-130.3 130.3 0 71.9 58.4 130.3 130.3 130.3 71.9 0 130.3-58.4 130.3-130.3v-154.1c21.2 10.2 44.8 15.9 69.8 15.9 20.6 0 40.2-3.6 58.2-10.2z" />
                            </svg>
                        </a>
                        <a href='#' className='w-[30px] h-[30px] p-[6px] rounded-[100%] hover:cursor-pointer border-[1px] border-[#25273f] flex justify-center items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 248 204" fill="white" width="24px" height="24px">
                                <path d="M248 25.2c-9.2 4.1-19.2 6.8-29.6 8 10.6-6.4 18.8-16.6 22.6-28.6-9.9 6-20.8 10.4-32.4 12.8C198 7 185.6 0 171.6 0c-26 0-47.2 21-47.2 47v5.2C82.4 51.6 43.7 33.6 17.6 3.6c-9.2 15.6-4.6 35.2 10.8 45.2-7.8 0-15.2-2.4-21.6-6v.4c0 22.6 16 41.6 37.6 45.6-8 2.2-16.6 2.6-24.8 1.6 7 21.6 26.4 36.6 48.8 37-18.4 14.6-41.6 22-65.2 21.6 19.6 12.8 42.4 20 65.6 20C147 204 204 126 204 58c0-2.4 0-4.8-.2-7.2C216 45.6 228 36 238.4 25.2z" />
                            </svg>

                        </a>
                        <a href='#' className='w-[30px] h-[30px] p-[6px] rounded-[100%] hover:cursor-pointer border-[1px] border-[#25273f] flex justify-center items-center'>
                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.8944 4.34399C17.5184 3.71467 16.057 3.256 14.5317 3C14.3397 3.33067 14.1263 3.77866 13.977 4.13067C12.3546 3.89599 10.7439 3.89599 9.14394 4.13067C8.9946 3.77866 8.77059 3.33067 8.58925 3C7.05328 3.256 5.59194 3.71467 4.22555 4.34399C1.46289 8.41865 0.716219 12.3973 1.08955 16.3226C2.92421 17.6559 4.6949 18.4666 6.43463 19C6.86129 18.424 7.2453 17.8053 7.57597 17.1546C6.94663 16.92 6.3493 16.632 5.7733 16.2906C5.92263 16.184 6.07197 16.0667 6.21064 15.9493C9.68796 17.5387 13.4544 17.5387 16.889 15.9493C17.0383 16.0667 17.177 16.184 17.3263 16.2906C16.7503 16.632 16.153 16.92 15.5237 17.1546C15.8543 17.8053 16.2384 18.424 16.665 19C18.4037 18.4666 20.185 17.6559 22.0101 16.3226C22.4687 11.7787 21.2837 7.83202 18.8944 4.34399ZM8.05596 13.9013C7.01061 13.9013 6.15728 12.952 6.15728 11.7893C6.15728 10.6267 6.98928 9.67731 8.05596 9.67731C9.11194 9.67731 9.97591 10.6267 9.95457 11.7893C9.95457 12.952 9.11194 13.9013 8.05596 13.9013ZM15.065 13.9013C14.0197 13.9013 13.1653 12.952 13.1653 11.7893C13.1653 10.6267 13.9983 9.67731 15.065 9.67731C16.121 9.67731 16.985 10.6267 16.9637 11.7893C16.9637 12.952 16.1317 13.9013 15.065 13.9013Z" fill="#ffffff"></path> </g></svg>
                        </a>
                        <a href='#' className='w-[30px] h-[30px] p-[6px] rounded-[100%] hover:cursor-pointer border-[1px] border-[#25273f] flex justify-center items-center'>
                            <svg fill="#ffffff" width="24px" height="24px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M24.325 8.309s-2.655-.334-8.357-.334c-5.517 0-8.294.334-8.294.334A2.675 2.675 0 0 0 5 10.984v10.034a2.675 2.675 0 0 0 2.674 2.676s2.582.332 8.294.332c5.709 0 8.357-.332 8.357-.332A2.673 2.673 0 0 0 27 21.018V10.982a2.673 2.673 0 0 0-2.675-2.673zM13.061 19.975V12.03L20.195 16l-7.134 3.975z"></path></g></svg>
                        </a>
                        <div className="relative" ref={dropdownRef}>
                            <button onClick={toggleDropdown} className="rounded-[20px] border-[#25273f] border-[1px]  flex items-center bg-transparent text-white  px-4 py-[6px]">
                                <Flag country={languages.find(lang => lang.code === selectedLanguage).countryCode} />
                                <span className="ml-2">
                                    {languages.find(lang => lang.code === selectedLanguage).name}
                                </span>
                                <span className='ml-2'>
                                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 10L12 15L17 10" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                </span>
                            </button>
                            {isDropdownOpen && (
                                <ul className="absolute mt-2 bg-white border rounded shadow-lg w-40">
                                    {languages.map((lang) => (
                                        <li
                                            key={lang.code}
                                            className="hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handleLanguageChange(lang.code)}
                                        >
                                            <div className="flex items-center px-4 py-2">
                                                <Flag country={lang.countryCode} />
                                                <span className="ml-2">{lang.name}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </menu>
                </navbar>

                <div className='w-full'>
                    {children}
                </div>
            </div>
        </div>
    )
}