import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
import {useUser} from "@clerk/clerk-react"

const Navbar = () => {
   
  const {isSignedIn} = useUser();

  return (
    <div className="w-full flex justify-between items-center p-4">
      <div className="flex items-center ml-10">
        <button className="inline-flex h-12 items-center justify-center px-6 font-medium text-gradient">
          <div className='flex text-lg lg:text-4xl lg:mt-5'>
            <span className='ml-1 font-bold'>Chain Safe</span>
          </div>
        </button>
      </div>

      <div className="flex justify-center items-center mr-14"> 
        <div className={`${isSignedIn ? 'bg-transparent shadow-lg border rounded-[50%] border-x-gray-300 border-y-zinc-200' : 'bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900'} px-4 py-2 rounded-xl text-black  transition text-center duration-200 font-light hover:scale-105`}>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
