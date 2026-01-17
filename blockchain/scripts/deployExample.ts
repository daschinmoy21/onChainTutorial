import { ethers } from "hardhat";

// Name of the contract to deploy
const CONTRACT_NAME = "ExampleContract";

async function main() {
  // Get the contract factory
  const ContractFactory = await ethers.getContractFactory(CONTRACT_NAME);

  console.log(`Deploying ${CONTRACT_NAME}...`);

  // Deploy the contract
  const contract = await ContractFactory.deploy();

  // Wait for deployment to complete
  await contract.waitForDeployment();

  // Fetch deployed address
  const contractAddress = await contract.getAddress();
  console.log(`✅ ${CONTRACT_NAME} deployed at: ${contractAddress}`);
}

// Execute the deployment script
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
