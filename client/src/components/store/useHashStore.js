import {create} from 'zustand';

const useHashStore = create((set) => ({
  fileHash: '', 
  setFileHash: (hash) => set({ fileHash: hash }), 
}));

export default useHashStore;
