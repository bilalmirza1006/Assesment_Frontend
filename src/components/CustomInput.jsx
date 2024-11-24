import React from 'react';

function CustomInput({ type = "text", className = "", placeholder = "Enter text...", icon, ...props }) {
  return (
    <div className='relative  w-full'>
      <input
        type={type}
        className={` border-2 border-gray-400  rounded-md h-10 p-1 w-full ${className}`}
        placeholder={placeholder}
        {...props}
      />
      <div className='absolute inset-y-0 right-3 flex items-center text-gray-500'>
        <span className="text-3xl text-gray-500">
          {icon}
        </span>
      </div>
    </div>
  );
}

export default CustomInput;
