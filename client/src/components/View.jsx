import { Client, Databases, ID } from "appwrite";
import React, {useEffect, useState} from "react";
import DisplayDocs from "../pages/DisplayDocs";

const client = new Client();
client.setProject('67695e4200020f68eb7b');

const databases = new Databases(client);

const View = () => {

  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDocs = () => {
    setIsLoading(true)
    databases
    .listDocuments('67695f7700218d76597c', '67695f8b0010ccc83277')
    .then((response) => {
      setDocuments(response.documents)
      setIsLoading(false)
    })
    .catch((error) => {
      console.error(error);
      setIsLoading(false);
    });
  }

  useEffect(()=>{
    fetchDocs()
  },[])

  return (
    <div>
      <h2>Documents in Another Component</h2>
      <DisplayDocs documents={documents} isLoading={isLoading} />
    </div>
  )
}

export default View;
