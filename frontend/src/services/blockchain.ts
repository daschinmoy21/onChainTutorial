import { ethers } from "ethers";

const CONTRACT_ABI = [
  "function register(string memory _name, string memory _rollNumber) public",
  "function getStudent(address _studentAddress) public view returns (string,string)",
  "event StudentRegistered(address indexed studentAddress, string name, string rollNumber)"
];

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Use environment variable for RPC URL, fallback to localhost
const RPC_URL = import.meta.env.VITE_RPC_URL || "http://127.0.0.1:8545";

console.log("🔗 Connecting to RPC:", RPC_URL);

export interface BlockchainTransaction {
  hash: string;
  blockNumber: number;
  timestamp: number;
  name: string;
  rollNumber: string;
  from: string;
}

export interface BlockInfo {
  number: number;
  timestamp: number;
  hash: string;
  transactions: BlockchainTransaction[];
}

class BlockchainService {
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(RPC_URL);
    this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, this.provider);
  }

  async initialize() {
    // This method is kept for compatibility but not needed anymore
  }

  async isConnected() {
    try {
      await this.provider.getBlockNumber();
      console.log("✅ Connected to blockchain");
      return true;
    } catch (error) {
      console.error("❌ Failed to connect to blockchain:", error);
      return false;
    }
  }

  // Check if an account has already registered a student
  async isAccountRegistered(address: string): Promise<boolean> {
    try {
      const result = await this.contract.getStudent(address);
      // If name is not empty, the account is registered
      return result[0] !== "";
    } catch {
      return false;
    }
  }

  // Find the first available (unregistered) account
  async findAvailableAccount() {
    const accounts = await this.provider.listAccounts();
    
    if (accounts.length === 0) {
      throw new Error("No accounts available");
    }

    // Check each account to find one that hasn't registered yet
    for (let i = 0; i < accounts.length; i++) {
      const accountAddress = accounts[i].address;
      const isRegistered = await this.isAccountRegistered(accountAddress);
      
      if (!isRegistered) {
        console.log(`📝 Using account ${i}: ${accountAddress}`);
        return i; // Return the index of the first available account
      }
    }

    // If all accounts are used, throw an error
    throw new Error("All available accounts have already registered students. Please restart the Hardhat node to reset.");
  }

  async submitIdentity(name: string, roll: string) {
    // Find an available account
    const accountIndex = await this.findAvailableAccount();
    
    // Get the signer for this account
    const signer = await this.provider.getSigner(accountIndex);

    // Create contract instance with this specific signer
    const contractWithSigner = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    
    // Submit the transaction
    const tx = await contractWithSigner.register(name, roll);
    const receipt = await tx.wait();
    
    console.log("✅ Transaction confirmed:", receipt.hash);
    
    return { 
      hash: receipt.hash, 
      blockNumber: receipt.blockNumber 
    };
  }

  async getAllIdentities(): Promise<BlockchainTransaction[]> {
    try {
      const filter = this.contract.filters.StudentRegistered();
      const events = await this.contract.queryFilter(filter);
      const list: BlockchainTransaction[] = [];

      for (const e of events) {
        if (!e.blockNumber || !e.transactionHash) continue;
        const block = await this.provider.getBlock(e.blockNumber);
        const tx = await this.provider.getTransaction(e.transactionHash);
        const isEventLog = 'args' in e;

        list.push({
          hash: e.transactionHash,
          blockNumber: e.blockNumber,
          timestamp: block?.timestamp || 0,
          name: isEventLog ? (e.args?.name || "") : "",
          rollNumber: isEventLog ? (e.args?.rollNumber || "") : "",
          from: tx?.from || ""
        });
      }
      return list.sort((a, b) => b.blockNumber - a.blockNumber);
    } catch {
      return [];
    }
  }

  async getBlocks(): Promise<BlockInfo[]> {
    try {
      const current = await this.provider.getBlockNumber();
      const blocks: BlockInfo[] = [];
      const start = Math.max(1, current - 9);

      for (let i = current; i >= start; i--) {
        const block = await this.provider.getBlock(i, true);
        if (!block) continue;
        const txs: BlockchainTransaction[] = [];

        for (const tx of block.transactions) {
          if (typeof tx === "object" && tx !== null && tx.to?.toLowerCase() === CONTRACT_ADDRESS.toLowerCase()) {
            const receipt = await this.provider.getTransactionReceipt(tx.hash);
            if (!receipt) continue;

            const logs = await this.contract.queryFilter(
              this.contract.filters.StudentRegistered(),
              receipt.blockNumber,
              receipt.blockNumber
            );
            const log = logs.find(l => l.transactionHash === tx.hash);
            if (!log) continue;

            const isEventLog = 'args' in log;
            txs.push({
              hash: tx.hash,
              blockNumber: i,
              timestamp: block.timestamp,
              name: isEventLog ? (log.args?.name || "") : "",
              rollNumber: isEventLog ? (log.args?.rollNumber || "") : "",
              from: tx.from
            });
          }
        }

        blocks.push({
          number: i,
          timestamp: block.timestamp,
          hash: block.hash || "",
          transactions: txs
        });
      }
      return blocks;
    } catch {
      return [];
    }
  }
}

export { BlockchainService };
export const blockchainService = new BlockchainService();