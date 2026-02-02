# 🎓 BetaLabs Web3 - Blockchain Workshop

A hands-on blockchain workshop project where participants register their name and roll number on-chain and view their personalized ID card with an anime avatar!

## 🌟 Features

- ⛓️ **Smart Contract** - StudentRegistry contract for storing student data on the blockchain
- 🎨 **Anime Avatars** - Unique anime-style profile pictures generated from wallet addresses
- 💳 **Beautiful ID Cards** - Modern, gradient ID cards with BetaLabs Web3 branding
- 🔐 **MetaMask Integration** - Easy wallet connection
- 📝 **Multiple Registration Methods** - Choose JavaScript/TypeScript or Python
- 🌐 **LAN Support** - Workshop can run without internet

## 🏗️ Project Structure

```
onChainTutorial/
├── contracts/              # Hardhat smart contract development
│   ├── contracts/
│   │   └── StudentRegistry.sol
│   ├── scripts/
│   │   └── deploy.ts
│   └── package.json
│
├── web/                    # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ConnectWallet.tsx
│   │   │   ├── IDCard.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── utils/
│   │   │   └── constants.ts
│   │   ├── App.tsx
│   │   └── App.css
│   └── package.json
│
├── registration-script/    # Student registration scripts
│   ├── index.ts           # JavaScript/TypeScript version
│   ├── register.py        # Python version
│   ├── requirements.txt   # Python dependencies
│   ├── .env.example      # Environment template
│   └── package.json
│
└── flake.nix              # Nix development environment
```

## 🚀 Quick Start Guide

### For Workshop Organizers (Host Setup)

#### 1. Prerequisites

**Option A: Using Nix (Recommended)**
```bash
# Enter Nix development environment
nix develop
```

**Option B: Manual Setup**
- Node.js 20+ (for contracts and web)
- Python 3.10+ (optional, for Python script)
- MetaMask browser extension

#### 2. Install Dependencies

```bash
# Install contract dependencies
cd contracts
npm install

# Install web dependencies
cd ../web
npm install

# Install registration script dependencies (TypeScript)
cd ../registration-script
npm install

# Or for Python (optional)
pip install -r requirements.txt
```

#### 3. Start Hardhat Local Blockchain

```bash
cd contracts
npm run node
```

This starts a blockchain node on `http://0.0.0.0:8545` (accessible on LAN).

**Important**: Note down:
- Your local IP address (e.g., `192.168.1.100`)
- Hardhat will show 20 test accounts with private keys

#### 4. Deploy the Smart Contract

In a new terminal:

```bash
cd contracts
npx hardhat run scripts/deploy.ts --network localhost
```

**Save the deployed contract address!** You'll need to share this with participants.

#### 5. Update Contract Address

Edit `web/src/utils/constants.ts` and `registration-script/.env.example` with the deployed contract address.

#### 6. Start the Web Application

```bash
cd web
npm run dev
```

The web app will be available at `http://localhost:5173`.

For LAN access, you may need to run:
```bash
npm run dev -- --host 0.0.0.0
```

Then participants can access it at `http://YOUR_IP:5173` (e.g., `http://192.168.1.100:5173`).

---

### For Participants

#### Prerequisites
- MetaMask browser extension installed
- A code editor (VS Code recommended)
- Node.js or Python (depending on script choice)

#### Step 1: Get Workshop Info from Host

You'll need:
1. **RPC URL**: The host's IP + port (e.g., `http://192.168.1.100:8545`)
2. **Contract Address**: The deployed StudentRegistry address
3. **Private Key**: One of the test account private keys from Hardhat
4. **Website URL**: Where to view your ID card (e.g., `http://192.168.1.100:5173`)

#### Step 2: Configure MetaMask

1. Open MetaMask
2. Add a new network:
   - Network Name: `Workshop Network`
   - RPC URL: `http://HOST_IP:8545`
   - Chain ID: `1337`
   - Currency Symbol: `ETH`
3. Import a test account using the private key provided

#### Step 3: Choose Your Registration Method

**Option A: TypeScript/JavaScript Script**

1. Create a folder and navigate to it
2. Copy the registration script files
3. Create a `.env` file:

```env
RPC_URL=http://HOST_IP:8545
PRIVATE_KEY=YOUR_PRIVATE_KEY_HERE
CONTRACT_ADDRESS=DEPLOYED_CONTRACT_ADDRESS
STUDENT_NAME=Your Name
STUDENT_ROLL=Your Roll Number
```

4. Install dependencies:
```bash
npm install ethers dotenv
```

5. Run the script:
```bash
npx ts-node index.ts
# or
node index.ts
```

**Option B: Python Script**

1. Copy `register.py` and `requirements.txt`
2. Create a `.env` file (same as above)
3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the script:
```bash
python register.py
```

#### Step 4: View Your ID Card

1. Open the website URL in your browser
2. Click "Connect Wallet"
3. Approve MetaMask connection
4. Your ID card will appear with:
   - Your unique anime avatar
   - Your name and roll number
   - Your wallet address
   - BetaLabs Web3 branding

## 🎨 ID Card Features

- **Anime Avatar**: Uniquely generated from your wallet address
- **Gradient Design**: Beautiful purple gradient background
- **BetaLabs Branding**: "BetaLabs Web3" prominently displayed
- **Blockchain Verified**: Shows verification badge
- **Hover Effects**: Interactive animations

## 🔧 Technical Details

### Smart Contract (StudentRegistry.sol)

```solidity
- register(name, rollNumber) - Register student data
- getStudent(address) - Retrieve student data  
- Event: Student Registered - Emitted on successful registration
```

### Network Configuration

- **Chain ID**: 1337 (Hardhat default)
- **RPC Endpoint**: `http://0.0.0.0:8545`
- **Block Time**: Instant (auto-mining)

### Tech Stack

- **Smart Contracts**: Solidity 0.8.24
- **Development**: Hardhat
- **Frontend**: React + Vite + TypeScript
- **Web3 Library**: ethers.js v6
- **Styling**: Modern CSS with gradients
- **Avatar Generation**: DiceBear API

## 📝 Workshop Flow

1. **Introduction** (10 min) - Explain blockchain & smart contracts
2. **Setup** (15 min) - Students configure MetaMask & get test accounts
3. **Task 1** (20 min) - Write registration script
   - Learn about: Providers, Signers, Transactions
4. **Task 2** (15 min) - View ID card on website
   - Learn about: Reading from blockchain, MetaMask integration
5. **Showcase** (10 min) - Everyone shows their ID cards!

## 🐛 Troubleshooting

### "Failed to connect to blockchain"
- Check firewall settings
- Ensure Hardhat node is running
- Verify RPC URL is correct

### "Transaction failed"
- Ensure you have enough test ETH
- Check if you're already registered
- Verify contract address is correct

### "MetaMask not detecting network"
- Double-check Chain ID (should be 1337)
- Make sure RPC URL includes `http://`
- Try resetting MetaMask

### "ID Card not showing"
- Ensure you've registered first
- Check browser console for errors
- Try refreshing the page

## 📚 Learning Outcomes

By completing this workshop, participants will learn:

- ✅ How to connect to a blockchain network
- ✅ Understanding wallets and private keys
- ✅ Sending transactions to smart contracts
- ✅ Reading data from the blockchain
- ✅ Integrating Web3 with frontend applications
- ✅ Using MetaMask for authentication

## 🎯 Next Steps

After the workshop, students can:

- Deploy to real testnets (Sepolia, Mumbai)
- Add more features to the smart contract
- Create their own DApps
- Explore other Web3 technologies

## 📄 License

MIT License - Feel free to use this for educational purposes!

## 🙏 Credits

Created for blockchain education workshops by BetaLabs.

--- 

**Happy Learning! 🚀**
