import { Client, Databases, ID } from "appwrite";
import React, { useEffect, useState } from "react";
import DisplayDocs from "../pages/DisplayDocs";

const client = new Client();
client.setProject('67695e4200020f68eb7b');

const databases = new Databases(client);

const View = () => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDocs = () => {
    setIsLoading(true);
    setError(null);  
    databases
      .listDocuments('67695f7700218d76597c', '67695f8b0010ccc83277')
      .then((response) => {
        setDocuments(response.documents);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to fetch documents.');
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <div>
      <h2>Documents in Another Component</h2>
      {error && <p className="text-red-500">{error}</p>}
      <DisplayDocs documents={documents} isLoading={isLoading} />
    </div>
  );
};

export default View;
