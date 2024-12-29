import React, { useState } from 'react';
import { useReadContract } from 'wagmi';
import toast, { Toaster } from 'react-hot-toast';
import useHashStore from './store/useHashStore';
import FileUpload from '../pages/FileUpload';

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

const Verify = () => {
  const [userIdValue, setUserId] = useState('');
  const { fileHash } = useHashStore();
  const [verificationResult, setVerificationResult] = useState(null);

  const {
    data: verificationData,
    isError,
    isLoading,
    refetch
  } = useReadContract({
    abi: contractAbi,
    address: "0xe0b01c9fb3a51ebe2b9767d4cad052095d2cca99",
    functionName: "verifyFile",
    args: [userIdValue, fileHash],
    enabled: false // Prevents auto-fetching until we explicitly call refetch
  });

  const verifyDocument = async () => {
    // Input validation
    if (!fileHash || !userIdValue) {
      toast.error("Please provide both User ID and File");
      return;
    }

    // Show loading toast
    const loadingToast = toast.loading("Verifying document...");

    try {
      const result = await refetch();
      
      // Clear loading toast
      toast.dismiss(loadingToast);

      if (result.error) {
        throw new Error("Verification failed");
      }

      setVerificationResult(result.data);
      
      if (result.data === true) {
        toast.success("Document verified successfully!");
      } else {
        toast.error("Document verification failed - No matching records found");
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.dismiss(loadingToast);
      toast.error("Verification failed. Please try again.");
    }
  };

  return (
    <div className='flex justify-center items-center gradient-bg-transactions w-full h-screen'>
      <div className='h-[30rem] gap-2 blue-glassmorphism w-full lg:w-[50rem]'>
        <div className='flex flex-col items-center mt-10 gap-3 justify-center ml-4'>
          <div className="w-full max-w-sm min-w-[200px] mb-4">
            <label className="block mb-2 text-sm text-white font-semibold">
              User Id*
            </label>
            <input 
              value={userIdValue}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full bg-transparent placeholder:text-slate-400 text-white font-thin tracking-wider text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
              placeholder="Enter user ID"
            />
          </div>
        </div>
        
        <div className='flex flex-col justify-center gap-8 items-center'>
          <Toaster />
          <FileUpload />
          <button 
            onClick={verifyDocument}
            disabled={isLoading}
            className={`shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Verifying..." : "Verify Document"}
          </button>
        </div>

        {verificationResult !== null && (
          <div className='flex justify-center mt-4'>
            <div className={`text-2xl text-white ${
              verificationResult ? 'text-green-400' : 'text-red-400'
            }`}>
              {verificationResult ? "✓ Verified" : "✗ Not Verified"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;