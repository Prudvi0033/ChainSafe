// src/components/Store.js
import React, { useState } from 'react';
import DisabledIp from '../pages/DisabledIp';
import FileUpload from '../pages/FileUpload';
import useUserStore from './store/useUserStore';
import toast, { Toaster } from 'react-hot-toast';
import useHashStore from './store/useHashStore';
import useAddressStore from './store/useAddressStore';
import { Client, Databases, ID } from "appwrite";
import DisplayDocs from '../pages/DisplayDocs';

const client = new Client();
client.setProject(import.meta.env.VITE_APPWRITE_PROJECTID);

const databases = new Databases(client);

const Store = () => {
  const { fileHash } = useHashStore();
  const { userid } = useUserStore();
  const [fileName, setFileName] = useState(''); 
  const { walletAddress } = useAddressStore();

  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const createAndStoreDocument = () => {
    setIsLoading(true);
    const newDocument = {
      Document_Name: fileName,
      Authority: userid,
      Issuer_Address: walletAddress,
      Transaction_Hash: "0",
    };

    databases
      .createDocument(
        import.meta.env.VITE_APPWRITE_DATABASEID,
        import.meta.env.VITE_APPWRITE_COLLECTIONID,
        ID.unique(),
        newDocument
      )
      .then((response) => {
        setDocuments((prevDocs) => [...prevDocs, response]); 
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };




  const handleStoreDocument = () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0]; 
    try {
      if (file) {
        addFile(file); 
      }
      toast.success("File Stored Succesfully");
    } catch (error) {
      toast.error("Error in Stroing the File")
    }
  };

  const renderDocs = () => {
    return <DisplayDocs documents={documents} isLoading={isLoading} />

  }

  return (
    <div className="flex justify-center items-center gradient-bg-transactions w-full h-screen">
      <div className="grid grid-cols-1 h-[30rem] lg:grid-cols-2 gap-2 blue-glassmorphism w-full lg:h-80 lg:w-[50rem]">
        <div className="flex flex-col gap-3 justify-center ml-4">
          <div className="w-full max-w-sm min-w-[200px] mb-4">
            <label className="block mb-2 text-sm text-white font-semibold">
              File Name
            </label>
            <input
              onChange={(e) => { setFileName(e.target.value); }}
              className="w-full bg-transparent placeholder:text-slate-400 text-white font-thin tracking-wider text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="File Name"
            />
          </div>
          <DisabledIp label="User Id" placeholder={userid} />
        </div>
        <div className="flex flex-col justify-center gap-8 items-center">
          <Toaster />
          <FileUpload/>
          <input type="file" id="fileInput" className="hidden" />
          <button 
            onClick={() =>{handleStoreDocument(); createAndStoreDocument();}}
            className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear"
          >
            Store Document
          </button>
        </div>
      </div>
    </div>
  );
};

export default Store;
