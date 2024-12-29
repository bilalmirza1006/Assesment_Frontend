import React from 'react'

function SideBarSubMenu({icon,title}) {
  return (
    <div className='flex flex-col p-2 items-center border-b-2 '>
        <div className='text-[26px] text-gray-400'>{icon}</div>
        <div> <text className='text-gray-400'>{title}</text></div>
    </div>
  )
}

export default SideBarSubMenu