# 🎓 BetaLabs Web3 Workshop - Participant Guide

Welcome to the BetaLabs on-chain workshop! Today you will learn how to interact with a blockchain by registering your details on a smart contract and minting your own student ID card.

## 🚀 workshop Overview

1.  **Connect** your wallet to our local blockchain.
2.  **Write code** (JS/TS or Python) to send a transaction registering your Name and Roll Number.
3.  **View** your generated ID card on the workshop website.

---

## 🛠️ Prerequisites

1.  **MetaMask**: Installed in your browser.
2.  **Code Editor**: VS Code (recommended).
3.  **Node.js** (for JS/TS) OR **Python** installed.

---

## 🔗 Step 1: Connect to the Network

The instructor will provide the **HOST IP**. Replace `HOST_IP` below with that address (e.g., `192.168.1.X`).

1.  Open **MetaMask**.
2.  Click the network dropdown (top-left) -> **Add network** -> **Add a network manually**.
3.  Enter details:
    *   **Network Name**: `BetaLabs Workshop`
    *   **RPC URL**: `http://HOST_IP:8545` (e.g., `http://192.168.1.5:8545`)
    *   **Chain ID**: `1337`
    *   **Currency Symbol**: `ETH`
4.  Click **Save** and switch to the network.

---

## 💰 Step 2: Get Test ETH

You need a wallet with "fake" ETH to pay for gas.

1.  **Import an Account**:
    *   Click the account circle in MetaMask -> **Add account or hardware wallet** -> **Import account**.
    *   Paste the **Private Key** provided by the instructor.
    *   *Note: Use Account #1 or higher if MetaMask blocks Account #0.*

---

## 📝 Step 3: Register Your Details

Choose your preferred language:

### Option A: JavaScript / TypeScript 🟨

1.  Create a new folder and initialized a project:
    ```bash
    mkdir my-registration
    cd my-registration
    npm init -y
    npm install ethers dotenv
    npm install --save-dev typescript ts-node @types/node
    ```

2.  Create a file `index.ts`:

    ```typescript
    import { ethers } from "ethers";

    async function main() {
        // 1. Config
        const RPC_URL = "http://HOST_IP:8545"; // REPLACE HOST_IP
        const PRIVATE_KEY = "YOUR_PRIVATE_KEY"; // REPLACE THIS
        const CONTRACT_ADDRESS = "CONTRACT_ADDRESS_FROM_INSTRUCTOR"; 
        
        // 2. Setup
        const provider = new ethers.JsonRpcProvider(RPC_URL);
        const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
        
        // 3. Contract Interface
        const abi = ["function register(string memory _name, string memory _rollNumber) public"];
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

        // 4. Register
        console.log("Sending transaction...");
        const tx = await contract.register("YOUR NAME", "YOUR ROLL NO");
        await tx.wait();
        console.log("✅ Registered! Hash:", tx.hash);
    }

    main().catch(console.error);
    ```

3.  Run it:
    ```bash
    npx ts-node index.ts
    ```

### Option B: Python 🐍

1.  Install dependencies:
    ```bash
    pip install web3
    ```

2.  Create `register.py`:

    ```python
    from web3 import Web3

    # 1. Config
    RPC_URL = "http://HOST_IP:8545" # REPLACE HOST_IP
    PRIVATE_KEY = "YOUR_PRIVATE_KEY" # REPLACE THIS
    CONTRACT_ADDRESS = "CONTRACT_ADDRESS_FROM_INSTRUCTOR"

    # 2. Setup
    w3 = Web3(Web3.HTTPProvider(RPC_URL))
    account = w3.eth.account.from_key(PRIVATE_KEY)

    # 3. Contract Interface
    abi = [{
        "inputs": [{"name": "_name", "type": "string"}, {"name": "_rollNumber", "type": "string"}],
        "name": "register",
        "type": "function",
        "stateMutability": "nonpayable"
    }]
    contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=abi)

    # 4. Register
    print("Sending transaction...")
    tx = contract.functions.register("YOUR NAME", "YOUR ROLL NO").build_transaction({
        'from': account.address,
        'nonce': w3.eth.get_transaction_count(account.address),
        'gas': 2000000,
        'gasPrice': w3.eth.gas_price
    })
    
    signed_tx = w3.eth.account.sign_transaction(tx, PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    w3.eth.wait_for_transaction_receipt(tx_hash)
    
    print(f"✅ Registered! Hash: {tx_hash.hex()}")
    ```

3.  Run it:
    ```bash
    python register.py
    ```

---

## 💳 Step 4: View Your ID Card

1.  Open your browser to: `http://HOST_IP:5173`
2.  Click **Connect Wallet**.
3.  Admire your blockchain-verified ID card with your unique anime avatar!

---

## ❓ Troubleshooting

*   **"Malicious address" warning?**
    *   MetaMask flags known test keys. It is safe to click "Confirm" for this local workshop.
*   **"Already registered"?**
    *   Each wallet address can only register once. Use a different test account or just view your existing ID.
*   **Connection failed?**
    *   Ensure you are on the same WiFi as the host.
    *   Check that `http://` is included in the RPC URL.
