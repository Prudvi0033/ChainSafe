import { useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import toast from 'react-hot-toast';
import metamaskLogo from './metamask.svg';
import { X } from 'lucide-react'

function WalletConnector() {
    const { isConnected } = useAccount();
    const { connect, connectors } = useConnect();
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (isConnected) return null;

    // Filter out Brave Wallet
    const availableConnectors = connectors.filter(connector => connector.id !== 'brave');

    if (availableConnectors.length === 0) {
        toast.error('No wallets found. Please install MetaMask or another wallet.');
        return null;
    }

    return (
        <div className="z-0 absolute w-full" style={{ top: '18rem', left: '0px' }}>
            {/* Connect Wallet Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600 bg-zinc-500 flex px-4 py-2.5 font-semibold rounded-lg items-center hover:scale-105 duration-300 ease-in-out 
               w-full lg:w-[34rem] lg:ml-[5rem] lg:mt-16 mx-auto"
            >
                <img className="h-6 mr-3" src={metamaskLogo} alt="Metamask Logo" />
                Connect Wallet
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600 bg-zinc-500 p-6 rounded-lg shadow-lg w-full lg:w-[34rem]">
                        <div className='flex justify-between items-center mb-4'>
                        <h2 className="text-xl font-semibold">Select a Wallet</h2>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="text-black hover:scale-110 duration-300 ease-in-out"
                        >
                            <X />
                        </button>
                        </div>

                        {availableConnectors.map((connector) => (
                            <button
                                key={connector.id}
                                onClick={() => {
                                    connect({ connector });
                                    setIsModalOpen(false); // Close modal after selection
                                }}
                                className="w-full bg-gray-300 hover:bg-gray-400 px-4 py-2.5 rounded-lg font-semibold mb-2 flex items-center justify-center"
                            >
                                {connector.name}
                            </button>
                        ))}

                    </div>
                </div>
            )}
        </div>
    );
}

export default WalletConnector;
