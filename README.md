# METACRAFTERS-ETH-AVAX-MODULE-2
In this project, React and Ethereum blockchain technologies are used to create a basic ATM (Automated Teller Machine). Users can connect their MetaMask wallets to the project, examine their account balance, deposit and receive money, multiply the amount by 2, and transfer ownership of the ATM contract, among other features.

# Highlights
1. Connect Metamask Wallet to the ATM
2. View Account Balance
3. Deposit and Withdraw funds
4. Multiply the value by 2
5. Transfer Ownership of the ATM Contract

# Prerequisites
1. Node.js
2. Metamask wallet extension installed in your browser

# Implementation
1. Clone the repository:
   
bash
git clone <https://github.com/yashsharma8433/ETH-AVAX-MODULE-2.git>


2. Install the dependencies ( IF THE DEPENDENCIES DOES NOT INSTALL CORRECTLY THEN USE --force ):

bash
npm i


3. Open two additional terminals in your VS code.
4. In the second terminal type: npx hardhat node.
5. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js.
6. Back in the first terminal, type npm run dev to launch the front-end.
7. Open the application in your browser, the project will be running on your localhost. Typically at:

bash
http://localhost:3000


8. Connect your MetaMask wallet and interact with the ATM interface.

# Technologies Used

- React - JavaScript library for building user interfaces
- Ethereum - Blockchain network for decentralized applications
- MetaMask - Wallet and gateway to Ethereum blockchain
- ethers.js - Library for interacting with Ethereum smart contracts

# Structure of the Project

- `src/` - Contains the application source code
- `components/` - Contains reusable React components
- `artifacts/` - Contains the contract ABI and artifacts
- `pages/` - Contains the main application pages
- `App.js` - Main application component
- `index.js` - Entry point of the application
- `contracts/` - Contains the Solidity smart contract code
