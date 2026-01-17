# Blockchain Instructions

## Running the Local Blockchain

From the `blockchain` directory, install dependencies:

```bash
npm install
```

Start the local blockchain node:

```bash
npx hardhat node
```

This starts a local Ethereum blockchain at:

```
http://127.0.0.1:8545
```

Keep this terminal running while deploying contracts or using the frontend.

---

## 🧩 Compiling the Smart Contracts

In a new terminal, from the `blockchain` directory, run:

```bash
npx hardhat compile
```

This compiles all Solidity contracts and prepares them for deployment.

---

## 📦 Deploying the Smart Contract

After compilation, deploy the example contract to the local blockchain:

```bash
npx hardhat run scripts/deployExample.ts --network localhost
```

On successful deployment, the terminal will display the deployed contract address.

---

## 🎯 Blockchain Goal

The blockchain acts as a **local, append-only ledger**.

It records data as **real blockchain transactions** and stores them permanently within blocks.

Each interaction with the contract results in:

* A blockchain transaction
* Inclusion in a mined block
* A unique transaction hash and block number

---

## 📜 Smart Contract Responsibility

The example smart contract serves as a **boilerplate** and is responsible for:

* Accepting simple input data
* Storing the data on-chain
* Allowing read access to the stored value

This contract is intended as a starting point and can be extended further.

---

## 👀 What to Observe While Running

While the blockchain node is running, observe:

* Blocks being mined in the terminal
* Transactions appearing when the contract is deployed or interacted with
* Block numbers increasing over time
* Transaction hashes generated for each write

These outputs represent **real blockchain behavior**, running locally.

---

## ✅ Completion Criteria

The blockchain setup is considered complete when:

* The local blockchain node starts successfully
* Smart contracts compile without errors
* The contract deploys to the local network
* The frontend can interact with the deployed contract
