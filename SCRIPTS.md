# 🚀 Quick Start Scripts

This directory contains helper scripts to set up and run the BetaLabs Web3 workshop.

## 📝 Available Scripts

### `./setup.sh` - Initial Setup
Installs all dependencies for the project.

```bash
./setup.sh
```

**What it does:**
- Installs contract dependencies (Hardhat, ethers.js)
- Installs web app dependencies (React, Vite)
- Installs registration script dependencies

**Run this first!** All other scripts require dependencies to be installed.

---

### `./start.sh` - Start Workshop
Starts the complete workshop environment.

```bash
./start.sh
```

**What it does:**
1. **Starts Hardhat node** on port 8545
2. **Deploys smart contract** (or reuses existing deployment)
3. **Auto-updates** contract address in all config files
4. **Creates .env file** for registration script
5. **Starts web server** on port 5173
6. **Displays connection info** for local and LAN access
7. **Saves info** to `workshop-info.txt`

**Features:**
- ✅ Automatic contract address extraction
- ✅ Auto-generated `.env` for registration script  
- ✅ Reuse existing deployment option
- ✅ Shows test accounts from Hardhat
- ✅ Creates `workshop-info.txt` for easy reference

**Output:**
- Hardhat logs → `hardhat.log`
- Web server logs → `web.log`
- Connection info → `workshop-info.txt`

**To stop:** Press `Ctrl+C`

---

### `./test.sh` - Run Tests
Validates the project setup.

```bash
./test.sh
```

**What it does:**
1. Compiles smart contracts
2. Starts temporary test network
3. Deploys contract to test network
4. Tests registration script
5. Builds web application

**Use this to:**
- Verify everything is working
- Check for compilation errors
- Test before running the workshop

---

### `./update-address.sh` - Update Contract Address
Manually update the contract address in all configuration files.

```bash
./update-address.sh
```

**When to use:**
- You deployed to a different network
- You want to use a specific contract address
- Contract address changed after restart

**What it updates:**
- `web/src/utils/constants.ts`
- `registration-script/.env`
- `registration-script/.env.example`
- `.workshop-config`

**Validates** the address format before updating.

---

## 🎯 Typical Usage Flow

### First Time Setup
```bash
# 1. Install dependencies
./setup.sh

# 2. Optional: Run tests
./test.sh

# 3. Start the workshop
./start.sh
```

### Subsequent Runs
```bash
# Just run start.sh
./start.sh

# It will ask if you want to reuse the existing deployment
# Press 'y' to skip redeployment
```

### After Manual Deployment
```bash
# If you deployed the contract manually
./update-address.sh
# Enter the new contract address

# Then start only the web server if needed
cd web
npm run dev -- --host 0.0.0.0
```

---

## 📊 Generated Files

After running `./start.sh`, you'll see:

```
.workshop-config           # Stores deployed contract address
workshop-info.txt          # Connection info for participants
hardhat.log               # Hardhat node logs
web.log                   # Web server logs
registration-script/.env  # Auto-generated .env with contract address
```

---

## 🔍 Troubleshooting

### "Dependencies not installed"
```bash
./setup.sh
```

### "Port already in use"
```bash
# Kill existing processes
pkill -f hardhat
pkill -f vite

# Or find and kill manually
lsof -ti:8545 | xargs kill
lsof -ti:5173 | xargs kill
```

### "Contract deployment failed"
Check `hardhat.log` for errors:
```bash
tail -50 hardhat.log
```

### "Web server failed to start"
Check `web.log` for errors:
```bash
tail -50 web.log
```

### Scripts not executable
```bash
chmod +x setup.sh start.sh test.sh update-address.sh
```

---

## 💡 Tips

### View Connection Info
```bash
cat workshop-info.txt
```

### Follow Logs in Real-time
```bash
# In separate terminals
tail -f hardhat.log
tail -f web.log
```

### Test Registration
```bash
cd registration-script
npm start

# Or with Python
python register.py
```

### Check if Services are Running
```bash
# Check Hardhat (should return version info)
curl -X POST http://localhost:8545 \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}'

# Check Web Server (should return HTML)
curl http://localhost:5173
```

---

## 🌐 LAN Access Setup

The web server automatically binds to `0.0.0.0` for LAN access.

**For participants:**

1. Get your machine's IP:
   ```bash
   hostname -I | awk '{print $1}'
   ```

2. Share with participants:
   - Website: `http://YOUR_IP:5173`
   - RPC URL: `http://YOUR_IP:8545`
   - Contract Address: (from `workshop-info.txt`)

3. Participants add network in MetaMask:
   - RPC URL: `http://YOUR_IP:8545`
   - Chain ID: `1337`
   - Symbol: `ETH`

---

## 📚 More Information

See the main [README.md](README.md) for:
- Complete workshop instructions
- MetaMask setup guide
- Participant instructions
- Project architecture
- Learning objectives
