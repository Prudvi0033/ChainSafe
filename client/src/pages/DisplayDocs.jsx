import React from 'react';

const DisplayDocs = ({ documents, isLoading }) => {
  if (isLoading) {
    return <div className="p-4">Loading document data...</div>;
  }

  if (!documents || documents.length === 0) {
    return <div className="p-4">No document data available</div>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded shadow-md">
      <h2 className="text-lg font-bold mb-2">Document Details</h2>
      {documents.map((document, index) => (
        <div key={index} className="mb-4 p-4 bg-white rounded shadow">
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
                  href={`https://etherscan.io/tx/${document.Transaction_Hash}`}
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
