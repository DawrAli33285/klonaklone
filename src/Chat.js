import { useEffect, useState } from "react";
import "./chat.css";
import { useLocation } from "react-router-dom";
import PocketBase from 'pocketbase';
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";


export default function Chat() {
    const [chatType, setChatType] = useState("individual");
    const [currentUser, setCurrentUser] = useState("")
    const [messagehistory, setMessageHistory] = useState([])
    const [currentMessage, setCurrentMessage] = useState("")
    const [loading, setLoading] = useState(true)
    const [currentBot, setCurrentBot] = useState("")
    const settypechat = (type) => {
        setChatType(type)
    }
    const [selectedChatId, setSelectedChatId] = useState(1);
    const [chatBot, setChatBot] = useState()
    const [messages, setMessages] = useState([])
    let location = useLocation();

    const pb = new PocketBase('http://data.gmini.ai');

    const handleChatClick = (id) => {
        setLoading(true)
        setMessages([])
        setSelectedChatId(id);
        getSelectedChat(id);
    };

    async function fetchTags(record) {
        // Check if record.Tags exists
        if (!record?.Tags) {
            return []; // Return an empty array if no tags
        }

        // Map through the tags to get promises
        const alltagsPromises = record.Tags.map(async (val) => {
            // Fetch the tag record
            const tagrecord = await pb.collection('tags').getOne(val, {
                expand: 'relField1,relField2.subRelField',
            });
            return tagrecord; // Return the tag record directly
        });

        // Wait for all promises to resolve
        const alltags = await Promise.all(alltagsPromises);
        return alltags; // Return the resolved data
    }
    useEffect(() => {
        const getChatBot = async () => {
            try {
                let params = new URLSearchParams(location.search)

                setChatBot(params.get('id'))
                setSelectedChatId(params.get('id'))
                let record = await pb.collection('Chatbots').getOne(params.get('id'), {
                    expand: 'relField1,relField2.subRelField',
                });

                fetchTags(record).then(async (alltags) => {
                    console.log(alltags);
                    record = {
                        ...record,
                        Tags: alltags
                    }
                    setChatBot(record)
                    const recordhistory = await pb.collection('conversation_history').getFullList({
                        sort: '-created',
                    });
                    let userLocaltwo = localStorage.getItem('user')
                    let userLocalstoragetwo = JSON.parse(userLocal)
                    let foundrecord = recordhistory.filter(history => history.chatbot_id === params.get('id') && history?.user_id == userLocalstorage?.record?.id);

                    let filteredRecordHistory = recordhistory.filter(history =>
                        history?.user_id === userLocalstorage?.record?.id
                    );

                    // Step 2: Get unique records based on chatbot_id
                    const seenChatbotIds = new Set();
                    const uniqueRecords = filteredRecordHistory.filter(history => {
                        if (!seenChatbotIds.has(history.chatbot_id)) {
                            seenChatbotIds.add(history.chatbot_id);
                            return true; // Include this record
                        }
                        return false; // Exclude this record
                    });
                    console.log("UNIQUE")
                    console.log(uniqueRecords)
                    const updatedMessageHistory = await Promise.all(uniqueRecords.map(async (val, i) => {
                        try {
                            // Fetch additional data from your collection or API
                            const historyConversationBots = await pb.collection('Chatbots').getOne(val?.chatbot_id, {
                                expand: 'relField1,relField2.subRelField',
                            });

                            // Create the updated record with additional data
                            return {
                                ...val,  // Keep the original data
                                historyConversationBots
                            };
                        } catch (error) {
                            console.error(`Error fetching data for chatbot_id ${val?.chatbot_id}:`, error);
                            // Return the original record if there's an error
                            toast.error("Server error please try again")
                            return val;
                        }
                    }));
                    setMessageHistory(updatedMessageHistory)
                    
                    const sortedMessages = foundrecord.sort((a, b) => new Date(a.created) - new Date(b.created));

                    setMessages(sortedMessages)
                    setLoading(false)

                }).catch((error) => {
                    toast.error("Server error while fetching tags")
                    console.error('Error fetching tags:', error);
                });
                let userLocal = localStorage.getItem('user')
                let userLocalstorage = JSON.parse(userLocal)
                setCurrentUser(userLocalstorage)


            } catch (e) {

            }
        }

        getChatBot();
    }, [])

    const getSelectedChat = async (id) => {
        try {
            let params = new URLSearchParams(location.search)

            setChatBot(id)
            let record = await pb.collection('Chatbots').getOne(id, {
                expand: 'relField1,relField2.subRelField',
            });

            fetchTags(record).then(async (alltags) => {
                console.log(alltags);
                record = {
                    ...record,
                    Tags: alltags
                }
                setChatBot(record)
                console.log("CHATBOTRECORD")
                console.log(record)
                const recordhistory = await pb.collection('conversation_history').getFullList({
                    sort: '-created',
                });
                let userLocaltwo = localStorage.getItem('user')
                let userLocalstoragetwo = JSON.parse(userLocal)
                let foundrecord = recordhistory.filter(history => history.chatbot_id === id && history?.user_id == userLocalstorage?.record?.id);
                const sortedMessages = foundrecord.sort((a, b) => new Date(a.created) - new Date(b.created));



                setMessages(sortedMessages)
                setLoading(false)

            }).catch((error) => {
                toast.error("Server error fetching tags please try again")
                console.error('Error fetching tags:', error);
            });
            let userLocal = localStorage.getItem('user')
            let userLocalstorage = JSON.parse(userLocal)
            setCurrentUser(userLocalstorage)


        } catch (e) {
toast.error("Server error please try again")
        }
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { month: '2-digit', year: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    };

    const sendMessage = async () => {
        setLoading(false);
        try {
            const url = 'http://data.gmini.ai/api/collections/conversations/records';
    
            const data = {
                "user_id": currentUser?.record?.id,
                "chatbot_id": chatBot?.id
            };
    
            // Check if a conversation exists
            const conversation_history = await pb.collection('conversations').getFullList({
                sort: '-created',
            });
    
            let conversation_found = conversation_history.find(
                u => u.chatbot_id == chatBot?.id && u.user_id == currentUser?.record?.id
            );
    
            let chatmessage;
            let messagerecord;
    
            if (conversation_found) {
                // Existing conversation: create the user message
                chatmessage = {
                    "conversation_id": conversation_found.id,
                    "user_id": currentUser?.record.id,
                    "chatbot_id": chatBot?.id,
                    "role": "user",
                    "message_content": currentMessage,
                    "created": new Date().toISOString().replace('T', ' ').replace('Z', 'Z')
                };
                // messagerecord = await pb.collection('conversation_history').create(chatmessage);
                            // Send bot request
            let botData = {
                "user_id": currentUser?.record?.id,
                "chatbot_id": chatBot?.id,
                "user_message": currentMessage,
                "token": currentUser?.token,
                "message_content": '',
                "role": "assistant"
            };
    
            let botresponse = await axios.post(`http://45.79.218.138:5000/chat`, botData);
    
            // Append the bot's response
            botData = {
                ...botData,
                "message_content": botresponse?.data?.assistant_message,
                "created": new Date().toISOString().replace('T', ' ').replace('Z', 'Z')
            };
    
            // Add bot message to messages
            setMessages(prevMessages => [...prevMessages, chatmessage,botData]);
            setMessageHistory(prev => {
                // Check if the current chatbot exists in the previous message history
                const botExists = prev.some(record => record.historyConversationBots.id === chatBot?.id);
            
                if (botExists) {
                    // Update the existing bot's message_content
                    return prev.map(record => 
                        record.historyConversationBots.id === chatBot?.id 
                            ? {
                                ...record,
                                message_content: botresponse?.data?.assistant_message || ''
                            } 
                            : record
                    );
                } else {
                    // Add a new record if chatbot doesn't exist
                    return [
                        ...prev, 
                        {
                            historyConversationBots: {
                                Name: chatBot?.Name || '',
                                Pic: chatBot?.Pic || '',
                                id: chatBot?.id || ''
                            },
                            created: new Date().toISOString().replace('T', ' ').replace('Z', 'Z') || '',
                            message_content: botresponse?.data?.assistant_message || ''
                        }
                    ];
                }
            });
            } else {
                // New conversation: create a conversation record
                const record = await pb.collection('conversations').create(data);
    
                // Create user message for the new conversation
                chatmessage = {
                    "conversation_id": record.id,
                    "user_id": currentUser?.record.id,
                    "chatbot_id": chatBot?.id,
                    "role": "user",
                    "message_content": currentMessage,
                    "created": new Date().toISOString().replace('T', ' ').replace('Z', 'Z')
                };
                // messagerecord = await pb.collection('conversation_history').create(chatmessage);
                // Send bot request
                let botData = {
                    "user_id": currentUser?.record?.id,
                    "chatbot_id": chatBot?.id,
                    "user_message": currentMessage,
                    "token": currentUser?.token,
                    "message_content": '',
                    "role": "assistant"
                };
        
                let botresponse = await axios.post(`http://45.79.218.138:5000/chat`, botData);
        
                // Append the bot's response
                botData = {
                    ...botData,
                    "message_content": botresponse?.data?.assistant_message,
                    "created": new Date().toISOString().replace('T', ' ').replace('Z', 'Z')
                };
        
                // Add bot message to messages
                setMessages(prevMessages => [...prevMessages,chatmessage, botData]);
                // Update message history
                setMessageHistory(prev => {
                    // Check if the current chatbot exists in the previous message history
                    const botExists = prev.some(record => record.historyConversationBots.id === chatBot?.id);
                
                    if (botExists) {
                        // Update the existing bot's message_content
                        return prev.map(record => 
                            record.historyConversationBots.id === chatBot?.id 
                                ? {
                                    ...record,
                                    message_content: botresponse?.data?.assistant_message || ''
                                } 
                                : record
                        );
                    } else {
                        // Add a new record if chatbot doesn't exist
                        return [
                            ...prev, 
                            {
                                historyConversationBots: {
                                    Name: chatBot?.Name || '',
                                    Pic: chatBot?.Pic || '',
                                    id: chatBot?.id || ''
                                },
                                created: new Date().toISOString().replace('T', ' ').replace('Z', 'Z') || '',
                                message_content: botresponse?.data?.assistant_message || ''
                            }
                        ];
                    }
                });
                handleChatClick(chatBot?.id);
                
            }
    
            // Add user message to messages
            // setMessages(prevMessages => [...prevMessages, messagerecord]);
            setCurrentMessage("");  // Clear the message input
    

            setLoading(false);  // Loading complete
    
        } catch (e) {
            toast.error("Server error while sending messages")
            console.error("Error sending message:", e);
        }
    };
    

    function sortMessagesByCreated(messagesArray) {
        return messagesArray.sort((a, b) => new Date(a.created) - new Date(b.created));
    }

    
    return (
        <div className="w-full">
            <ToastContainer/>
            <div className="lg:grid hidden chatbox-desktop h-[100vh]">
                <div className="py-[20px] px-[20px] flex flex-col h-full lg:border-r-[1px] lg:border-r-[#25273f]">
                    <div className="bg-black border-[1px] border-[#25273f] rounded-[30px] flex mb-[20px]">
                        <span className={`rounded-[30px] ${chatType == 'individual' ? 'bg-[#bdb0f9] text-black' : 'text-white'}
                             flex justify-center py-[6px] px-[16px] text-[14px] hover:cursor-pointer w-[50%]`}
                            onClick={() => { settypechat('individual') }}>
                            Individual
                        </span>
                        <span className={`rounded-[30px] ${chatType == 'group' ? 'bg-[#bdb0f9] text-black' : 'text-white'}
                             flex justify-center py-[6px] px-[16px] text-[14px] hover:cursor-pointer w-[50%]`}
                            onClick={() => { settypechat('group') }}>
                            Group
                        </span>
                    </div>
                    <div className="flex flex-col w-full overflow-y-auto h-[500px]">
                        {loading == true ? <div class="flex justify-center items-center h-screen">
                            <div class="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
                        </div> : messagehistory?.map((user,i) => (
                            <div
                                key={user?.user_id?.toString()+i?.toString()}
                                onClick={() => handleChatClick(user?.chatbot_id)}
                                className={`w-full py-[10px] px-[6px] border-b-[1px] border-b-[#25273f] hover:cursor-pointer`}
                            >
                                <span className={`flex rounded-[20px] py-[10px] px-[8px] ${selectedChatId === user?.chatbot_id ? 'bg-[#3a3557b5]' : ''}`}>
                                    <span className="w-[30%] max-w-[40px] h-[40px] rounded-[100%]">
                                        <img
                                            src={`http://data.gmini.ai/api/files/yttfv3r7vgmd959/${user?.historyConversationBots?.id}/` + user?.
                                                historyConversationBots?.Pic
                                            }
                                            alt={user?.historyConversationBots?.Name}
                                            className="rounded-[100%] w-full h-full object-cover"
                                        />
                                    </span>
                                    <span className="w-[70%] justify-between ml-[10px] relative">
                                        <span className="flex flex-col">
                                            <p className="text-[16px] font-bold text-white m-0">{user?.historyConversationBots?.Name?.length>9?user?.historyConversationBots?.Name?.slice(0,8)+'..':user?.historyConversationBots?.Name}</p>
                                            <p className="text-[12px] text-white m-0">{user?.message_content?.length>20?user?.message_content?.slice(0,19)+'...':user?.message_content}</p>
                                        </span>
                                        <span className="text-[12px] text-[#CFCFCFCF] absolute top-0 right-0">
                                            {formatDate(user?.created)}
                                        </span>
                                    </span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col  lg:border-r-[1px] lg:border-r-[#25273f] w-full">
                    {loading == true ? <div class="flex justify-center items-center h-screen">
                        <div class="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
                    </div> : chatBot && (
                        <>
                            <div className="w-full flex flex-col items-center border-b-[1px] border-b-[#25273f] pt-[40px] pb-[20px]">
                                <div className="w-[60px] h-[60px] rounded-[100%] mb-[8px]">
                                    <img src={`http://data.gmini.ai/api/files/yttfv3r7vgmd959/${chatBot?.id}/` + chatBot?.Pic} alt={chatBot?.Name} className="w-full h-full rounded-[100%]" />
                                </div>
                                <p className="text-[16px] font-bold text-white m-0">{chatBot?.Name}</p>
                                <p className="text-[12px] text-[#CFCFCFCF] m-0">
                                    {chatBot?.Name}
                                </p>
                                <p className="text-[12px] text-[#CFCFCFCF] m-0 text-center lg:w-[60%] mx-[auto] w-[80%] mt-[20px]">
                                    {chatBot?.Description}
                                </p>
                            </div>
                            <div className="w-full px-[20px] relative h-[100%]  chatbox flex-col gap-[40px] mt-[40px] flex">
                                {loading === true ? <div class="flex justify-center items-center h-screen">
                                    <div class="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
                                </div> : <div className="w-full px-[20px] h-[70%]   overflow-y-auto chatbox flex-col gap-[40px] mt-[40px] flex">
                                    {sortMessagesByCreated(messages)?.map((message, i) => {
                                       
                                        
                                        if (message?.role=="assistant") {
                                           
                                            return <div key={message?.chatbot_id?.toString()+i?.toString()} className="w-full ai-message flex gap-[10px]">
                                                <div className="w-[10%] h-[50px] rounded-[100%] ">
                                                    <img src={`http://data.gmini.ai/api/files/yttfv3r7vgmd959/${chatBot?.id}/` + chatBot?.Pic} alt={chatBot?.Name} className="w-full h-full rounded-[100%]" />
                                                </div>
                                                <div className="flex flex-col gap-[10px] w-[80%]">
                                                    <p className="text-[16px] font-bold text-white m-0">{chatBot?.Name}</p>
                                                    <span className="w-fit py-[10px] px-[20px] flex flex-col ai-message-container">
                                                        <p className="text-[14px] text-[#CFCFCFCF] m-0">
                                                            {message?.message_content}
                                                        </p>
                                                        <span className="text-[12px] text-[#CFCFCFCF] aimessage-date">
                                                            {formatDate(message?.created)}
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        } else {

                                            return <div key={message?.user_id?.toString()+i.toString()} className="w-full user-message flex gap-[10px]">
                                                <div className="w-[10%] h-[50px] rounded-[100%] ">
                                                    <img src={currentUser?.avatar ? currentUser?.avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s"} alt={chatBot?.Name} className="w-full h-full rounded-[100%]" />
                                                </div>
                                                <div className="flex flex-col gap-[10px] w-[80%]">
                                                    <span className="w-fit py-[10px] px-[20px] flex flex-col user-message-container">
                                                        <p className="text-[14px] text-[#CFCFCFCF] m-0">
                                                            {message?.message_content}
                                                        </p>
                                                        <span className="text-[12px] text-[#CFCFCFCF] self-end usermessage-date">
                                                            {formatDate(message?.created)}
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        }
                                    })}
                                </div>

                                }


                                <div className="chat-input">
                                    <div className="flex gap-[10px] items-center w-[80%]">
                                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M30 20C30 14.4772 25.5228 10 20 10C14.4772 10 10 14.4772 10 20C10 25.5228 14.4772 30 20 30C25.5228 30 30 25.5228 30 20Z" stroke="#C4B8F9" stroke-width="1.5" />
                                            <path d="M20 16V24M24 20L16 20" stroke="#C4B8F9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <input value={currentMessage} onChange={(e) => {
                                            setCurrentMessage(e.target.value)
                                        }} type="text" placeholder="Enter text to send..." className="chtinput text-[12px] text-[#CFCFCFCF] outline-none  py-[10px] px-[20px] " />
                                    </div>
                                    <div onClick={sendMessage} className="w-[8%] items-center hover:cursor-pointer">
                                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="40" height="40" rx="12" fill="#B0A1FC" />
                                            <path d="M20 27V13M20 13L13 20M20 13L27 20" stroke="#FEFEFE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="flex flex-col ">
                    {loading === true ? <div class="flex justify-center items-center h-screen">
                        <div class="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
                    </div> : <>
                        <div className="w-full border-b-[1px] border-b-[#25273f]">
                            <div className="flex flex-col p-[15px] bg-[#3a355793]">
                                <span className={`flex py-[10px] px-[8px] `}>
                                    <span className="w-[30%] max-w-[40px] h-[40px] rounded-[100%]">
                                        <img
                                            src={`http://data.gmini.ai/api/files/yttfv3r7vgmd959/${chatBot?.id}/` + chatBot?.Pic}
                                            alt={chatBot?.Name}
                                            className="rounded-[100%] w-full h-full object-cover"
                                        />
                                    </span>
                                    <span className="w-[70%] justify-between ml-[10px] relative">
                                        <span className="flex flex-col">
                                            <p className="text-[16px] font-bold text-white m-0">{chatBot?.Name}</p>
                                            <p className="text-[10px] text-[#CFCFCF] m-0">@{chatBot?.Name}</p>
                                        </span>
                                    </span>
                                </span>
                                <span className="w-full flex gap-[10px]">
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
                                    <span className="w-[30px] h-[30px] p-[4px] hover:cursor-pointer flex justify-center items-center rounded-[100%] border-[1px] bg-black border-[#25273f]">
                                        <svg width="21" height="5" viewBox="0 0 21 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="2.5" cy="2.5" r="2.5" fill="white" fill-opacity="0.5" />
                                            <circle cx="10.5" cy="2.5" r="2.5" fill="white" fill-opacity="0.5" />
                                            <circle cx="18.5" cy="2.5" r="2.5" fill="white" fill-opacity="0.5" />
                                        </svg>

                                    </span>

                                </span>
                                <div className='flex gap-[10px] items-center  py-[20px]'>
                                    {chatBot?.Tags?.map((val, i) => {
                                        return <span key={val?.tag?.toString()+i?.toString()} className='rounded-[20px] text-white px-[10px] py-[6px] text-[12px] bg-[#433e64b5] '>
                                            {val?.Tag}
                                        </span>
                                    })}

                                </div>
                                <p className="text-[#CFCFCF] text-[12px] mb-0">{chatBot?.Description}</p>
                            </div>
                        </div>
                        <div className="flex flex-col p-[20px]">
                            <div className="flex justify-between items-center border-b-[#25273f] border-b-[1px] pb-[20px] cursor-pointer">
                                <span className="flex gap-[6px] items-center">
                                    <span className="h-[30px] w-[30px] flex justify-center items-center p-[6px] rounded-[100%] bg-[#433e64b5]">
                                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.8438 4.6875H5.46875C5.0375 4.6875 4.6875 5.0375 4.6875 5.46875C4.6875 5.9 5.0375 6.25 5.46875 6.25H14.8438C15.275 6.25 15.625 5.9 15.625 5.46875C15.625 5.0375 15.275 4.6875 14.8438 4.6875ZM11.7188 7.8125H5.46875C5.0375 7.8125 4.6875 8.1625 4.6875 8.59375C4.6875 9.025 5.0375 9.375 5.46875 9.375H11.7188C12.15 9.375 12.5 9.025 12.5 8.59375C12.5 8.1625 12.15 7.8125 11.7188 7.8125Z" fill="white" />
                                            <path d="M17.1875 0H3.125C1.40156 0 0 1.40156 0 3.125V18.75C0 19.0531 0.175 19.3297 0.45 19.4578C0.553821 19.5059 0.666827 19.531 0.78125 19.5312C0.960938 19.5312 1.13906 19.4688 1.28125 19.35L5.75156 15.625H17.1875C18.9109 15.625 20.3125 14.2234 20.3125 12.5V3.125C20.3125 1.40156 18.9109 0 17.1875 0ZM18.75 12.5C18.75 13.3609 18.05 14.0625 17.1875 14.0625H5.46875C5.28594 14.0625 5.10938 14.1266 4.96875 14.2438L1.5625 17.0828V3.125C1.5625 2.26406 2.2625 1.5625 3.125 1.5625H17.1875C18.05 1.5625 18.75 2.26406 18.75 3.125V12.5Z" fill="white" />
                                            <path d="M21.875 6.25C21.4438 6.25 21.0938 6.6 21.0938 7.03125C21.0938 7.4625 21.4438 7.8125 21.875 7.8125C22.7375 7.8125 23.4375 8.51406 23.4375 9.375V22.5922L20.8 20.4828C20.6613 20.3728 20.4895 20.3128 20.3125 20.3125H9.375C8.5125 20.3125 7.8125 19.6109 7.8125 18.75V17.9688C7.8125 17.5375 7.4625 17.1875 7.03125 17.1875C6.6 17.1875 6.25 17.5375 6.25 17.9688V18.75C6.25 20.4734 7.65156 21.875 9.375 21.875H20.0375L23.7297 24.8297C23.8689 24.9399 24.0412 24.9999 24.2188 25C24.3328 25 24.4484 24.975 24.5578 24.9234C24.6902 24.8593 24.8019 24.7592 24.8801 24.6346C24.9583 24.51 24.9999 24.3659 25 24.2188V9.375C25 7.65156 23.5984 6.25 21.875 6.25Z" fill="white" />
                                        </svg>

                                    </span>
                                    <p className="text-[14px] text-white m-0"> Start new chat</p>
                                </span>
                                <span className="flex items-center">
                                    <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.4993 10.4936L1.69021 19.2998C1.30367 19.6854 0.677417 19.6854 0.289903 19.2998C-0.0966344 18.9143 -0.0966343 18.288 0.289903 17.9024L8.40028 9.79499L0.290881 1.68754C-0.0956566 1.30198 -0.0956566 0.675728 0.290881 0.28919C0.677419 -0.0963725 1.30465 -0.0963725 1.69119 0.28919L10.5003 9.09537C10.881 9.47694 10.881 10.113 10.4993 10.4936Z" fill="white" />
                                    </svg>

                                </span>
                            </div>
                            <div className="flex justify-between items-center border-b-[#25273f] border-b-[1px] pb-[20px] mt-[20px] cursor-pointer">
                                <span className="flex gap-[6px] items-center">
                                    <span className="h-[30px] w-[30px] flex justify-center items-center p-[6px] rounded-[100%] bg-[#433e64b5]">
                                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_25_37)">
                                                <path d="M12.3867 13.5195L17.0742 17.0352C17.1563 17.0967 17.2497 17.1415 17.3491 17.167C17.4485 17.1924 17.5519 17.1981 17.6535 17.1836C17.755 17.169 17.8527 17.1347 17.941 17.0824C18.0293 17.0301 18.1064 16.961 18.168 16.8789C18.2295 16.7968 18.2743 16.7034 18.2998 16.604C18.3252 16.5047 18.3309 16.4012 18.3164 16.2997C18.3019 16.1981 18.2675 16.1004 18.2152 16.0121C18.1629 15.9238 18.0938 15.8467 18.0117 15.7852L13.6719 12.5V5.85938C13.6719 5.65217 13.5896 5.45346 13.4431 5.30695C13.2965 5.16044 13.0978 5.07812 12.8906 5.07812C12.6834 5.07812 12.4847 5.16044 12.3382 5.30695C12.1917 5.45346 12.1094 5.65217 12.1094 5.85938V12.8906C12.1094 13.15 12.218 13.3836 12.3867 13.5195Z" fill="white" />
                                                <path d="M13.2822 1C7.56387 1 2.68067 5.12734 1.72754 10.7656L1.43067 10.3242C1.31463 10.1522 1.13504 10.0334 0.931385 9.99384C0.727732 9.95429 0.516705 9.99725 0.344729 10.1133C0.172753 10.2293 0.0539138 10.4089 0.0143554 10.6126C-0.0252031 10.8162 0.0177594 11.0272 0.133792 11.1992L1.69629 13.543C1.75975 13.6395 1.84381 13.7207 1.94242 13.7808C2.04104 13.8409 2.15176 13.8784 2.2666 13.8906H2.34473C2.44718 13.8903 2.54855 13.8697 2.64305 13.8302C2.73756 13.7907 2.82335 13.7329 2.89551 13.6602L4.84864 11.707C4.9881 11.559 5.06441 11.3625 5.06138 11.1591C5.05835 10.9558 4.97622 10.7616 4.83241 10.6178C4.68861 10.474 4.49443 10.3918 4.29108 10.3888C4.08773 10.3858 3.89119 10.4621 3.74317 10.6016L3.25879 11.0898C4.1584 5.55312 9.37598 1.79453 14.9123 2.69414C20.4486 3.59375 24.208 8.81094 23.3084 14.3477C22.5096 19.2641 18.2631 22.8758 13.2822 22.875C11.7344 22.9031 10.2026 22.5569 8.81728 21.8659C7.43192 21.1749 6.23393 20.1596 5.3252 18.9062C5.26569 18.8226 5.1903 18.7516 5.10333 18.6971C5.01635 18.6426 4.9195 18.6058 4.8183 18.5887C4.7171 18.5717 4.61353 18.5747 4.51351 18.5977C4.41349 18.6207 4.31897 18.6632 4.23535 18.7227C4.15174 18.7822 4.08066 18.8576 4.02618 18.9445C3.97171 19.0315 3.93489 19.1284 3.91784 19.2296C3.90079 19.3308 3.90385 19.4343 3.92682 19.5343C3.9498 19.6344 3.99225 19.7289 4.05176 19.8125C5.10412 21.2698 6.49293 22.4513 8.10002 23.2566C9.70711 24.0618 11.4849 24.4669 13.2822 24.4375C19.7545 24.4375 25.001 19.191 25.001 12.7188C25.001 6.24648 19.7545 1 13.2822 1Z" fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_25_37">
                                                    <rect width="25" height="25" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>


                                    </span>
                                    <p className="text-[14px] text-white m-0"> History</p>
                                </span>
                                <span className="flex items-center">
                                    <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.4993 10.4936L1.69021 19.2998C1.30367 19.6854 0.677417 19.6854 0.289903 19.2998C-0.0966344 18.9143 -0.0966343 18.288 0.289903 17.9024L8.40028 9.79499L0.290881 1.68754C-0.0956566 1.30198 -0.0956566 0.675728 0.290881 0.28919C0.677419 -0.0963725 1.30465 -0.0963725 1.69119 0.28919L10.5003 9.09537C10.881 9.47694 10.881 10.113 10.4993 10.4936Z" fill="white" />
                                    </svg>

                                </span>
                            </div>
                            <div className="flex justify-between items-center border-b-[#25273f] border-b-[1px] mt-[20px] pb-[20px] cursor-pointer">
                                <span className="flex gap-[6px] items-center">
                                    <span className="h-[30px] w-[30px] flex justify-center items-center p-[6px] rounded-[100%] bg-[#433e64b5]">
                                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_25_43)">
                                                <path d="M9.42129 16.0312C9.3576 16.0315 9.29429 16.0215 9.23379 16.0016C8.16274 15.649 7.23043 14.9671 6.56991 14.0532C5.9094 13.1393 5.55443 12.0401 5.55567 10.9125C5.55732 9.49223 6.12225 8.13061 7.12653 7.12633C8.13081 6.12205 9.49243 5.55712 10.9127 5.55546C12.18 5.55036 13.4075 5.99725 14.3749 6.81587C15.3424 7.6345 15.9862 8.77122 16.1908 10.0219C16.2166 10.1777 16.1795 10.3374 16.0875 10.4658C15.9956 10.5942 15.8564 10.6808 15.7006 10.7066C15.5448 10.7324 15.3851 10.6953 15.2567 10.6033C15.1283 10.5114 15.0416 10.3722 15.0158 10.2164C14.8565 9.24441 14.3559 8.36106 13.6039 7.725C12.8518 7.08894 11.8976 6.74186 10.9127 6.74609C9.80814 6.74754 8.74924 7.18696 7.9682 7.968C7.18716 8.74904 6.74774 9.80794 6.74629 10.9125C6.74541 11.7898 7.02161 12.6449 7.53551 13.3559C8.04941 14.0669 8.77474 14.5975 9.60801 14.8719C9.74311 14.9156 9.8581 15.0062 9.93217 15.1274C10.0062 15.2485 10.0345 15.3922 10.0118 15.5324C9.98919 15.6725 9.91711 15.8 9.80865 15.8916C9.70019 15.9833 9.5625 16.0331 9.42051 16.032L9.42129 16.0312Z" fill="white" />
                                                <path d="M9.43594 21.825C9.28315 21.825 9.13623 21.7661 9.02568 21.6607C8.91512 21.5552 8.84942 21.4112 8.84219 21.2586V21.257L8.50781 19.2695C7.88281 19.0875 7.28047 18.8359 6.70703 18.518L5.00547 19.7375C4.89078 19.8193 4.75086 19.8579 4.61045 19.8464C4.47005 19.835 4.33822 19.7743 4.23828 19.675L2.15078 17.5875C2.05109 17.4878 1.99007 17.3559 1.97862 17.2154C1.96717 17.0749 2.00604 16.9348 2.08828 16.8203L3.30703 15.1172C2.99039 14.5474 2.73856 13.9439 2.55625 13.318L0.497656 12.9766C0.358566 12.9534 0.232201 12.8817 0.141065 12.7741C0.0499297 12.6665 -5.96277e-05 12.5301 5.3377e-08 12.3891V9.43594C5.3377e-08 9.14531 0.210938 8.89687 0.497656 8.85L2.55625 8.50703C2.73828 7.88203 2.98906 7.27969 3.30703 6.70781L2.08828 5.00469C2.00588 4.89022 1.96692 4.75016 1.97838 4.60959C1.98983 4.46902 2.05094 4.33712 2.15078 4.2375L4.23828 2.15078C4.33788 2.05097 4.46972 1.9898 4.61025 1.97821C4.75078 1.96662 4.89086 2.00536 5.00547 2.0875L6.70703 3.30703C7.27728 2.99048 7.881 2.7384 8.50703 2.55547L8.84844 0.497656C8.87157 0.358566 8.94332 0.232201 9.05091 0.141065C9.15849 0.0499297 9.29494 -5.96277e-05 9.43594 5.33769e-08H12.3891C12.6805 5.33769e-08 12.9281 0.210938 12.9766 0.497656L13.3188 2.55547C13.9438 2.73828 14.5461 2.98984 15.118 3.30703L16.8203 2.0875C16.9348 2.00526 17.0749 1.96639 17.2154 1.97784C17.3559 1.98929 17.4878 2.0503 17.5875 2.15L19.675 4.2375C19.8805 4.44375 19.907 4.76875 19.7375 5.00547L18.5188 6.70781C18.8359 7.27969 19.0875 7.88203 19.2688 8.50703L21.3281 8.84922C21.4672 8.87235 21.5936 8.9441 21.6847 9.05169C21.7759 9.15927 21.8258 9.29572 21.8258 9.43672V10.1187C21.8258 10.2766 21.7631 10.4281 21.6514 10.5397C21.5398 10.6513 21.3884 10.7141 21.2305 10.7141C21.0726 10.7141 20.9212 10.6513 20.8095 10.5397C20.6979 10.4281 20.6352 10.2766 20.6352 10.1187V9.94141L18.6961 9.61875C18.581 9.59972 18.474 9.54719 18.3885 9.46771C18.3031 9.38823 18.2429 9.28533 18.2156 9.17187C18.0275 8.40029 17.7196 7.66296 17.3031 6.98672C17.2417 6.88683 17.2112 6.77105 17.2154 6.65388C17.2196 6.53672 17.2582 6.4234 17.3266 6.32812L18.475 4.72266L17.1031 3.35L15.4969 4.5C15.4017 4.56825 15.2885 4.60689 15.1715 4.61106C15.0545 4.61523 14.9388 4.58475 14.8391 4.52344C14.163 4.1063 13.4256 3.79786 12.6539 3.60937C12.5405 3.58183 12.4376 3.52163 12.3581 3.43624C12.2785 3.35084 12.2257 3.24399 12.2063 3.12891L11.8844 1.19063H9.94063L9.61953 3.12891C9.60021 3.24413 9.54749 3.35115 9.46791 3.4367C9.38834 3.52225 9.2854 3.58256 9.17188 3.61016C8.40023 3.79812 7.66288 4.10603 6.98672 4.52266C6.88687 4.58413 6.77106 4.61471 6.65388 4.61054C6.53669 4.60637 6.42336 4.56764 6.32813 4.49922L4.72266 3.35078L3.35 4.72266L4.49922 6.32812C4.63906 6.52344 4.64766 6.78203 4.52266 6.98672C4.10597 7.66293 3.79781 8.40026 3.60938 9.17187C3.58207 9.28533 3.52193 9.38823 3.43648 9.46771C3.35103 9.54719 3.24405 9.59972 3.12891 9.61875L1.18984 9.94141V11.8844L3.12891 12.2062C3.24405 12.2253 3.35103 12.2778 3.43648 12.3573C3.52193 12.4368 3.58207 12.5397 3.60938 12.6531C3.79752 13.4247 4.10543 14.162 4.52188 14.8383C4.58325 14.9382 4.61377 15.054 4.6096 15.1711C4.60543 15.2883 4.56676 15.4016 4.49844 15.4969L3.34922 17.1023L4.72188 18.4758L6.32813 17.325C6.42339 17.2566 6.53678 17.2179 6.65399 17.2139C6.7712 17.2099 6.88698 17.2407 6.98672 17.3023C7.66289 17.7189 8.40025 18.0268 9.17188 18.2148C9.28529 18.2422 9.38814 18.3024 9.4676 18.3878C9.54706 18.4733 9.59963 18.5802 9.61875 18.6953L10.0156 21.0602H10.0141C10.0242 21.1211 10.0313 21.1898 10.0313 21.2305C10.0313 21.5586 9.76484 21.825 9.43594 21.825Z" fill="white" />
                                                <path d="M13.901 25C13.8227 25.0002 13.7452 24.985 13.6729 24.9551C13.6006 24.9253 13.5349 24.8814 13.4796 24.8261C13.4242 24.7708 13.3804 24.7051 13.3506 24.6328C13.3207 24.5605 13.3055 24.4829 13.3057 24.4047V22.1992H12.5002C12.1566 22.199 11.8272 22.0625 11.5842 21.8197C11.3412 21.5768 11.2045 21.2475 11.2041 20.9039V13.2008C11.2041 12.857 11.3406 12.5272 11.5837 12.2841C11.8267 12.0409 12.1564 11.9041 12.5002 11.9039H23.7041C24.0478 11.9041 24.3773 12.0408 24.6203 12.2838C24.8634 12.5268 25 12.8563 25.0002 13.2V20.9031C25 21.2468 24.8634 21.5764 24.6203 21.8194C24.3773 22.0624 24.0478 22.199 23.7041 22.1992H16.9486L14.3213 24.8258C14.2098 24.9373 14.0586 25 13.901 25ZM12.5002 13.0953C12.4724 13.0953 12.4456 13.1063 12.4259 13.126C12.4061 13.1456 12.3949 13.1722 12.3947 13.2V20.9031C12.3947 20.961 12.4416 21.0086 12.5002 21.0086H13.901C14.2291 21.0086 14.4963 21.275 14.4963 21.6039V22.968L16.2807 21.1828C16.3359 21.1275 16.4016 21.0837 16.4739 21.0538C16.5461 21.0239 16.6236 21.0085 16.7018 21.0086H23.7041C23.7627 21.0086 23.8096 20.9617 23.8096 20.9031V13.2C23.8094 13.1722 23.7982 13.1456 23.7784 13.126C23.7586 13.1063 23.7319 13.0953 23.7041 13.0953H12.5002Z" fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_25_43">
                                                    <rect width="25" height="25" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>


                                    </span>
                                    <p className="text-[14px] text-white m-0"> Chat setting</p>
                                </span>
                                <span className="flex items-center">
                                    <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.4993 10.4936L1.69021 19.2998C1.30367 19.6854 0.677417 19.6854 0.289903 19.2998C-0.0966344 18.9143 -0.0966343 18.288 0.289903 17.9024L8.40028 9.79499L0.290881 1.68754C-0.0956566 1.30198 -0.0956566 0.675728 0.290881 0.28919C0.677419 -0.0963725 1.30465 -0.0963725 1.69119 0.28919L10.5003 9.09537C10.881 9.47694 10.881 10.113 10.4993 10.4936Z" fill="white" />
                                    </svg>

                                </span>
                            </div>
                            <div className="flex mt-[20px] py-[20px] flex-col gap-[20px]">
                                <span className="w-full bg-[#bdb0f9] py-[10px] px-[20px]  font-bold text-[14px] text-center rounded-[20px] hover:cursor-pointer">
                                    Add profile card
                                </span>
                                <span className="w-full text-[#bdb0f9] border-[#bdb0f9] border-[1px] py-[10px] px-[20px]  font-bold text-[14px] text-center rounded-[20px] hover:cursor-pointer">
                                    Add scene card
                                </span>
                            </div>
                        </div>
                    </>}
                </div>
            </div>
            <div className="lg:hidden w-full">
                {
                    loading === true ? <div class="flex justify-center items-center h-screen">
                        <div class="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
                    </div> : selectedChatId ? <div className="w-full">
                        <div className="w-full flex px-[20px] gap-[10px] border-b-[1px] border-b-[#25273f] pt-[40px] pb-[20px]">
                            <span className="flex items-center" onClick={() => { setSelectedChatId(null) }}>
                                <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.74593 6.96465L7.49139 0.221429C7.78738 -0.0738098 8.26692 -0.0738097 8.56365 0.221429C8.85964 0.516668 8.85964 0.996213 8.56365 1.29145L2.35324 7.49963L8.56291 13.7078C8.85889 14.003 8.85889 14.4826 8.56291 14.7786C8.26692 15.0738 7.78663 15.0738 7.49064 14.7786L0.745181 8.03535C0.45368 7.74317 0.45368 7.25609 0.74593 6.96465Z" fill="white" />
                                </svg>

                            </span>
                            <div className="w-[60px] h-[60px] rounded-[100%] mb-[8px]">
                                <img src={`http://data.gmini.ai/api/files/yttfv3r7vgmd959/${chatBot?.id}/` + chatBot?.Pic} alt={chatBot?.Name} className="w-full h-full rounded-[100%]" />
                            </div>
                            <span className="flex flex-col">
                                <p className="text-[16px] font-bold text-white m-0">{chatBot?.Name}</p>
                                <p className="text-[12px] text-[#CFCFCFCF] m-0">
                                    @{chatBot?.Name}
                                </p>
                            </span>
                        </div>
                        <div className=" w-full px-[20px] relative min-h-[25rem] max-h-[30rem] overflow-y-auto chatbox flex-col gap-[40px] mt-[40px] flex">
                            {loading == true ? <div class="flex justify-center items-center h-screen">
                                <div class="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
                            </div> : <div className=" w-full px-[20px] relative overflow-y-auto chatbox flex-col gap-[40px] mt-[40px] flex">
                                {sortMessagesByCreated(messages)?.map((message, index) => {
                                     if (message?.role=="assistant") {
                                        return <div key={message?.chatbot_id?.toString()+index.toString()} className="w-full ai-message flex gap-[10px]">
                                            <div className="w-[20%] h-[50px] rounded-[100%] ">
                                                <img src={`http://data.gmini.ai/api/files/yttfv3r7vgmd959/${chatBot?.id}/` + chatBot?.Pic} alt={chatBot?.Name} className="w-full h-full rounded-[100%]" />
                                            </div>
                                            <div className="flex flex-col gap-[10px] w-[80%]">
                                                <p className="text-[16px] font-bold text-white m-0">{chatBot?.Name}</p>
                                                <span className="w-fit py-[10px] px-[20px] flex flex-col ai-message-container">
                                                    <p className="text-[14px] text-[#CFCFCFCF] m-0">
                                                        {message?.message_content}
                                                    </p>
                                                    <span className="text-[12px] text-[#CFCFCFCF] aimessage-date">
                                                        {formatDate(message?.created)}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    } else {
                                        return <div  key={message?.user_id?.toString()+index.toString()} className="w-full user-message flex gap-[10px]">
                                            <div className="w-[20%] h-[50px] rounded-[100%] ">
                                                <img src={currentUser?.avatar ? currentUser?.avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s"} alt={chatBot?.Name} className="w-full h-full rounded-[100%]" />
                                            </div>
                                            <div className="flex flex-col gap-[10px] w-[80%]">
                                                <span className="w-fit py-[10px] px-[20px] flex flex-col user-message-container">
                                                    <p className="text-[14px] text-[#CFCFCFCF] m-0">
                                                        {message?.message_content}
                                                    </p>
                                                    <span className="text-[12px] text-[#CFCFCFCF] self-end usermessage-date">
                                                        {formatDate(message?.created)}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    }

                                })}

                            </div>

                            }

                            <div className="chat-input">
                                <div className="flex gap-[10px] items-center w-[80%]">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M30 20C30 14.4772 25.5228 10 20 10C14.4772 10 10 14.4772 10 20C10 25.5228 14.4772 30 20 30C25.5228 30 30 25.5228 30 20Z" stroke="#C4B8F9" stroke-width="1.5" />
                                        <path d="M20 16V24M24 20L16 20" stroke="#C4B8F9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <input value={currentMessage} onChange={(e) => {
                                        setCurrentMessage(e.target.value)
                                    }} type="text" placeholder="Enter text to send..." className="chtinput text-[12px] text-[#CFCFCFCF] outline-none  py-[10px] px-[20px] " />
                                </div>
                                <div onClick={sendMessage} className="w-[8%] items-center hover:cursor-pointer">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="40" height="40" rx="12" fill="#B0A1FC" />
                                        <path d="M20 27V13M20 13L13 20M20 13L27 20" stroke="#FEFEFE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                </div>
                            </div>
                        </div>
                    </div> : <div className="flex flex-col w-full">
                        {loading == true ? <div class="flex justify-center items-center h-screen">
                            <div class="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
                        </div> : messagehistory?.map((user,i) => (
                            <div
                                key={user?.chatbot_id?.toString()+i.toString()}
                                onClick={() => handleChatClick(user?.chatbot_id)}
                                className={`w-full py-[10px] px-[6px] border-b-[1px] border-b-[#25273f] hover:cursor-pointer`}
                            >
                                <span className={`flex rounded-[20px] py-[10px] px-[8px] ${selectedChatId === user?.chatbot_id ? 'bg-[#3a3557b5]' : ''}`}>
                                    <span className="w-[30%] max-w-[40px] h-[40px] rounded-[100%]">
                                        <img
                                            src={`http://data.gmini.ai/api/files/yttfv3r7vgmd959/${user?.historyConversationBots?.id}/` + user?.
                                                historyConversationBots?.Pic}
                                            alt={user?.Name}
                                            className="rounded-[100%] w-full h-full object-cover"
                                        />
                                    </span>
                                    <span className="w-[70%] justify-between ml-[10px] relative">
                                        <span className="flex flex-col">
                                            <p className="text-[16px] font-bold text-white m-0">{user?.historyConversationBots?.Name}</p>
                                            <p className="text-[12px] text-white m-0">{user?.message_content?.length>20?user?.message_content?.slice(0,19)+'...':user?.message_content}</p>
                                        </span>
                                        <span className="text-[12px] text-[#CFCFCFCF] absolute top-0 right-0">
                                            {formatDate(user?.created)}
                                        </span>
                                    </span>
                                </span>
                            </div>
                            
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}