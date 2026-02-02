# Frontend Verification Task

## Objective
Build a React component to fetch and display data from the blockchain.

## Requirements

### 1. Connect Wallet
Implement `ConnectWallet.tsx`.
- Should trigger MetaMask popup.
- Should update the `account` state in App.tsx.

### 2. Display ID
Implement `IDCard.tsx`.
- Should automatically fetch data when an account is connected.
- Use `ethers.BrowserProvider` (which wraps `window.ethereum`).
- Call the `getStudent` function on the contract.
- Render the returned Name and Roll Number.

## Resources
- **ABI**: `["function getStudent(address) view returns (string, string)"]`
