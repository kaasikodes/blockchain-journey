import { ethers } from "hardhat";

async function main() {
  const [bankOwner] = await ethers.getSigners();

  const BankFactory = await ethers.getContractFactory("Bank");
  const amount = ethers.parseEther("0.001");
  const bank = await BankFactory.deploy(bankOwner, { value: amount });

  await bank.waitForDeployment();

  console.log(
    `Deployed contract! Contract: ${bank.target} | Owner: ${bankOwner.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
