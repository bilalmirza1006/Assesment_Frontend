// import React from "react";

// const Message = ({ message, timestamp, isSender, src }) => {
//     return (
//         <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-4`}>
//             <div className="flex items-end">

//                 {!isSender &&
//                     <div>
//                         <img
//                             src={src}
//                             alt="Avatar"
//                             className={`w-10 h-10 rounded-full ${isSender ? "ml-4" : "mr-2"
//                                 }`}
//                         />
//                     </div>}
//             </div>
//             <div
//                 className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg shadow-lg ${isSender
//                     ? "bg-blue-500 text-white rounded-br-none"
//                     : "bg-gray-200 text-black rounded-bl-none"
//                     }`}
//             >
//                 <p className="text-sm">{message}</p>
//                 <span className="text-xs text-gray-400 mt-2 block text-right">
//                     {timestamp}
//                 </span>
//             </div>
//             <div className="flex items-end">

//                 {isSender && <div>
//                     <img
//                         src={src}
//                         alt="Avatar"
//                         className={`w-10 h-10 rounded-full ${isSender ? "ml-2" : "mr-4"
//                             }`}
//                     />
//                 </div>}
//             </div>
//         </div>
//     );
// };

// export default Message;


import React from "react";
import { BsCheck, BsCheckAll } from 'react-icons/bs';  // Icons for message status
import { FaClock } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Message = ({ message, timestamp, isSender, icon, src, messageStatus }) => {

        const location = useLocation();
    
    const { token, userType } = useSelector((state) => state.user?.isLoggedIn);
    const { authorId, userId } = location.state || {};


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

    return (
        <div className={`flex ${userId == message.sender ? "justify-end" : "justify-start"} mb-4`}>
            {/* Avatar on the left for receiver */}
            {!isSender && (
                <div className="flex items-end">
                    <img
                        src={src}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full mr-2"
                    />
                </div>
            )}
            <div
                className={`relative max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 ${isSender
                    ? "rounded-tr-lg rounded-br-none rounded-bl-lg rounded-tl-lg  mr-1 "
                    : "rounded-tr-lg rounded-br-lg rounded-bl-none rounded-tl-lg ml-1"} shadow-lg ${isSender
                        ? "bg-blue-500 text-white"
                        : "bg-red-200 text-black"
                    }`}
            >
                <p className="text-sm">{message.content}</p>
                <div className="flex justify-end">

                    <span className="text-xs text-gray-400 mt-2 block text-right">
                        {message.timestamp}
                    </span>
                    {icon && (
                        <div className='ml-4 flex flex-col items-end'>
                            {/* {unreadMessage > 0 ? (
                                <span className='bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full'>
                                    {unreadMessage} 
                                </span>
                            ) :
                             ( */}
                            <div className='mt-2'>
                                {renderMessageStatus()}  {/* Show message status icon when no unread messages */}
                            </div>
                            {/* )} */}
                        </div>
                    )}
                </div>

                {/* Extending the corner based on the sender */}
                <div
                    className={`absolute bottom-0 ${isSender ? "left-[100%] mr-1" : "right-[100%] ml-1"}
                            h-0 w-0 border-t-[15px] ${isSender
                            ? "border-r-[14px] border-t-blue-500 border-r-transparent"
                            : "border-l-[14px] border-t-red-200 border-l-transparent"
                        }`}
                    style={{ transform: isSender ? 'rotate(266deg)' : 'rotate(-266deg)' }}
                />
            </div>

            {/* Avatar on the right for sender */}
            {isSender && (
                <div className="flex items-end">
                    <img
                        src={src}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full ml-2"
                    />
                </div>
            )}
        </div>
    );
};

export default Message;
