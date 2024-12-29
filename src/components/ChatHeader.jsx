import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { MdCall } from "react-icons/md";
import { BsFillFloppy2Fill } from "react-icons/bs";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";


function ChatHeader({ userName, lastSeen }) {
    return (
        <div className='flex w-full justify-between'>
            <div className='w-full'>
                <div>
                    <p className='text-lg font-semibold text-gray-900'>{userName}</p>
                    <p className='text-sm text-gray-500'>{lastSeen}</p>
                </div>
            </div>
            <div className='flex w-[50%] justify-between items-center'>
                <div>
                    <span>
                        <IoIosSearch className='text-xl text-gray-500' />
                    </span>
                </div>
                <div><span><MdCall className='text-xl text-gray-500' /></span></div>
                <div><span><BsFillFloppy2Fill className='text-xl text-gray-500' /></span></div>
                <div><span><PiDotsThreeOutlineVerticalFill className='text-xl text-gray-500' /></span></div>
            </div>
            {/* <div> iuefgygwew</div> */}
        </div>
    )
}

export default ChatHeader