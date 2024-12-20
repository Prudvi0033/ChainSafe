import { useState } from 'react'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import WalletConnector from './components/wallets/WalletConnector'
import WalletSelectorModal from './components/wallets/WalletSelectorModal'
import { Navbar, Welcome } from "./components/index"
import WalletAddress from "./components/utils/WalletAddress.jsx"
import User from "./components/utils/User.jsx"

import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()


export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen overflow-y-hidden">
          <div className="gradient-bg-welcome overflow-hidden">
            <Toaster
              position="bottom-center"
              reverseOrder={false}
            />
            <WalletAddress />
            <Navbar />
            <div className='flex flex-col-reverse'>
              <User />
              <Welcome />
            </div>
          </div>
        </div>

        <WalletConnector onOpenModal={() => setIsModalOpen(true)} />
        <WalletSelectorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
