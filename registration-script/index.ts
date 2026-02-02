import { ethers } from "ethers";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Objective: Connect to the chain, create a wallet from a private key, and call the 'register' function.

async function main() {
    console.log("Starting Registration...\n");

    // 1. Setup Provider (RPC URL)
    const RPC_URL = process.env.RPC_URL || "http://localhost:8545";
    console.log(`Connecting to: ${RPC_URL}`);
    const provider = new ethers.JsonRpcProvider(RPC_URL);

    // 2. Setup Wallet (Private Key)
    // Using Hardhat's first default account private key as fallback
    const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    console.log(`Wallet Address: ${wallet.address}\n`);

    // 3. Setup Contract (Address + ABI)
    const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const CONTRACT_ABI = [
        "function register(string memory _name, string memory _rollNumber) public",
        "function getStudent(address _studentAddress) public view returns (string memory, string memory)",
        "event StudentRegistered(address indexed studentAddress, string name, string rollNumber)"
    ];

    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);
    console.log(`Contract Address: ${CONTRACT_ADDRESS}\n`);

    // 4. Send Transaction (register)
    const studentName = process.env.STUDENT_NAME || "John Doe";
    const studentRollNo = process.env.STUDENT_ROLL || "CS2024001";

    console.log(`Registering student:`);
    console.log(`  Name: ${studentName}`);
    console.log(`  Roll Number: ${studentRollNo}\n`);

    try {
        // Send the transaction
        console.log("Sending transaction...");
        const tx = await contract.register(studentName, studentRollNo);
        console.log(`Transaction hash: ${tx.hash}`);

        // Wait for confirmation
        console.log("Waiting for confirmation...");
        const receipt = await tx.wait();
        console.log(`\n✅ Registration successful!`);
        console.log(`Block number: ${receipt.blockNumber}`);
        console.log(`Gas used: ${receipt.gasUsed.toString()}\n`);

        // Verify registration
        console.log("Verifying registration...");
        const [name, rollNo] = await contract.getStudent(wallet.address);
        console.log(`Name: ${name}`);
        console.log(`Roll Number: ${rollNo}`);

    } catch (error: any) {
        console.error("\n❌ Registration failed:");
        if (error.message?.includes("already registered")) {
            console.error("This address is already registered!");
        } else {
            console.error(error.message);
        }
        process.exit(1);
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
