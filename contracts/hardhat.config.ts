import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      chainId: 1337, // Standard localhost chainId
      mining: {
        auto: true,
        interval: 0
      }
    },
    // Used if we want to deploy to a specific network setup
    localhost: {
      url: "http://0.0.0.0:8545",
    }
  }
};

export default config;
