import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer } from "ethers";
import { Bank } from "../../typechain-types";

describe("Bank", function () {
  let bankOwner: Signer, user1: Signer, user2: Signer;
  let bank: Bank;
  let minimumDeposit: string;
  beforeEach(async () => {
    // Get Accounts to be used
    [bankOwner, user1, user2] = await ethers.getSigners();
    // Get Contract
    const BankFactory = await ethers.getContractFactory("Bank", bankOwner);
    //Deploy Contract

    bank = await BankFactory.deploy(bankOwner);
    minimumDeposit = ethers.formatEther(await bank.minimumDeposit());
  });

  describe("Create Account", () => {
    it("Unable to create an account if minimum deposit is not met", async () => {
      // Get Bank Balance
      const bankBalanceBefore = ethers.formatEther(
        await bank.getTotalBankBalance()
      );

      // Create account for user and deposit an amount that is less than minimum
      const amount = ethers.parseEther("0.005");

      await expect(
        bank.connect(user1).createAccount("user@gmail.com", "user", {
          value: amount,
        })
      ).to.be.revertedWith("The amount is less than the miminmum deposit");
      //   Expect account not be created and the bank balance to be same after failed transaction

      const bankBalanceAfter = ethers.formatEther(
        await bank.getTotalBankBalance()
      );

      expect(bankBalanceBefore).to.eq(bankBalanceAfter);
    });
    it("Able to create account in the bank by sending a minimum deposit", async () => {
      const bankBalanceBefore = ethers.formatEther(
        await bank.getTotalBankBalance()
      );

      // Create account for user with the mimimum deposit
      await bank
        .connect(user1)
        .createAccount("user@gmail.com", "user", {
          value: ethers.parseEther(minimumDeposit),
        });
      const bankBalanceAfter = ethers.formatEther(
        await bank.getTotalBankBalance()
      );

      const userAccountBalance = ethers.formatEther(
        await bank.connect(user1).getAccountBalance()
      );

      //   bankBalance should be greater than before
      expect(bankBalanceAfter > bankBalanceBefore).to.be.true;
      // user account should have the money deposited
      expect(userAccountBalance === minimumDeposit).to.be.true;
    });
    it("Unable to create an account if the account exists already", async () => {
      // Create account for user
      await bank
        .connect(user1)
        .createAccount("user@gmail.com", "user", {
          value: ethers.parseEther(minimumDeposit),
        });

      // Create account for the same user again
      //   An error should be thrown that this user already exists
      await expect(
        bank
          .connect(user1)
          .createAccount("user@gmail.com", "user", {
            value: ethers.parseEther(minimumDeposit),
          })
      ).to.be.revertedWith("This Account already exists");
    });
  });

  describe("User Account Balance", () => {
    it("User can only access account balance when you have an account", async () => {
      await expect(bank.connect(user1).getAccountBalance()).to.be.revertedWith(
        "This address does not have an account"
      );
    });
  });
  describe("Bank(Contract) Total Balance", () => {
    it("Only Bank Owner can view total bank balance", async () => {
      // if not an owner throw err
      await expect(
        bank.connect(user1).getTotalBankBalance()
      ).to.be.revertedWith("Only Owner can access total bank balance");
      //   if owner return the balnce of contract
      expect(await bank.connect(bankOwner).getTotalBankBalance()).to.be.string;
    });
  });

  describe("Deposits", () => {
    it("User can deposit into their account", async () => {
      //   create accout for user
      await bank
        .connect(user1)
        .createAccount("user@gmail.com", "user", {
          value: ethers.parseEther(minimumDeposit),
        });
      const userAccountBalanceBefore = ethers.formatEther(
        await bank.connect(user1).getAccountBalance()
      );

      //   deposit into user account
      const tx = await bank
        .connect(user1)
        .depositIntoMyAccount({ value: ethers.parseEther("4") });

      await tx.wait();

      const userAccountBalanceAfter = ethers.formatEther(
        await bank.connect(user1).getAccountBalance()
      );

      // user account should have the money deposited greater than previous balance
      expect(+userAccountBalanceAfter > +userAccountBalanceBefore).to.be.true;
    });
    it("A User with insufficient funds cannot deposit into the account of another user ", async () => {
      //   create account for user 1
      await bank
        .connect(user1)
        .createAccount("user@gmail.com", "user", {
          value: ethers.parseEther(minimumDeposit),
        });
      const user1AccountBalanceBefore = ethers.formatEther(
        await bank.connect(user1).getAccountBalance()
      );

      //   create account for user 2
      await bank
        .connect(user2)
        .createAccount("user@gmail.com", "user", {
          value: ethers.parseEther(minimumDeposit),
        });
      const user2AccountBalanceBefore = ethers.formatEther(
        await bank.connect(user2).getAccountBalance()
      );
      const amountGreaterThanBalance = +user1AccountBalanceBefore + 4;
      //   user 1 deposits into user2 account
      await expect(
        bank.connect(user1).depositIntoAnotherAccount(user2, {
          value: ethers.parseEther(`${amountGreaterThanBalance}`),
        })
      ).to.be.revertedWith("Insufficient funds");
    });
    it("A User with sufficient funds can deposit into the account of another user ", async () => {
      //   create account for user 1
      const amountToDepositIntoUser1Account = "4";
      await bank.connect(user1).createAccount("user@gmail.com", "user", {
        value: ethers.parseEther(amountToDepositIntoUser1Account),
      });
      const user1AccountBalanceBefore = ethers.formatEther(
        await bank.connect(user1).getAccountBalance()
      );

      //   create account for user 2
      await bank
        .connect(user2)
        .createAccount("user@gmail.com", "user", {
          value: ethers.parseEther(minimumDeposit),
        });
      const user2AccountBalanceBefore = ethers.formatEther(
        await bank.connect(user2).getAccountBalance()
      );
      const amountLesserThanBalance = +amountToDepositIntoUser1Account - 1;
      //   user 1 deposits into user2 account
      const tx = await bank.connect(user1).depositIntoAnotherAccount(user2, {
        value: ethers.parseEther(`${amountLesserThanBalance}`),
      });

      await tx.wait();

      const user2AccountBalanceAfter = ethers.formatEther(
        await bank.connect(user2).getAccountBalance()
      );
      const user1AccountBalanceAfter = ethers.formatEther(
        await bank.connect(user1).getAccountBalance()
      );

      // user2 account should have the money deposited greater than previous balance
      expect(+user2AccountBalanceAfter > +user2AccountBalanceBefore).to.be.true;
      // user1 account should have the money deposited lesser than previous balance
      expect(+user1AccountBalanceAfter < +user1AccountBalanceBefore).to.be.true;
    });
  });

  describe("Withdrawals", () => {
    // test to ensure that you cannot withdraw more than u have
    it("ensure that user cannot withdraw more than their balance", async () => {
      await bank
        .connect(user1)
        .createAccount("user@gmail.com", "user", {
          value: ethers.parseEther(minimumDeposit),
        });

      const amountToWithDraw = +minimumDeposit + 4;
      await expect(
        bank
          .connect(user1)
          .withdraw(user1, ethers.parseEther(`${amountToWithDraw}`))
      ).to.be.revertedWith("Insufficient funds");
    });
    // test to see that the amount is deducted from the contract, and added to the user address
    it("Ensure amount is deducted from the contract, and added to the user address", async () => {
      await bank
        .connect(user2)
        .createAccount("user@gmail.com", "user", {
          value: ethers.parseEther("4"),
        });
      const totalBankBalanceBefore = ethers.formatEther(
        await bank.getTotalBankBalance()
      );
      const userAccBalanceBefore = ethers.formatEther(
        await bank.connect(user2).getAccountBalance()
      );
      const amountWithdrawn = ethers.parseEther("1");

      const tx = await bank.connect(user2).withdraw(user2, amountWithdrawn);
      await tx.wait();
      const totalBankBalanceAfter = ethers.formatEther(
        await bank.getTotalBankBalance()
      );
      const userAccBalanceAfter = ethers.formatEther(
        await bank.connect(user2).getAccountBalance()
      );

      expect(userAccBalanceAfter < userAccBalanceBefore).to.be.true;

      expect(totalBankBalanceAfter < totalBankBalanceBefore).to.be.true;
    });
  });
});
