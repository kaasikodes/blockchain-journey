import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const CHAIN_ID = 7777;

const config: HardhatUserConfig = {
  solidity: "0.8.18",

  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    hardhat: {
      chainId: CHAIN_ID,
    },
  },
};

export default config;
