# ChainSafe

## Overview
ChainSafe is a decentralized document storage platform that leverages blockchain technology to ensure secure, immutable, and verifiable document storage. Users can authenticate using Clerk, store document hashes on Ethereum via a smart contract, and manage their records through an intuitive React-based frontend integrated with Appwrite.

## Live Demo
🔗 [ChainSafe Live](https://chain-safe-iota.vercel.app/)

## Tech Stack
- **Frontend**: React
- **Authentication**: Clerk
- **Database**: Appwrite
- **Blockchain**: Ethereum (for document storage)
- **Web3 Integration**: Wagmi library

## Features
- **User Authentication**: Secure sign-in and identity management using Clerk.
- **Decentralized Storage**: Stores document hashes on Ethereum to ensure immutability.
- **Appwrite Integration**: Manages user records and metadata.
- **Smart Contract Verification**: Verifies stored document hashes on-chain.

## Smart Contract
The contract ensures that document hashes are securely stored and verified on the Ethereum blockchain.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileStorageWithUserId {
    event FileStored(string indexed userId, string fileHash, bytes32 compositeHash);

    mapping(bytes32 => bool) private storedHashes;

    function generateCompositeHash(string memory userId, string memory fileHash) internal pure returns (bytes32 compositeHash)
    {
        require(bytes(userId).length > 0, "User ID cannot be empty");
        require(bytes(fileHash).length > 0, "File hash cannot be empty");

        return keccak256(abi.encodePacked(userId, fileHash));
    }

    function storeFile(string memory userId, string memory fileHash) external {
        bytes32 compositeHash = generateCompositeHash(userId, fileHash);
        require(!storedHashes[compositeHash], "This file is already stored");
        storedHashes[compositeHash] = true;
        emit FileStored(userId, fileHash, compositeHash);
    }

    function verifyFile(string memory userId, string memory fileHash) external view returns (bool exists)
    {
        bytes32 compositeHash = generateCompositeHash(userId, fileHash);
        return storedHashes[compositeHash];
    }
}
```

## Getting Started
### Prerequisites
- Node.js installed
- Metamask wallet setup
- Appwrite and Clerk configured

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/chainsafe.git
   cd chainsafe
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure your API keys for Clerk and Appwrite.
4. Start the development server:
   ```sh
   npm run dev
   ```

## Usage
- **Sign in** using Clerk authentication.
- **Upload documents**, which store their hashes on Ethereum.
- **Verify documents** to ensure integrity using blockchain records.

## License
This project is licensed under the MIT License.

