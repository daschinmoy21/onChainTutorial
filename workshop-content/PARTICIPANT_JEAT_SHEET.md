# Participant Cheat Sheet

## Essential Commands
- `npm install`: Install dependencies.
- `npx hardhat compile`: Compile solidity contracts.
- `npx hardhat run scripts/deploy.ts --network localhost`: Deploy contract to the Host's chain.
- `npm run dev`: Start React website.

## Ethers.js Snippets (Web)

**1. Connect to Wallet**
```javascript
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const address = await signer.getAddress();
```

**2. Create Contract Instance (Reading)**
```javascript
const provider = new ethers.BrowserProvider(window.ethereum);
const contract = new ethers.Contract(ADDRESS, ABI, provider);
const data = await contract.someFunction();
```

**3. Create Contract Instance (Writing - Requires Gas)**
```javascript
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner(); // Metamask prompt
const contract = new ethers.Contract(ADDRESS, ABI, signer);
const tx = await contract.register("Alice", "001");
await tx.wait(); // Wait for block
```

## Hardhat/Solidity Snippets

**1. Basic Mappings**
```solidity
mapping(address => Student) public students;
```

**2. Deploy Script**
```typescript
const MyContract = await ethers.getContractFactory("MyContract");
const myContract = await MyContract.deploy();
await myContract.waitForDeployment();
```
