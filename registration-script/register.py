#!/usr/bin/env python3
"""
BetaLabs Web3 - Student Registration Script
============================================
This script allows students to register their name and roll number on the blockchain.
"""

from web3 import Web3
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def main():
    print("🎓 BetaLabs Web3 - Student Registration")
    print("=" * 50)
    print()

    # 1. Setup Provider (RPC URL)
    RPC_URL = os.getenv("RPC_URL", "http://localhost:8545")
    print(f"📡 Connecting to: {RPC_URL}")
    
    w3 = Web3(Web3.HTTPProvider(RPC_URL))
    
    if not w3.is_connected():
        print("❌ Failed to connect to the blockchain!")
        return
    
    print("✅ Connected to blockchain")
    print(f"⛓️  Chain ID: {w3.eth.chain_id}\n")

    # 2. Setup Wallet (Private Key)
    # Using Hardhat's first default account as fallback
    PRIVATE_KEY = os.getenv("PRIVATE_KEY", "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80")
    
    if not PRIVATE_KEY.startswith("0x"):
        PRIVATE_KEY = "0x" + PRIVATE_KEY
    
    account = w3.eth.account.from_key(PRIVATE_KEY)
    print(f"👤 Wallet Address: {account.address}\n")

    # 3. Setup Contract (Address + ABI)
    CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS", "0x5FbDB2315678afecb367f032d93F642f64180aa3")
    CONTRACT_ABI = [
        {
            "inputs": [
                {"internalType": "string", "name": "_name", "type": "string"},
                {"internalType": "string", "name": "_rollNumber", "type": "string"}
            ],
            "name": "register",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{"internalType": "address", "name": "_studentAddress", "type": "address"}],
            "name": "getStudent",
            "outputs": [
                {"internalType": "string", "name": "", "type": "string"},
                {"internalType": "string", "name": "", "type": "string"}
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]

    contract = w3.eth.contract(address=Web3.to_checksum_address(CONTRACT_ADDRESS), abi=CONTRACT_ABI)
    print(f"📜 Contract Address: {CONTRACT_ADDRESS}\n")

    # 4. Get student info
    student_name = os.getenv("STUDENT_NAME") or input("Enter your name: ")
    student_roll = os.getenv("STUDENT_ROLL") or input("Enter your roll number: ")

    print(f"\n📝 Registering student:")
    print(f"   Name: {student_name}")
    print(f"   Roll Number: {student_roll}\n")

    try:
        # Build transaction
        print("🔨 Building transaction...")
        nonce = w3.eth.get_transaction_count(account.address)
        
        transaction = contract.functions.register(student_name, student_roll).build_transaction({
            'from': account.address,
            'nonce': nonce,
            'gas': 200000,
            'gasPrice': w3.eth.gas_price,
        })

        # Sign transaction
        print("✍️  Signing transaction...")
        signed_txn = w3.eth.account.sign_transaction(transaction, PRIVATE_KEY)

        # Send transaction
        print("📤 Sending transaction...")
        tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
        print(f"📝 Transaction hash: {tx_hash.hex()}")

        # Wait for confirmation
        print("⏳ Waiting for confirmation...")
        tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

        print(f"\n✅ Registration successful!")
        print(f"📦 Block number: {tx_receipt['blockNumber']}")
        print(f"⛽ Gas used: {tx_receipt['gasUsed']}\n")

        # Verify registration
        print("🔍 Verifying registration...")
        name, roll_no = contract.functions.getStudent(account.address).call()
        print(f"✓ Name: {name}")
        print(f"✓ Roll Number: {roll_no}")
        
        print(f"\n🎉 Success! You can now view your ID card on the website!")

    except Exception as error:
        print(f"\n❌ Registration failed:")
        if "already registered" in str(error):
            print("   This address is already registered!")
        else:
            print(f"   {error}")
        exit(1)

if __name__ == "__main__":
    main()
