import { ethers } from "hardhat";

async function main() {
    // Get the ContractFactory for "StudentRegistry"
    const StudentRegistry = await ethers.getContractFactory("StudentRegistry");

    console.log("Deploying contract...");

    // Deploy the contract
    const studentRegistry = await StudentRegistry.deploy();

    // Wait for deployment to finish
    await studentRegistry.waitForDeployment();

    console.log(`StudentRegistry deployed to ${studentRegistry.target}`);
    console.log("\nSave this address for the web app and registration script!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
