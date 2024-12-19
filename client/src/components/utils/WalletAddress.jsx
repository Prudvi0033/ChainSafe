import React, { useEffect } from 'react'
import {useAccount } from "wagmi"
import useAddressStore from '../store/useAddressStore'

const WalletAddress = () => {

    const { walletAddress, setwalletAddress } = useAddressStore()
    const { address, isConnected } = useAccount();

    useEffect(() => {
        if(isConnected){
            setwalletAddress(address)
        }
    },[address, isConnected, walletAddress, setwalletAddress])

  return (
    <div className='text-transparent text-[0.00001px]'>
        {walletAddress}
    </div>
  )
}

export default WalletAddress