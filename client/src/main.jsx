import ReactDOM from 'react-dom/client';
import './index.css';
import React from 'react';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Store from './components/Store.jsx';
import View from './components/View.jsx';
import Verify from './components/Verify.jsx';
import { ClerkProvider } from '@clerk/clerk-react';

import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { injected, metaMask } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [metaMask()], 
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  autoConnect: true, 
});

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  console.error('Clerk publishable key is missing. Please set VITE_CLERK_PUBLISHABLE_KEY in your .env file.');
  throw new Error('Missing Clerk publishable key.');
}

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/store', element: <Store /> },
  { path: '/view', element: <View /> },
  { path: '/verify', element: <Verify /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={publishableKey} afterSignOutUrl="/">
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </WagmiProvider>
    </ClerkProvider>
  </React.StrictMode>
);
