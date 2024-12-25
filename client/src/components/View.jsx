import { Client, Databases } from "appwrite";
import React, { useEffect, useState } from "react";
import DisplayDocs from "../pages/DisplayDocs";
import useUserStore from "./store/useUserStore";

const client = new Client();
client.setProject('67695e4200020f68eb7b');

const databases = new Databases(client);

const View = () => {
  const { userid } = useUserStore();
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDocs = () => {
    if (!userid) {
      setError("User ID is not set. Please ensure you are logged in.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    databases
      .listDocuments(import.meta.env.VITE_APPWRITE_DATABASEID,import.meta.env.VITE_APPWRITE_COLLECTIONID,)
      .then((response) => {
        setDocuments(response.documents.filter(doc => doc.Authority === userid));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch documents.");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <DisplayDocs documents={documents} isLoading={isLoading} />
    </div>
  );
};

export default View;
