import { create } from 'zustand';

const useUserStore = create((set) => ({
    userid: '',
    setUserid: (id) => {
      set({ userid: id });
    },
  }));

export default useUserStore;
