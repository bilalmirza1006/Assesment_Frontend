import React from 'react'

function Member({ members }) {
//   return (
    // <div>
    //     <div className='flex justify-between pt-6'>
    //         <div>
    //             <p>Members</p>
    //         </div>
    //         <div> 

    //             <button className=''>
    //                 see all
    //             </button>
    //         </div>
    //     </div>
    //     <div></div>
    // </div>
    // return (
    //     <div className="flex flex-col space-y-2">
    //     <div className="flex justify-between items-center mb-2">
    //       <span className="font-bold text-lg">Members</span>
    //       <a href="#!" className="text-blue-600 text-sm cursor-pointer">See all</a>
    //     </div>
    //     <div className="flex items-center">
    //       {members.map((member, index) => (
    //         <img
    //           key={index}
    //           src={member.avatar}
    //           alt={`Member ${index + 1}`}
    //           className={`w-10 h-10 rounded-full object-cover border-2 border-white ${
    //             index !== 0 ? '-ml-3' : ''
    //           }`}
    //         />
    //       ))}
    //       {additionalCount > 0 && (
    //         <div className="flex justify-center items-center w-10 h-10 bg-blue-600 text-white text-sm font-bold rounded-full border-2 border-white -ml-3">
    //           +{additionalCount}
    //         </div>
    //       )}
    //     </div>
    //   </div>
    const visibleMembers = members.slice(0, 5);
    const additionalCount = members.length > 5 ? members.length - 5 : 0;
  
    return (
      <div className="flex flex-col space-y-2 pb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-lg">Members</span>
          <a href="#!" className="text-blue-600 text-sm cursor-pointer">See all</a>
        </div>
        <div className="flex items-center">
          {visibleMembers?.map((member, index) => (
            <img
              key={index}
              src={member.avatar}
              alt={`Member ${index + 1}`}
              className={`w-16 h-16 rounded-full object-cover border-4 border-white ${
                index !== 0 ? '-ml-3' : ''
              }`}
            />
          ))}
          {additionalCount > 0 && (
            <div className="flex justify-center items-center w-16 h-16 bg-blue-600 text-white text-sm font-bold rounded-full border-4 border-white -ml-3">
              +{additionalCount}
            </div>
          )}
        </div>
      </div>
  )
}

export default Member