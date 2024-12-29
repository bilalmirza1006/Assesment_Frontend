import React from 'react'

function VideoAndPhotos({ members }) {
    const visibleMembers = members.slice(0, 4);
    const additionalCount = members?.length > 4 ? members?.length - 4 : 0;


    return (
        // <div className="flex w-full bg-red-400 flex-col space-y-2 pb-4">
        //     <div className="flex justify-between items-center mb-2">
        //         <span className="font-bold text-lg">Photos and video</span>
        //         <a href="#!" className="text-blue-600 text-sm cursor-pointer">See all</a>
        //     </div>
        //     <div className="  flex items-center justify-center flex-wrap">
        //         {visibleMembers.map((member, index) => (
        //             <img
        //                 key={index}
        //                 src={member.avatar}
        //                 alt={`Member ${index + 1}`}
        //                 className={`w-36 h-36 rounded-lg  m-2 relative  object-cover  
        //                     }`}
        //             />
        //         ))}
        //         {additionalCount > 0 && (
        //             <div className="flex justify-center absolute  items-center w-16 h-16 text-black text-sm font-bold ">
        //                 +{additionalCount}
        //             </div>
        //         )}
        //     </div>
        // </div>
        <div className="flex w-full  flex-col space-y-2 pb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-lg">Photos and video</span>
          <a href="#!" className="text-blue-600 text-sm cursor-pointer">See all</a>
        </div>
        <div className="flex items-center justify-center flex-wrap relative">
          {visibleMembers?.map((member, index) => (
            <div key={index} className="relative m-[4px]">
              <img
                src={member.avatar}
                alt={`Member ${index + 1}`}
                className="w-36 h-36 rounded-lg object-cover"
              />
              {/* Show additional count on the 4th image */}
              {index === 3 && additionalCount > 0 && (
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 w-full h-full rounded-lg text-white font-bold text-lg">
                  +{additionalCount}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
    )
}

export default VideoAndPhotos