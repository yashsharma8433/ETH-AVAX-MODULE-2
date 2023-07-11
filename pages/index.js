import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [walletBalance, setWalletBalance] = useState(undefined);
  const [isHovered, setIsHovered] = useState(false);
  const [ownerError, setOwnerError] = useState(false);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts && accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set, we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      const atmBalance = (await atm.getBalance()).toNumber();
      setBalance(atmBalance);

      if (account) {
        const provider = new ethers.providers.Web3Provider(ethWallet);
        const wallet = provider.getSigner(account);
        const walletBalance = ethers.utils.formatEther(await wallet.getBalance());
        setWalletBalance(walletBalance);
      }
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait();
      getBalance();
    }
  };

  const multiplyValue = async () => {
    if (atm) {
      try {
        const tx = await atm.multiplyBalance(2); // Replace 2 with your desired multiplier
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const transferOwnership = async (newOwner) => {
    if (atm && newOwner) {
      try {
        let tx = await atm.transferOwnership(newOwner);
        await tx.wait();
        alert(`Ownership transferred to ${newOwner}`);
      } catch (error) {
        setOwnerError(true);
        setTimeout(() => {
          setOwnerError(false);
        }, 5000);
      }
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return (
        <button onClick={connectAccount}>
          Please connect your Metamask wallet
        </button>
      );
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>ATM Balance: {balance} ETH</p>
        {walletBalance && <p>Wallet Balance: {walletBalance} ETH</p>}
        <button onClick={deposit}>DEPOSIT 1 ETH</button>
        <button onClick={withdraw}>WITHDRAW 1 ETH</button>
        <button onClick={multiplyValue}>MULTIPLY BY 2</button>
        <button
          onClick={() => {
            const newOwner = prompt("Enter the new owner address:");
            transferOwnership(newOwner);
          }}
        >
          Transfer 
        </button>
        {ownerError && <p className="error">Error: Failed to transfer ownership</p>}
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main
      className={`container ${isHovered ? "hovered" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <header>
        <h1>Welcome to ATM!</h1>
      </header>
      {initUser()}
      <style jsx>{`
      .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f1f1f1;
    animation: randomBackground 10s infinite;
  }

  .container.hovered {
    background-color: #d1d1d1;
  }

  .message {
    font-size: 20px;
    margin-bottom: 30px;
    color: #333;
  }

  .connect-btn {
    padding: 10px 20px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s;
    outline: none;
  }

  .connect-btn:hover,
  .connect-btn:focus {
    background-color: #2980b9;
    transform: scale(1.05);
  }

  .connect-btn:active {
    transform: scale(0.98);
  }

  .user-section {
    margin-top: 40px;
    transition: background-color 0.5s;
  }

  .user-section.hovered {
    background-color: #f39c12;
  }

  .account {
    font-size: 24px;
    margin-bottom: 10px;
    color: #fff;
  }

  .balance-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .balance {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .balance-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  .action-btn {
    padding: 12px 24px;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s;
    outline: none;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }

  .action-btn.deposit {
    background-color: #27ae60;
  }

  .action-btn.withdraw {
    background-color: #c0392b;
  }

  .action-btn.multiply {
    background-color: #8e44ad;
  }

  .action-btn.transfer {
    background-color: #d35400;
  }

  .action-btn:hover,
  .action-btn:focus {
    opacity: 0.8;
    transform: scale(1.05);
  }

  .action-btn:active {
    transform: scale(0.98);
  }

  @keyframes randomBackground {
    0% {
      background-color: #f1f1f1;
    }
    25% {
      background-color: #2980b9;
    }
    50% {
      background-color: #27ae60;
    }
    75% {
      background-color: #c0392b;
    }
    100% {
      background-color: #8e44ad;
    }
  
}
      `}</style>
      
    </main>
  );
}
