import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <div className='flex justify-between px-10 items-center h-[100px]'>
      <div>
        <h1 className='text-[36px] font-[700]'>Dashboard</h1>
        <p className='opacity-30'>Your Personal Dashboard</p>
      </div>

      <div className="items-center bg-[#242e24] w-[40%] rounded-2xl p-2">
      <FontAwesomeIcon icon={faSearch} className="text-gray-500 text-[20px] pl-1 mr-2" />
      <input
        type="text"
        placeholder="Search..."
        className="outline-none"/>
      </div>
    </div>
  )
}

export default Navbar
