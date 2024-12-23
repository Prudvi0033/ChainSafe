// src/pages/FileUpload.js
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import useHashStore from '../components/store/useHashStore';


const FileUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const { setFileHash } = useHashStore(); 

  const hashFile = (file, algorithm = 'SHA-256') => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async () => {
        try {
          const arrayBuffer = reader.result;

          const hashBuffer = await crypto.subtle.digest(algorithm, arrayBuffer);

          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex = hashArray.map(byte => byte.toString(16).padStart(0, '0')).join('');

          resolve(hashHex);
        } catch (err) {
          reject(err);
        }
      };

      reader.onerror = (error) => reject(error);

      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      try {
        const hash = await hashFile(file);
        setFileHash(hash); 
        console.log("File Hash:", hash);
        toast.success("File Uploaded");
      } catch (error) {
        console.error("Error hashing the file:", error);
        toast.error("File Upload Failed");
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-3/4 max-w-md h-40 border-2 border-dashed rounded-lg cursor-pointer bg-transparent hover:bg-opacity-10 transition-all duration-300 border-gray-300 dark:border-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-3 pb-3">
          <svg
            className="w-6 h-6 mb-2 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
};

export default FileUpload;
