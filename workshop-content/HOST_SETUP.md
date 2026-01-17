# Host Setup Guide

## Pre-Workshop Setup
1.  **Dependencies**: Ensure `node` (v18+) is installed on your laptop.
2.  **Install Packages**:
    ```bash
    cd contracts && npm install
    cd ../web && npm install
    ```
3.  **Network Setup**:
    - Connect to the Local Network (e.g., Mobile Hotspot).
    - Find your local IP Address:
        - Linux/Mac: `ip addr` or `ifconfig` (look for `192.168.x.x`).
        - Windows: `ipconfig`.
    - Note this IP down (e.g., `192.168.1.5`).

## Content Distribution (Important!)
Since students will be on their own laptops, you need to share the "Starter Code" with them.
**Option 1: Git (Recommended)**
- Push this repo to GitHub.
- Ask students to clone it: `git clone <URL>`.
- They work in `registration-script/` and `web/`.

**Option 2: No-Git (Zip)**
- Zip the `registration-script/` and `web/` folders.
- Share the zip file via USB or a link (Google Drive/Discord).

## During Workshop (Running the Chain)
1.  **Start the Node**:
    ```bash
    cd contracts
    npx hardhat node --hostname 0.0.0.0
    ```
    *This starts the blockchain on port 8545 accessible by everyone on the network.*

2.  **Share Info**:
    - Tell students your IP Address.
    - RPC URL for them: `http://<YOUR_IP>:8545`.
    - Chain ID: `1337` (default Hardhat) or `31337`.

3.  **Deployment (After specific task is done)**:
    - You (or the students) will deploy the contract.
    - Run: `npx hardhat run scripts/deploy.ts --network localhost`
    - **CRITICAL**: You must share two things with the students after deployment:
        1.  **The Contract Address**: (e.g., `0x5FbDB2315...`)
        2.  **The ABI**: They need the ABI array to interact with the contract. You can copy it from `contracts/artifacts/contracts/StudentRegistry.sol/StudentRegistry.json` (look for the "abi" key) and paste it into a Discord channel or shared doc.

## Troubleshooting
- **Connection Refused**: Ensure Firewall allows port 8545.
- **MetaMask Issues**:
    - Add Network manually > Name: "Workshop Chain", RPC: `http://<YOUR_IP>:8545`, Chain ID: `1337`, Coin: `ETH`.
    - If "Nonce too high" error: MetaMask > Settings > Advanced > Clear Activity Tab Data.
