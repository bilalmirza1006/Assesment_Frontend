// // import React from 'react'

// // function ChatList({ src, userName, lastMessage, messageTime, icon }) {
// //     return (
// //         <div className='flex p-4 items-center w-full border-b-2 border-solid border-gray-400'>

// //         {/* // <div className='flex bg-green-400 p-4 items-center w-full border-b-2 border-solid'> */}
// //                 <div>

// //                     <div className=' w-12 h-12'>
// //                         <img
// //                             src={src}
// //                             alt="Image"
// //                             className=' w-full h-full object-cover rounded-full'
// //                         />
// //                     </div>
// //                 </div>
// //                 <div className='ml-4 w-full'>
// //                     {/* <h2>{userName}</h2> */}
// //                     <p className='text-lg font-semibold'>{userName}</p>
// //                     <p className='text-gray-500'>{lastMessage}</p>
// //                 </div>
// //                 <div className='flex flex-col w-full items-end'>
// //                     <div className='mb-2'>
// //                         <p>{messageTime}</p>
// //                     </div>
// //                     <div>
// //                         {icon}
// //                     </div>
// //                 </div>
// //             </div>
// //             )
// // }

// //             export default ChatList


// import React from 'react'

// function ChatList({
//     src,
//     userName,
//     lastMessage,
//     messageTime,
//     icon,
//     unreadMessage,
//     onlineStatus,
//     isTyping
// }) {
//     return (
//         <div className='flex p-4 items-center w-full border-b-2 border-solid border-gray-300 hover:bg-gray-100 cursor-pointer'>
//             {/* Profile Image */}
//             <div className='relative'>
//                 <div className='w-12 h-12'>
//                     <img
//                         src={src}
//                         alt="Image"
//                         className='w-full h-full object-cover rounded-full'
//                     />
//                 </div>
//                 {onlineStatus && (
//                     <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
//                 )}
//             </div>

//             {/* Chat Info */}
//             <div className='ml-4 flex-1'>
//                 <div className='flex justify-between'>
//                     <p className='text-lg font-semibold text-gray-900'>{userName}</p>
//                     <p className='text-sm text-gray-500'>{messageTime}</p>
//                 </div>
//                 <div className='flex justify-between items-center'>
//                     <p className={`text-gray-500 ${isTyping ? 'italic' : ''}`}>
//                         {isTyping ? 'Typing...' : lastMessage}
//                     </p>
//                     {/* Conditionally show icon if no unread messages */}
//                     {unreadMessage === 0 && icon && (
//                         <span className="text-lg text-gray-500">
//                             {icon}
//                         </span>
//                     )}
//                     {unreadMessage > 0 && (
//                         <div className='ml-4'>
//                             <span className='bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full'>
//                                 {unreadMessage}
//                             </span>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Unread Message Counter */}

//         </div>
//     )
// }

// export default ChatList;

import React from 'react'
import { GoFileDirectoryFill } from 'react-icons/go';
import { BsCheck, BsCheckAll } from 'react-icons/bs';  // Icons for message status
import { FaClock } from 'react-icons/fa';              // Pending icon

function ChatList({
    item,
    src,
    userName,
    lastMessage,
    messageTime,
    icon,
    unreadMessage,
    onlineStatus,
    isTyping,
    messageStatus , // New prop for message status
    messageHandle
}) {
    // Function to render message status icon
    const renderMessageStatus = () => {
        switch (messageStatus) {
            case 'pending':
                return <FaClock className="text-gray-500 text-sm" />;
            case 'delivered':
                return <BsCheck className="text-gray-500 text-sm" />;
            case 'received':
                return <BsCheckAll className="text-gray-500 text-sm" />;  // Gray for "received"
            case 'read':
                return <BsCheckAll className="text-blue-500 text-sm" />;  // Blue for "read" status
            default:
                return null;
        }
    };
// console.log("item", item);


// if (!item || typeof item !== "object") {
//     return (
//         <div className="p-4 border rounded-lg shadow-md bg-white">
//             <p className="text-red-500">Invalid item data</p>
//         </div>
//     );
// }



    return (
        <div onClick={messageHandle} className='flex p-4 items-center w-full border-b-2 border-solid border-gray-300 hover:bg-gray-100 cursor-pointer'>
            {/* Profile Image */}
            <div className='relative'>
                <div className='w-12 h-12'>
                    <img
                        // src={src}
                        // src={item.image}
                        alt="Image"
                        className='w-full h-full object-cover rounded-full'
                    />
                </div>
                {onlineStatus && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                )}
            </div>

            {/* Chat Info */}
            <div className='ml-4 flex-1'>
                <div className='flex justify-between'>
                    <p className='text-lg font-semibold text-gray-900'>{item.username}</p>
                    <p className='text-sm text-gray-500'>{messageTime}</p>
                </div>
                <div className='flex justify-between items-center'>
                    <p className={`text-gray-500 ${isTyping ? 'italic' : ''}`}>
                        {isTyping ? 'Typing...' : lastMessage}
                    </p>
                    {/* Conditionally show icon if no unread messages */}
                    {icon && (
                        <div className='ml-4 flex flex-col items-end'>
                            {unreadMessage > 0 ? (
                                <span className='bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full'>
                                    {unreadMessage} {/* Show unread messages count */}
                                </span>
                            ) : (
                                <div className='mt-2'>
                                    {renderMessageStatus()}  {/* Show message status icon when no unread messages */}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ChatList;
