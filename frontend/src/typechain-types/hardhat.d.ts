/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomicfoundation/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Lock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Lock__factory>;
    getContractFactory(
      name: "Attacker",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Attacker__factory>;
    getContractFactory(
      name: "Bank",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Bank__factory>;
    getContractFactory(
      name: "Transfer",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Transfer__factory>;

    getContractAt(
      name: "Lock",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Lock>;
    getContractAt(
      name: "Attacker",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Attacker>;
    getContractAt(
      name: "Bank",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Bank>;
    getContractAt(
      name: "Transfer",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Transfer>;

    deployContract(
      name: "Lock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Lock>;
    deployContract(
      name: "Attacker",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Attacker>;
    deployContract(
      name: "Bank",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Bank>;
    deployContract(
      name: "Transfer",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Transfer>;

    deployContract(
      name: "Lock",
      args: any[],
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Lock>;
    deployContract(
      name: "Attacker",
      args: any[],
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Attacker>;
    deployContract(
      name: "Bank",
      args: any[],
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Bank>;
    deployContract(
      name: "Transfer",
      args: any[],
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Transfer>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      args: any[],
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.Contract>;
  }
}
