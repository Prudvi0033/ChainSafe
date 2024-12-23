import React, { useState } from 'react'
import Input from '../pages/Input'
import FileUpload from '../pages/FileUpload'
import { Toaster } from 'react-hot-toast'
import useHashStore from './store/useHashStore'

const Verify = () => {

  const [userIdValue, setUserId] = useState('')
  const { fileHash } = useHashStore()


  return (
    <div className='flex justify-center items-center gradient-bg-transactions w-full h-screen'>
      <div className=' h-[30rem] gap-2 blue-glassmorphism w-full lg:w-[50rem]'>

        <div className='flex flex-col items-center mt-10 gap-3 justify-center ml-4'>
        <div className="w-full max-w-sm min-w-[200px] mb-4">
          <label className="block mb-2 text-sm text-white font-semibold">
            User Id*
          </label>
          <input 
          onChange={(e) => (setUserId(e.target.value))}
          className="w-full bg-transparent placeholder:text-slate-400 text-white font-thin tracking-wider text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="" />
          </div>
        </div>
        <div className='flex flex-col justify-center gap-8 items-center'>
          <Toaster />
          <FileUpload />
          <button className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear">
            Verify Document
          </button>
        </div>

      </div>

    </div>
  )
}

export default Verify