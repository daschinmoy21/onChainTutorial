import { ethers } from 'ethers';

// Contract ABI - Interface definition for our ExampleContract
const CONTRACT_ABI = [
  "function setValue(string calldata _value) external",
  "function getValue() external view returns (string memory)",
  "event ValueUpdated(string newValue)"
];

// Default contract address (will be updated when we deploy)
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Local blockchain URL
const RPC_URL = "http://127.0.0.1:8545";

export interface BlockchainTransaction {
  hash: string;
  blockNumber: number;
  timestamp: number;
  value: string;
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
  private signer: ethers.JsonRpcSigner | null = null;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(RPC_URL);
    this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, this.provider);
  }

  // Initialize connection and get signer
  async initialize(): Promise<void> {
    try {
      // Get the first account from local blockchain
      const accounts = await this.provider.listAccounts();
      if (accounts.length > 0) {
        this.signer = await this.provider.getSigner(0);
        this.contract = this.contract.connect(this.signer);
      }
    } catch (error) {
      console.error('Failed to initialize blockchain connection:', error);
      throw error;
    }
  }

  // Check if connected to blockchain
  async isConnected(): Promise<boolean> {
    try {
      await this.provider.getBlockNumber();
      return true;
    } catch (error) {
      return false;
    }
  }

  // Submit identity to blockchain
  async submitIdentity(name: string): Promise<{ hash: string; blockNumber: number }> {
    if (!this.signer) {
      await this.initialize();
    }

    try {
      const tx = await this.contract.setValue(name);
      const receipt = await tx.wait();
      
      return {
        hash: receipt.hash,
        blockNumber: receipt.blockNumber
      };
    } catch (error) {
      console.error('Failed to submit identity:', error);
      throw error;
    }
  }

  // Get current stored value
  async getCurrentValue(): Promise<string> {
    try {
      return await this.contract.getValue();
    } catch (error) {
      console.error('Failed to get current value:', error);
      return '';
    }
  }

  // Get all ValueUpdated events
  async getAllIdentities(): Promise<BlockchainTransaction[]> {
    try {
      const filter = this.contract.filters.ValueUpdated();
      const events = await this.contract.queryFilter(filter);
      
      const transactions: BlockchainTransaction[] = [];
      
      for (const event of events) {
        if (event.blockNumber && event.transactionHash) {
          const block = await this.provider.getBlock(event.blockNumber);
          const tx = await this.provider.getTransaction(event.transactionHash);
          
          transactions.push({
            hash: event.transactionHash,
            blockNumber: event.blockNumber,
            timestamp: block?.timestamp || 0,
            value: event.args?.[0] || '',
            from: tx?.from || ''
          });
        }
      }
      
      return transactions.sort((a, b) => b.blockNumber - a.blockNumber);
    } catch (error) {
      console.error('Failed to get identities:', error);
      return [];
    }
  }

  // Get blockchain blocks with transaction data
  async getBlocks(): Promise<BlockInfo[]> {
    try {
      const currentBlock = await this.provider.getBlockNumber();
      const blocks: BlockInfo[] = [];
      
      // Get last 10 blocks or all blocks if less than 10
      const startBlock = Math.max(1, currentBlock - 9);
      
      for (let i = currentBlock; i >= startBlock; i--) {
        const block = await this.provider.getBlock(i, true);
        if (block) {
          const blockTransactions: BlockchainTransaction[] = [];
          
          // Filter transactions related to our contract
          for (const tx of block.transactions) {
            if (typeof tx === 'object' && tx.to?.toLowerCase() === CONTRACT_ADDRESS.toLowerCase()) {
              // Try to decode the transaction data
              try {
                const receipt = await this.provider.getTransactionReceipt(tx.hash);
                if (receipt) {
                  const logs = await this.contract.queryFilter(
                    this.contract.filters.ValueUpdated(),
                    receipt.blockNumber,
                    receipt.blockNumber
                  );
                  
                  const relevantLog = logs.find(log => log.transactionHash === tx.hash);
                  if (relevantLog) {
                    blockTransactions.push({
                      hash: tx.hash,
                      blockNumber: i,
                      timestamp: block.timestamp,
                      value: relevantLog.args?.[0] || '',
                      from: tx.from
                    });
                  }
                }
              } catch (error) {
                // Skip transactions we can't decode
                console.warn('Could not decode transaction:', tx.hash);
              }
            }
          }
          
          blocks.push({
            number: i,
            timestamp: block.timestamp,
            hash: block.hash || '',
            transactions: blockTransactions
          });
        }
      }
      
      return blocks;
    } catch (error) {
      console.error('Failed to get blocks:', error);
      return [];
    }
  }
}

export const blockchainService = new BlockchainService();