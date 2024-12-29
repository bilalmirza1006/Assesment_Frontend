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
    const { authorId, userId } = location.state || {};
    console.log("location", location.state, 'auther', authorId, 'user', userId);
    // const [messages, setMessages] = useState([
    //     { message: "Hello!", timestamp: "10:15 AM", isSender: false },
    //     { message: "Hi, how are you?", timestamp: "10:16 AM", isSender: true },
    //     { message: "I'm good! What about you?", timestamp: "10:17 AM", isSender: false },
    //     { message: "I'm good! What about you?", timestamp: "10:17 AM", isSender: false },
    //     { message: "I'm good! What about you?", timestamp: "10:17 AM", isSender: true },
    //     { message: "I'm good! What about you?awretxf wehfouweof wefweoief oiwe foi wehhfoiweh oif wef woiefoiwehfouwehfoweh fowheofu hweoufh weouefh weouhcygvhbjnkm", timestamp: "10:17 AM", isSender: false },
    // ]);
    // const [messageInput, setMessageInput] = useState()
    const [messageInput, setMessageInput] = useState(""); // State to manage the input field
    const [messages, setMessages] = useState([]); // State to store sent messages   
    // const sendHandler = () => {
    //     // Log the input message for debugging
    //     console.log('sendHandler called with:', messageInput);

    //     // Check if `messageInput` is not empty
    //     // if (messageInput.trim()) {
    //         // Update the `messages` state with a new message
    //         setMessages((prevMessages) => [
    //             ...prevMessages,
    //             {
    //                 message: messageInput,
    //                 timestamp: new Date().toLocaleTimeString(),
    //                 isSender: true,
    //             },
    //         ]);

    //         // Clear the input field
    //         setMessageInput('');
    //     // } else {
    //     //     console.log('Message input is empty. No message sent.');
    //     // }
    // };

    // const [users, setUsers] = useState([])
    const { data: users } = useGetUsersQuery()
    console.log('user', users);

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             const response = await apiClient.get(`/users`);
    //             console.log("alluser", response.data);
    //             // setBlogs(response.data);
    //             setUsers(response.data.users);
    //         } catch (error) {
    //             console.error("Error fetching alluser:", error);
    //         }
    //     };
    //     fetchUsers();
    // }, [])
    // console.log("alluser", users);

    // const location = useLocation();
    // const { authorId, currentUserId } = location.state || {};

    // const sendHandler = () => {
    //     if (messageInput) {
    //         const socket = getSocket();
    //         socket.emit('message', messageInput ,authorId, userId );
    //         setMessages([
    //             ...messages,
    //             { message: messageInput, timestamp: new Date().toLocaleTimeString(), isSender: true },
    //         ]);
    //         setMessageInput(""); // Clear the input field after sending
    //     }
    // };
    // const sendHandler = () => {
    //     if (messageInput) {
    //         const socket = getSocket();
    //         socket.emit('message', {
    //             content: messageInput,
    //             senderId: userId,      // Current user
    //             receiverId: authorId, // Recipient
    //         });

    //         // Update local state for the sender
    //         setMessages([
    //             ...messages,
    //             {
    //                 message: messageInput,
    //                 timestamp: new Date().toLocaleTimeString(),
    //                 isSender: true
    //             },
    //         ]);
    //         setMessageInput(""); // Clear the input field after sending
    //     }
    // };
    // useEffect(() => {
    //     const socket = getSocket();

    //     // Join the chat room
    //     socket.emit("joinRoom", { roomId: `${userId}-${authorId}`, userId });

    //     // Listen for new messages
    //     socket.on("newMessage", (message) => {
    //         console.log("New message received:", message);
    //         // Only add the message if it belongs to this chat
    //         if (
    //             (message.senderId === userId && message.receiverId === authorId) ||
    //             (message.senderId === authorId && message.receiverId === userId)
    //         ) {
    //             setMessages((prevMessages) => [...prevMessages, message]);
    //         }
    //     });

    //     // Cleanup on component unmount
    //     return () => {
    //         socket.off("newMessage");
    //     };
    // }, [userId, authorId]);

    // const sendHandler = () => {
    //     if (messageInput) {
    //         const socket = getSocket();
    //         socket.emit('message', {
    //             content: messageInput,
    //             senderId: userId,      // Current user
    //             receiverId: authorId, // Recipient
    //         });

    //         // Update local state for the sender
    //         setMessages([
    //             ...messages,
    //             {
    //                 message: messageInput,
    //                 timestamp: new Date().toLocaleTimeString(),
    //                 isSender: true
    //             },
    //         ]);
    //         setMessageInput(""); // Clear the input field after sending
    //     }
    // };

    const socket = getSocket();

    const sendHandler = () => {
        if (messageInput.trim()) {
            const roomId = `${userId}-${authorId}`;
            const message = {
                content: messageInput,
                senderId: userId,
                receiverId: authorId,
                roomId,
            };
            socket.emit("message", message);
            setMessages((prev) => [...prev, { ...message,  }]);
            setMessageInput("");
        }
    };
    const [isConnected, setIsConnected] = useState(false);
    
    const { token, userType } = useSelector((state) => state.user?.isLoggedIn);
    useEffect(() => {
        // Reconnect socket on page load if token exists
        // const token = localStorage.getItem("authToken");
        if (token) {
            const socket = connectSocket(token);
            setIsConnected(true);

            // Optionally listen to connection events
            socket.on("connect", () => {
                console.log("Reconnected after refresh");
                setIsConnected(true);
            });

            socket.on("disconnect", () => {
                console.log("Disconnected");
                setIsConnected(false);
            });
        }

        return () => {
            disconnectSocket(); // Cleanup on component unmount
        };
    }, []);

    const joinRoom = (userId, authorId) => {
        const socket = getSocket();
        if (socket) {
            socket.emit("joinRoom", { userId, authorId });
        } else {
            console.error("Socket is not connected!");
        }
    };
    useEffect(() => {
        const socket = getSocket();
        // const roomId = `${userId}-${authorId}`;
        // socket.emit("joinRoom", { roomId });
        joinRoom(userId, authorId);

        // Fetch chat history
        axios
            .get("http://localhost:5000/messages", {
                params: { senderId: userId, receiverId: authorId },
            })
            .then((res) => {
                console.log("Chat history fetched:", res.data);
                setMessages(res.data)
            })
            .catch((err) => console.error("Error fetching messages:", err));

        // Listen for new messages
        socket.on("newMessage", (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.off("newMessage");
        };
    }, [userId, authorId]);
    console.log("New message",messages);

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
                    {users?.length === 0 ?
                        (
                            <p className="text-xl text-center text-gray-600">No user Available</p>

                        )
                        :
                        (
                            <div>
                                {users?.map((item) => {
                                    console.log("map", item)
                                    return (
                                        <ChatList
                                            key={item.id}
                                            item={item}
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

                    {/* <div>
                        {users && users.length > 0 ? (
                            users?.map((item) => {
                                if (!item) return null; // Skip undefined items
                                console.log("map", item);
                                return (
                                    <ChatList
                                        key={item.id}
                                        item={item}
                                        // src={item.image}
                                    // Add props here as needed
                                    />
                                );
                            })
                        ) : (
                            <p>No users available</p> // Fallback UI
                        )}
                    </div> */}
                    {/* <ChatList
                        src={dowloard}
                        userName={'Bilal'}
                        lastMessage={'Hello, how are you?'}
                        messageTime={'11:30 AM'}
                        icon={<GoFileDirectoryFill />}
                        unreadMessage={0}
                        onlineStatus={false}
                        isTyping={false}
                        messageStatus={'delivered'}
                    />
                    <ChatList
                        src={dowloard}
                        userName={'Bilal'}
                        lastMessage={'Hello, how are you?'}
                        messageTime={'11:30 AM'}
                        icon={<GoFileDirectoryFill />}
                        unreadMessage={0}
                        onlineStatus={true}
                        isTyping={true}
                        messageStatus={'delivered'}
                    />
                    <ChatList
                        src={dowloard}
                        userName={'Bilal'}
                        lastMessage={'Hello, how are you?'}
                        messageTime={'11:30 AM'}
                        icon={<GoFileDirectoryFill />}
                        unreadMessage={4}
                        onlineStatus={true}
                        isTyping={false}
                        messageStatus={'delivered'}
                    />
                    <ChatList
                        src={dowloard}
                        userName={'Bilal'}
                        lastMessage={'Hello, how are you?'}
                        messageTime={'11:30 AM'}
                        icon={<GoFileDirectoryFill />}
                        unreadMessage={0}
                        onlineStatus={true}
                        isTyping={false}
                        messageStatus={'pending'}
                    />
                    <ChatList
                        src={dowloard}
                        userName={'Bilal'}
                        lastMessage={'Hello, how are you?'}
                        messageTime={'11:30 AM'}
                        icon={<GoFileDirectoryFill />}
                        unreadMessage={0}
                        onlineStatus={true}
                        isTyping={false}
                        messageStatus={'delivered'}
                    />
                    <ChatList
                        src={dowloard}
                        userName={'Bilal'}
                        lastMessage={'Hello, how are you?'}
                        messageTime={'11:30 AM'}
                        icon={<GoFileDirectoryFill />}
                        unreadMessage={0}
                        onlineStatus={true}
                        isTyping={false}
                        messageStatus={'received'}
                    />

                    <ChatList
                        src={dowloard}
                        userName={'Bilal'}
                        lastMessage={'Hello, how are you?'}
                        messageTime={'11:30 AM'}
                        icon={<GoFileDirectoryFill />}
                        unreadMessage={0}
                        onlineStatus={true}
                        isTyping={false}
                        messageStatus={'read'}
                    /> */}
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
                            {/* <input
                                type="text"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                                placeholder="Type a message..."
                            />
                            <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
                                Send
                            </button> */}
                            {/* <MessageInput
                                sendHandler={sendHandler}
                                setMessageInput={setMessageInput}
                                messageInput={messageInput}
                            /> */}
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