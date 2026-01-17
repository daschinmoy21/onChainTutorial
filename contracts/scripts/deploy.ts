import { ethers } from "hardhat";

async function main() {
    // TODO: Get the ContractFactory for "StudentRegistry"
    // const StudentRegistry = await ethers.getContractFactory("StudentRegistry");

    console.log("Deploying contract...");

    // TODO: Deploy the contract
    // const studentRegistry = await StudentRegistry.deploy();

    // TODO: Wait for deployment to finish
    // await studentRegistry.waitForDeployment();

    // console.log(`StudentRegistry deployed to ${studentRegistry.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
