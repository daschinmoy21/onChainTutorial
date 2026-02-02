# Smart Contract Task

## Objective
Your goal is to build a `StudentRegistry` smart contract that allows a user (student) to register their Name and Roll Number on the blockchain.

## Setup
1. Open this terminal in VS Code.
2. Run `npm install` to get the dependencies.

## Tasks

### 1. Complete `StudentRegistry.sol`
Open `contracts/StudentRegistry.sol`. You will see `TODO` comments.
- **Struct**: Define what a "Student" looks like.
- **Mapping**: Create a way to look up a Student by their Wallet Address.
- **Function**: Implement `register` to save data to that mapping.
- **Event**: Emit an event so the frontend can "listen" for it (Bonus).

### 2. Compile
Run `npx hardhat compile` to check for errors.

### 3. Deploy
Open `scripts/deploy.ts` and fill in the blanks to deploy your contract.
Run `npx hardhat run scripts/deploy.ts --network localhost` (Ask the Host for the Network URL if not running locally).

## Cheatsheet
- **Mapping syntax**: `mapping(KeyType => ValueType) public name;`
- **Msg Sender**: `msg.sender` is the address calling the function.
