import React from 'react';

const DisplayDocs = ({ documents, isLoading }) => {
  if (isLoading) {
    return <div className="w-full  text-center gradient-bg-transactions text-white text-4xl">Loading document data...</div>;
  }

  if (!documents || documents.length === 0) {
    return <div className="w-full text-center gradient-bg-transactions text-white text-4xl">No document data available</div>;
  }

  return (
    <div className="text-white w-full p-7 flex flex-wrap flex-col shadow-md gradient-bg-transactions">
      <h2 className="font-bold mb-4 text-center text-4xl text-gradient">Document Details</h2>
      {documents.map((document, index) => (
        <div key={index} className="mb-4 break-words p-2 lg:p-4 w-full white-glassmorphism rounded shadow">
          <div className="mb-2">
            <strong>Document Name:</strong>
            <p>{document.Document_Name || 'N/A'}</p>
          </div>
          <div className="mb-2">
            <strong>Authority:</strong>
            <p>{document.Authority || 'N/A'}</p>
          </div>
          <div className="mb-2">
            <strong>Issuer Address:</strong>
            <p>{document.Issuer_Address || 'N/A'}</p>
          </div>
          <div className="mb-2">
            <strong>Transaction Hash:</strong>
            <p>
              {document.Transaction_Hash ? (
                <a
                  href={`https://sepolia.etherscan.io/tx/${document.Transaction_Hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {document.Transaction_Hash}
                </a>
              ) : (
                'N/A'
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayDocs;
