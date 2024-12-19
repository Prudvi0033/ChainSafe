import React, { useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";
import useUserStore from '../store/useUserStore';

const UserComponent = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { userid, setUserid } = useUserStore();

  useEffect(() => {
    if (isLoaded && isSignedIn && user?.id) {
      const newUserid = user.id.slice(5, 10); // Safely extract user ID
      setUserid(newUserid);
      console.log("User ID set to:", newUserid);
    }
  }, [isLoaded, isSignedIn, user, setUserid]);

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>Please sign in to view your user ID.</div>;

  return (
    <div className='text-transparent text-[0.001px]'>
      {userid}
    </div>
  );
};

export default UserComponent;
