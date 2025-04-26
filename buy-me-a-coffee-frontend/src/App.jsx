import React, { useState } from "react";
import { ethers } from "ethers";
import abi from "./contract/BuyMeACoffee.json";
import "./App.css";

const contractAddress = "0x432ADf92958B44923B197C870356b07dcDC1a896"; 

function App() {
  const [contract, setContract] = useState(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("Please install MetaMask!");
      return;
    }

    try {
      const ethProvider = new ethers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = ethProvider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, abi.abi, signer);
      setContract(contractInstance);
      console.log("Wallet connected!");
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  const buyCoffee = async () => {
    if (!contract) return alert("Connect your wallet first");

    try {
      const txn = await contract.buyCoffee(
        name || "anon",
        message || "Enjoy your coffee!",
        { value: ethers.parseEther("0.001") }
      );
      await txn.wait();
      alert("Coffee bought successfully!");
      setName("");
      setMessage("");
    } catch (err) {
      console.error("Transaction failed:", err);
    }
  };

  return (
    <div className="App">
      <h1>Buy Me A Coffee ☕</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      
      <div className="form">
        <input
          type="text"
          placeholder="Your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Leave a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={buyCoffee}>Send 0.001 ETH</button>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <p>Made by <strong>MSC</strong></p>
        <div className="social-links">
          <a href="https://github.com/MARKASCHARAN" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/marka-charan-0a4a9727a/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://x.com/charan_mar68075" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
