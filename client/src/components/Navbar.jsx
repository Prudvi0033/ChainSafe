import React from 'react';
import { SiHiveBlockchain } from "react-icons/si";


const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center p-4">
      <div className="flex items-center ml-10">
      <button className="inline-flex h-12 items-center justify-center px-6 font-medium text-gradient">
        <div className='flex'><SiHiveBlockchain fontSize={30} color='#fff'/>
            <span className='text-2xl ml-1 font-bold'>Chain Safe</span>
          </div>
        </button>
      </div>

      <div className="flex items-center mr-14">
        <button className="bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900 px-4 py-2 rounded-xl border border-neutral-600 text-black bg-white hover:bg-gray-100 transition duration-200 font-light hover:scale-105">
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
