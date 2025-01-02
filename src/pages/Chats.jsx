// import React from 'react'

// function Chats() {
//   return (
//     <div>Chats</div>
//   )
// }

// export default Chats

import React, { useEffect, useState } from 'react'
import SideBarSubMenu from '../components/SideBarSubMenu'
import { LuMessagesSquare } from "react-icons/lu";
import { HiChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { MdWork } from "react-icons/md";
import { CiChat2 } from "react-icons/ci";
import { CiSaveDown2 } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { IoLink } from "react-icons/io5";

import { GoFileDirectoryFill } from "react-icons/go";
import ChatList from '../components/ChatList';
import dowloard from '../images/dowloard.jpg'
import CustomInput from '../components/CustomInput';
import ChatHeader from '../components/ChatHeader';
import Message from '../components/Message';
import MessageInput from '../components/MessageInput';
import UserDetail from '../components/UserDetail';
import Member from '../components/Member';
import VideoAndPhotos from '../components/VideoAndPhotos';
import { connectSocket, disconnectSocket, getSocket } from '../socket/socket';
import apiClient from '../api/apiClient';
import { useLocation } from 'react-router-dom';
import { useGetUsersQuery } from '../reduxQuery/slice/authApi';
import axios from 'axios';
import { useSelector } from 'react-redux';




function Chat() {

    const location = useLocation();
    const { receiverId, userId } = location.state || {};
    // console.log("location", location.state, 'auther', receiverId, 'user', userId);

    const [inputId, setInputId] = useState({ userId, receiverId });
    console.log("setInputId", inputId);

    const [messageInput, setMessageInput] = useState(""); // State to manage the input field
    const [messages, setMessages] = useState([]); // State to store sent messages   

    const { data: users } = useGetUsersQuery()
    // console.log('user', users);

    const socket = getSocket();

    const [user, setUser] = useState(null);
    // useEffect(() => {
    //     socket.on("session", ({ userId, sessionId }) = {
    //         // setUser({ userId, sessionId});
    //         // setUser({ userId, sessionId})
    //     })
    // })

    // useEffect(() => {
    // const socket = getSocket();

    //     socket?.emit('adduser',userId)
    //     socket?.on("getUsers", (users) => {
    //         console.log('active users', users)
    //         // setUsers(users)
    //     })
    // }, [])


    const sendHandler = () => {
        if (messageInput.trim()) {
            // const roomId = `${userId}-${receiverId}`;
            const roomId = [userId, receiverId].sort().join('-');
            const message = {
                content: messageInput,
                senderId:inputId.userId,
                receiverId:inputId.receiverId,
                roomId,
            };
            console.log('messagehandle', message)
            socket.emit("message", message);
            setMessages((prev) => [...prev, { ...message, }]);
            setMessageInput("");
        }
    };
    const [isConnected, setIsConnected] = useState(false);

    const { token, userType } = useSelector((state) => state.user?.isLoggedIn);
    useEffect(() => {
        if (token) {
            const socket = connectSocket(token);
            setIsConnected(true);
            socket.on("connect", () => {
                // console.log("Reconnected after refresh");
                setIsConnected(true);
            });
            // const sockett = getSocket();
            // sockett?.emit('adduser', userId)
            // sockett?.on("getUsers", (users) => {
            //     console.log('active users', users)
            //     // setUsers(users)
            // })

            socket.on("disconnect", () => {
                // console.log("Disconnected");
                setIsConnected(false);
            });
        }

        return () => {
            disconnectSocket(); // Cleanup on component unmount
        };
    }, []);
    useEffect(() => {
        const socket = getSocket();

        socket?.emit('adduser', userId)
        socket?.on("getUsers", (users) => {
            console.log('active users', users)
            // setUsers(users)
        })
        socket?.on("reciveMessage", (message) => {
            console.log('recive message', message)
             setMessages((prev) => [...prev, message]);
             console.log('messages', messages)
        })
    }, [])
    console.log('messages', messages)

    const joinRoom = (userId, receiverId) => {
        const socket = getSocket();
        if (socket) {
            socket.emit("joinRoom", { userId, receiverId });
        } else {
            // console.error("Socket is not connected!");
        }
    };
    useEffect(() => {
        const socket = getSocket();
        joinRoom(userId, receiverId);

        axios
            .get("http://localhost:5000/messages", {
                params: { senderId: userId, receiverId: receiverId },
            })
            .then((res) => {
                // console.log("Chat history fetched:", res.data);
                setMessages(res.data)
            })
            .catch((err) => console.error("Error fetching messages:", err));

        socket.on("newMessage", (message) => {
            // console.log("New message:", message);
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.off("newMessage");
        };
    }, [userId, receiverId]);
    // console.log("New message", messages);


    const [chatList, setChatList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log("chatList", chatList);
    useEffect(() => {
        if (chatList && chatList.length > 0) {
            chatList.forEach((chat) => {
                if (chat.participants && Array.isArray(chat.participants) && chat.participants.length > 1) {
                    const firstParticipantId = chat.participants[0]._id;
                    const secondParticipantId = chat.participants[1]._id;
                    setInputId({ userId: firstParticipantId, receiverId: secondParticipantId });
                }
            });
        }
    }, [chatList]);
    // console.log("logReceiverIds", getFirstParticipantIds(chatList));
    // Function to fetch chat list
    const fetchChatList = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/getChatList?userId=${userId}`);
            setChatList(response.data); // Store chat list in state
            setLoading(false); // Set loading to false after data is fetched
        } catch (err) {
            setError('Failed to fetch chat list');
            setLoading(false);
        }
    };


    const messageHandle = (userId, receiverId) => {
        // Fetch chat history for the given user and author
        axios
            .get("http://localhost:5000/messages", {
                params: { senderId: userId, receiverId: receiverId },
            })
            .then((res) => {
                // console.log(" on click Chat history fetched:", res.data);
                setMessages(res.data);  // Store the chat history in the state
                console.log("Chat history fetched:", res.data);
                setInputId({ userId, receiverId }); // Update the inputId state
            })
            .catch((err) => console.error("Error fetching messages:", err));
    };

    // Use useEffect to fetch data when the component mounts
    useEffect(() => {
        if (userId) {
            fetchChatList(); // Fetch chat list whenever userId changes
        }
    }, [userId]); // Dependency array ensures it runs when userId changes

    if (loading) {
        return <div>Loading...</div>;
    }

    // if (error) {
    //     return <div>{error}</div>;
    // }

    const handleUserAction = (actionType, data) => {
        if (actionType === 'emailClick') {
            console.log('Email clicked:', data);
        } else if (actionType === 'phoneClick') {
            console.log('Phone clicked:', data);
        }
    };
    const members = [
        { avatar: 'https://cdn.pixabay.com/photo/2023/03/12/18/26/girl-7847557_1280.jpg' },
        { avatar: 'https://cdn.pixabay.com/photo/2023/03/12/18/26/girl-7847557_1280.jpg' },
        { avatar: 'https://cdn.pixabay.com/photo/2023/03/12/18/26/girl-7847557_1280.jpg' },
        { avatar: 'https://cdn.pixabay.com/photo/2023/03/12/18/26/girl-7847557_1280.jpg' },
        { avatar: 'https://cdn.pixabay.com/photo/2023/03/12/18/26/girl-7847557_1280.jpg' },
        { avatar: 'https://cdn.pixabay.com/photo/2023/03/12/18/26/girl-7847557_1280.jpg' },
        { avatar: 'https://cdn.pixabay.com/photo/2023/03/12/18/26/girl-7847557_1280.jpg' },
        { avatar: 'https://cdn.pixabay.com/photo/2023/03/12/18/26/girl-7847557_1280.jpg' },
        { avatar: 'https://cdn.pixabay.com/photo/2023/03/12/18/26/girl-7847557_1280.jpg' },
        { avatar: 'https://cdn.pixabay.com/photo/2023/03/12/18/26/girl-7847557_1280.jpg' },
        { avatar: 'https://cdn.pixabay.com/photo/2023/03/12/18/26/girl-7847557_1280.jpg' },
        { avatar: 'https://cdn.pixabay.com/photo/2023/03/12/18/26/girl-7847557_1280.jpg' },
        { avatar: 'https://cdn.pixabay.com/photo/2023/03/12/18/26/girl-7847557_1280.jpg' },
        { avatar: 'https://cdn.pixabay.com/photo/2023/03/12/18/26/girl-7847557_1280.jpg' },
        { avatar: 'https://cdn.pixabay.com/photo/2023/03/12/18/26/girl-7847557_1280.jpg' },
        { avatar: 'https://cdn.pixabay.com/photo/2023/03/12/18/26/girl-7847557_1280.jpg' },
        { avatar: 'https://cdn.pixabay.com/photo/2023/03/12/18/26/girl-7847557_1280.jpg' },
    ];

    const additionalCount = 27; // Example count







    return (
        <div className='w-full h-screen '>
            <div className=' w-[95%] mx-auto border shadow-lg rounded-lg mt-10 p-2 grid'
                style={{ gridTemplateColumns: '80px 1fr 2fr 1fr' }}
            >
                <div className=''>

                    <SideBarSubMenu
                        icon={<HiChatBubbleOvalLeftEllipsis />}
                        title={'All chat'}
                    />
                    <SideBarSubMenu
                        icon={<MdWork />}
                        title={'work'}
                    />
                    <SideBarSubMenu
                        icon={<CiChat2 />}
                        title={'Personal'}
                    />
                    <SideBarSubMenu
                        icon={<CiSaveDown2 />}
                        title={'Saved'}
                    />
                    <SideBarSubMenu
                        icon={<SlCalender />}
                        title={'Calender'}
                    />
                    <SideBarSubMenu
                        icon={<GoFileDirectoryFill />}
                        title={'All file'}
                    />
                </div>
                <div className='border-l-2 border-solid border-gray-300'>
                    <div className='h-20 flex items-center w-full p-2 border-b-2 border-solid border-gray-300'>
                        <CustomInput
                            className='rounded-2xl bg-gray-200'
                            placeholder='Search'
                            icon={<IoIosSearch />}
                        />
                    </div>
                    {chatList?.length === 0 ?
                        (
                            <p className="text-xl text-center text-gray-600">No user Available</p>

                        )
                        :
                        (
                            <div>
                                {chatList?.map((item) => {
                                    // console.log("map", item)
                                    return (
                                        <ChatList
                                            key={item.id}
                                            item={item}
                                            messageHandle={() => messageHandle(item.participants[0], item.participants[1])} // Pass userId and receiverId on click
                                        // messageHandle={messageHandle}
                                        // src={dowloard}
                                        // userName={'Bilal'}
                                        // lastMessage={'Hello, how are you?'}
                                        // messageTime={'11:30 AM'}
                                        // icon={<GoFileDirectoryFill />}
                                        // unreadMessage={0}
                                        // onlineStatus={false}
                                        // isTyping={false}
                                        // messageStatus={'delivered'}
                                        />
                                    )
                                })}
                            </div>
                        )}

                </div>
                <div className='border-l-2 border-solid  border-gray-300'>
                    <div className='h-20 flex items-center w-full p-2 border-b-2 border-solid border-gray-300'>
                        <ChatHeader
                            userName={'Bilel mirza'}
                            lastSeen={'13:03'}
                        />
                    </div>
                    <div className="flex flex-col h-screen p-4 bg-white">
                        <div className="flex-1 overflow-y-auto space-y-4">
                            {messages.map((msg, index) => (
                                <Message
                                    key={index}
                                    message={msg}
                                    // message={msg.content}
                                    // timestamp={msg.timestamp}
                                    // isSender={msg.isSender}
                                    src={dowloard}
                                    icon={<GoFileDirectoryFill />}
                                    messageStatus={'read'}

                                />
                            ))}
                        </div>
                        <div className="mt-4 flex items-center">
                            <MessageInput
                                sendHandler={sendHandler}
                                setMessageInput={setMessageInput}
                                messagesInput={messageInput}
                            />
                        </div>
                    </div>
                </div>
                <div className='border-l-2 border-solid  pl-2 border-gray-300'>
                    <UserDetail
                        src={dowloard}
                        userName="John Doe"
                        member="Premium Member"
                        description="Software Developer kwetfwiefei rgwcuorrywei eeuwe fofywe9f8 w98e 98we y98we y9w ef98 ewf9"
                        email="bilal.tech1006@gmail.com"
                        phone={<IoLink />}
                        onAction={handleUserAction} // Pass function as prop
                    />
                    <Member
                        members={members}
                    />
                    <VideoAndPhotos
                        members={members} />
                </div>
            </div>
        </div>

    )
}

export default Chat