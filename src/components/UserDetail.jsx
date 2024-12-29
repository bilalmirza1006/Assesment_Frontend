import React from 'react';

function UserDetail({ src, userName, member, description, email, phone }) {
    return (
        <div className='w-full flex flex-col items-center space-y-2 border-b-2 pb-4 border-solid  pl-2 border-gray-300'>
            {/* User Image and Name */}
            <div className='flex w-full flex-col items-center space-y-1'>
                <img
                    src={src}
                    alt="User Avatar"
                    className='w-12 h-12 object-cover rounded-full'
                />
                <p className='text-center w-1/2'>{userName}</p>
                <p className='text-center w-1/2 text-gray-500'>{member}</p>
            </div>

            {/* User Details */}
            <div className='w-full items-center text-center space-y-2'>
                <p className='text-sm text-gray-700'>{description}</p>
                <div className='flex justify-between items-center   text-blue-500  px-4'>
                    <a href={`mailto:${email}`} className='hover:underline text-[16px]'>{email}</a>
                    <a href={`tel:${phone}`} className='hover:underline  text-[16px]'>{phone}</a>
                </div>
            </div>
        </div>
    );
}

export default UserDetail;
