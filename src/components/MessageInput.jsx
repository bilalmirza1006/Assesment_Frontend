// import React from 'react'
// // import { MdCall } from 'react-icons/md'
// import { MdAttachFile } from "react-icons/md";
// import { FaMicrophone } from "react-icons/fa";


// function MessageInput({sendHandler,setMessageInput,messageInput}) {
//     return (

//         <div className='w-full flex'>

//             <div className='flex items-center relative w-full px-2 py-2 border border-gray-300 rounded-full'>
//                 <input
//                     type="text"
//                     value={messageInput}
//                     placeholder='Type a message...'
//                     className='flex-1 w-full pl-10 pr-10 focus:outline-none'
//                 />

//                 {/* Attach Icon */}
//                 <div className='absolute left-3 flex items-center justify-center w-8 h-8 hover:bg-gray-200 rounded-full'>
//                     <MdAttachFile className='text-2xl rotate-45 text-gray-500' />
//                 </div>

//                 {/* Call Icon */}
//                 <div className='absolute right-3 flex items-center justify-center w-8 h-8 hover:bg-gray-200 rounded-full'>
//                     <FaMicrophone className='text-2xl text-gray-500' />
//                 </div>
//             </div>

//             <button onClick={sendHandler} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
//                 Send
//             </button>
//         </div>

//     )
// }

// export default MessageInput

import React from "react";
import { MdAttachFile } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";

function MessageInput({ sendHandler, setMessageInput, messagesInput }) {
    return (
        <div className="w-full flex">
            <div className="flex items-center relative w-full px-2 py-2 border border-gray-300 rounded-full">
                <input
                    type="text"
                    value={messagesInput} // Input value from the parent state
                    onChange={(e) => setMessageInput(e.target.value)} // Update parent state on input change
                    placeholder="Type a message..."
                    className="flex-1 w-full pl-10 pr-10 focus:outline-none"
                />

                {/* Attach Icon */}
                <div className="absolute left-3 flex items-center justify-center w-8 h-8 hover:bg-gray-200 rounded-full">
                    <MdAttachFile className="text-2xl rotate-45 text-gray-500" />
                </div>

                {/* Microphone Icon */}
                <div className="absolute right-3 flex items-center justify-center w-8 h-8 hover:bg-gray-200 rounded-full">
                    <FaMicrophone className="text-2xl text-gray-500" />
                </div>
            </div>

            <button
                onClick={sendHandler} // Call parent's sendHandler function
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
                Send
            </button>
        </div>
    );
}

export default MessageInput;
