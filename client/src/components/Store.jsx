import React, { useState, useEffect } from 'react';
import DisabledIp from '../pages/DisabledIp';
import FileUpload from '../pages/FileUpload';
import useUserStore from './store/useUserStore';
import toast, { Toaster } from 'react-hot-toast';
import useHashStore from './store/useHashStore';
import useAddressStore from './store/useAddressStore';
import { Client, Databases, ID } from "appwrite";
import DisplayDocs from '../pages/DisplayDocs';
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

const client = new Client();
client.setProject('67695e4200020f68eb7b');
client.setEndpoint('https://cloud.appwrite.io/v1')
const databases = new Databases(client);

const contractAbi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "userId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "fileHash",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "compositeHash",
				"type": "bytes32"
			}
		],
		"name": "FileStored",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "userId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "fileHash",
				"type": "string"
			}
		],
		"name": "storeFile",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "userId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "fileHash",
				"type": "string"
			}
		],
		"name": "verifyFile",
		"outputs": [
			{
				"internalType": "bool",
				"name": "exists",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const Store = () => {
  const { fileHash } = useHashStore();
  const { userid } = useUserStore();
  const [fileName, setFileName] = useState(''); 
  const { walletAddress } = useAddressStore();

  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 

  const { writeContract, data: hash, error, isPending, isError } = useWriteContract();

  const { 
    isLoading: isTransactionLoading, 
    isSuccess: isTransactionSuccess,
    isError: isTransactionError,
    error: transactionError 
  } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isError && error) {
      console.error('Contract Error:', error);
      toast.error(`Transaction failed: ${error.message || 'Unknown error'}`);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isTransactionError && transactionError) {
      console.error('Transaction Error:', transactionError);
      toast.error(`Transaction failed: ${transactionError.message || 'Unknown error'}`);
    }

    if (isTransactionSuccess && hash) {
      handleTransactionSuccess(hash);
    }
  }, [isTransactionSuccess, isTransactionError, hash, transactionError]);

  const handleTransactionSuccess = async (transactionHash) => {
    try {
      await createAndStoreDocument(transactionHash);
      toast.success("File stored successfully");
    } catch (error) {
      console.error('Database Error:', error);
      toast.error("File stored on blockchain but database update failed");
    }
  };

  const createAndStoreDocument = async (transactionHash) => {
    setIsLoading(true);
    const newDocument = {
      Document_Name: fileName,
      Authority: userid,
      Issuer_Address: walletAddress,
      Transaction_Hash: transactionHash || null,
    };

    try {
      const response = await databases.createDocument(
        '67695f7700218d76597c',
        '67695f8b0010ccc83277',
        ID.unique(),
        newDocument
      );
      setDocuments((prevDocs) => [...prevDocs, response]);
    } catch (error) {
      console.error('Database Error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleStoreDocument = async () => {
    try {
      if (!fileHash) {
        toast.error("Please select a file first");
        return;
      }

      if (!fileName.trim()) {
        toast.error("Please enter a file name");
        return;
      }

      console.log('Sending transaction with:', {
        fileHash,
        userid,
        walletAddress
      });

      writeContract({
        abi: contractAbi,
        address: '0xe0b01c9fb3a51ebe2b9767d4cad052095d2cca99',
        functionName: 'storeFile',
        args: [userid, fileHash],
      });

      <DisplayDocs documents={documents} isLoading={isLoading} />

    } catch (error) {
      console.error('Submission Error:', error);
      toast.error(`Error initiating transaction: ${error.message || 'Unknown error'}`);
    }
  };

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
              value={fileName}
            />
          </div>
          <DisabledIp label="User Id" placeholder={userid} />
        </div>
        <div className="flex flex-col justify-center gap-8 items-center">
          <Toaster />
          <FileUpload />
          <input type="file" id="fileInput" className="hidden" />
          <button 
            onClick={handleStoreDocument}
            disabled={isTransactionLoading || isPending}
            className={`shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear ${
              (isTransactionLoading || isPending) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isPending ? 'Confirming...' : isTransactionLoading ? 'Storing...' : 'Store Document'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Store;