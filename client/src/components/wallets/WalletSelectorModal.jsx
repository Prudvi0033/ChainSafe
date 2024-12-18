import { useConnect } from 'wagmi'
import { IoMdCloseCircleOutline } from "react-icons/io";


function WalletSelectorModal({ isOpen, onClose }) {
  const { connectors, connect, status } = useConnect()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 shadow-lg bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
      <div className='white-glassmorphism px-12 py-10 text-center rounded-lg'>
        <div className='flex flex-col gap-6'>
          {connectors.map((connector) => (
            <button 
              key={connector.id}
              onClick={() => {
                connect({ connector })
                onClose()
              }}
              disabled={status === 'pending'}
              className={`px-4 py-2 rounded-md shadow-md ${
                status === 'pending'
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-br from-[#d1d5db] via-[#6b7280] to-[#374151] hover:scale-105 ease-in-out duration-300 cursor-pointer hover:shadow-lg'
              } text-black`}
            >
              {status === 'pending' ? 'Connecting...' : `Connect ${connector.name}`}
            </button>
          ))}
        </div>
        <button 
          onClick={onClose}
          className='text-red-600 mt-4 hover:rotate-[50deg] hover:scale-110 duration-[400ms] ease-out'
        >
          <IoMdCloseCircleOutline fontSize={30} />
        </button>
      </div>
    </div>
  )
}

export default WalletSelectorModal
