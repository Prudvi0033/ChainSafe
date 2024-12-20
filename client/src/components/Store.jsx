import React from 'react'
import Input from '../pages/Input'
import DisabledIp from '../pages/DisabledIp'
import FileUpload from '../pages/FileUpload'
import useUserStore from "./store/useUserStore"
import { Toaster } from 'react-hot-toast'
import useHashStore from './store/useHashStore'

const Store = () => {

  const { fileHash } = useHashStore()

  const { userid } = useUserStore();

  return (
    <div className='flex justify-center items-center gradient-bg-transactions w-full h-screen'>
      <div className=' grid grid-cols-1 h-[30rem] lg:grid-cols-2 gap-2 blue-glassmorphism w-full lg:h-80 lg:w-[50rem]'>

        <div className='flex flex-col gap-3 justify-center ml-4'>
          <Input label="File Name*" placeholder="File Name" />
          <DisabledIp label="User Id" placeholder={userid} />
        </div>
        <div className='flex flex-col justify-center gap-8 items-center'>
          <Toaster/>
          <FileUpload />
          <button className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear">
            Store Document
          </button>
          {/* {fileHash} */}
        </div>

      </div>

    </div>
  )
}

export default Store