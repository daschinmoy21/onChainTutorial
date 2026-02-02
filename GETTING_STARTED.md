# 🎓 BetaLabs Web3 Workshop - Getting Started

Welcome! This guide will get you up and running in minutes.

## ⚡ Super Quick Start

```bash
# 1. Install everything
./setup.sh

# 2. Start the workshop
./start.sh

# 3. Open http://localhost:5173 in your browser
```

That's it! 🎉

---

## 📚 What You Get

After running the scripts, you'll have:

```
🌐 Website running at http://localhost:5173
⛓️  Blockchain running at http://localhost:8545
📜 Smart Contract deployed
💳 Beautiful ID cards with anime avatars
```

---

## 🎯 For Workshop Participants

### What You'll Do

1. **Connect MetaMask** to the workshop blockchain
2. **Write a script** (JavaScript or Python) to register your name
3. **View your ID card** on the website with your unique anime avatar!

### Setup MetaMask

Add the workshop network:
- **Network Name**: Workshop  
- **RPC URL**: `http://HOST_IP:8545` (get from instructor)
- **Chain ID**: `1337`
- **Symbol**: `ETH`

Import a test account (get private key from instructor).

### Register Yourself

**Option 1: JavaScript/TypeScript**
```bash
cd registration-script
npm start
```

**Option 2: Python**
```bash
cd registration-script
pip install -r requirements.txt
python register.py
```

### View Your ID Card

1. Go to the website URL (get from instructor)
2. Click "Connect Wallet"
3. See your beautiful ID card! 🎨

---

## 🔧 For Workshop Organizers

### Pre-Workshop Setup

```bash
# 1. Clone/setup the repo
cd onChainTutorial

# 2. Install dependencies (one-time)
./setup.sh

# 3. Start everything
./start.sh
```

The `start.sh` script will:
- ✅ Start Hardhat blockchain
- ✅ Deploy the smart contract
- ✅ Auto-configure everything
- ✅ Start the web server
- ✅ Show connection info

### Share With Participants

After running `./start.sh`, share:

1. **Network Info** (for MetaMask):
   - RPC URL: `http://YOUR_IP:8545`
   - Chain ID: `1337`

2. **Website**: `http://YOUR_IP:5173`

3. **Contract Address**: (shown in terminal output)

4. **Test Private Keys**: (from Hardhat output, see `hardhat.log`)

All this info is saved in `workshop-info.txt` for easy reference!

### During the Workshop

```bash
# View logs
tail -f hardhat.log    # Blockchain logs
tail -f web.log        # Web server logs

# Check connection info anytime
cat workshop-info.txt

# Test the registration script
cd registration-script
npm start
```

### After Workshop / Next Session

```bash
./start.sh
# Press 'y' when asked to reuse existing deployment
```

This skips redeployment and uses the same contract address.

---

## 📁 Project Structure

```
onChainTutorial/
│
├── 🔧 Scripts (you run these)
│   ├── setup.sh          → Install dependencies
│   ├── start.sh          → Start everything
│   ├── test.sh           → Run tests
│   └── update-address.sh → Update contract address
│
├── 📜 Smart Contract
│   └── contracts/
│       ├── contracts/StudentRegistry.sol  → The contract
│       └── scripts/deploy.ts              → Deployment script
│
├── 🌐 Web Application
│   └── web/
│       ├── src/
│       │   ├── components/
│       │   │   ├── ConnectWallet.tsx  → Wallet connection
│       │   │   ├── RegisterForm.tsx   → Registration form
│       │   │   └── IDCard.tsx         → ID card display ⭐
│       │   └── utils/constants.ts     → Contract config
│       └── src/App.css                → Beautiful styling
│
└── 📝 Registration Script
    └── registration-script/
        ├── index.ts        → TypeScript version
        ├── register.py     → Python version
        └── .env.example    → Config template
```

---

## 🎨 Features

### ID Card Design
- 🎭 **Unique Anime Avatar** - Generated from wallet address
- 💜 **Purple Gradient** - Modern, professional look
- 🏷️ **BetaLabs Web3 Branding** - Prominent display
- ✨ **Hover Effects** - Smooth animations
- ⛓️ **Blockchain Verified** - Shows verification badge

### Smart Contract
- ✅ Store student name and roll number
- ✅ One registration per wallet address
- ✅ Validation to prevent empty data
- ✅ Event emission for tracking

### Registration Scripts
- ✅ Both JavaScript and Python versions
- ✅ Environment variable configuration
- ✅ Beautiful CLI output with emojis
- ✅ Error handling and validation
- ✅ Transaction confirmation

---

## 🆘 Common Issues

### "Dependencies not installed"
Run `./setup.sh` first!

### "Port already in use"
```bash
# Kill existing processes
pkill -f hardhat
pkill -f vite
```

### "Scripts not executable"
```bash
chmod +x *.sh
```

### "Contract deployment failed"
Check the logs:
```bash
cat hardhat.log
```

### Can't connect from other devices
Make sure:
1. Firewall allows ports 8545 and 5173
2. You're using your LAN IP (not localhost)
3. All devices are on the same network

---

## 📖 Documentation

- **[README.md](README.md)** - Complete project documentation
- **[SCRIPTS.md](SCRIPTS.md)** - Detailed script documentation
- **[walkthrough.md](.gemini/...)** - Development walkthrough

---

## 🎓 Learning Path

For participants to understand Web3:

1. **Blockchain Basics**
   - What is a blockchain?
   - What are smart contracts?
   - How do transactions work?

2. **Hands-On Practice**
   - Configure MetaMask ✓
   - Write registration script ✓
   - Send transaction to blockchain ✓
   - Read data from blockchain ✓

3. **See the Result**
   - View ID card with data from blockchain ✓
   - Understand how DApps work ✓

---

## 🚀 Next Steps

After completing the workshop:

- **Deploy to a testnet** (Sepolia, Mumbai)
- **Add more features** (profile pictures, badges)
- **Create your own DApp**
- **Explore other Web3 technologies** (IPFS, The Graph)

---

## 💡 Tips

### Quick Commands

```bash
# Start everything
./start.sh

# View all connection info
cat workshop-info.txt

# Test registration
cd registration-script && npm start

# Update contract address manually
./update-address.sh

# Stop everything
# Just press Ctrl+C in the terminal running start.sh
```

### Best Practices

- **Keep start.sh running** in a dedicated terminal
- **Use workshop-info.txt** to share info with participants
- **Test the full flow** before the workshop
- **Have backup private keys** ready for participants

---

## 🎉 Ready to Go!

Run this now:

```bash
./setup.sh && ./start.sh
```

Then open http://localhost:5173 and connect your MetaMask!

---

**Built with ❤️ for blockchain education**

*Questions? Check the docs in README.md and SCRIPTS.md*
