import { create } from "zustand";

const useAddressStore = create((set) => ({
    walletAddress : "",
    setwalletAddress : (addr) => set(() => ({walletAddress : addr}))
}))

export default useAddressStore;