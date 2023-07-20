import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Bank from "./artifacts/contracts/reentrancy/Bank.sol/Bank.json";
import { Eip1193Provider, ethers } from "ethers";
import { Bank as BankType } from "./typechain-types";

const bankAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

declare global {
  interface Window {
    ethereum: Eip1193Provider;
  }
}

type TDetail = {
  totalBankBalance: string;
  userAccount: { amount: string; exists: boolean };
};

function App() {
  const [detail, setDetail] = useState<TDetail>({
    totalBankBalance: "",
    userAccount: {
      amount: "",
      exists: false,
    },
  });
  const [amountToSend, setAmountToSend] = useState(0);
  const initializeProvider = () => {
    let provider = null;
    if (window.ethereum !== null) {
      provider = new ethers.BrowserProvider(window.ethereum);
    } else {
      console.log("MetaMask not installed; using read-only defaults");
    }

    return provider;
  };
  const initializeSigner = useCallback(async () => {
    const provider = initializeProvider();
    const signer = provider ? await provider.getSigner() : null;

    return signer;
  }, []);
  const getUserAccountBalance = useCallback(async () => {
    const provider = initializeProvider();
    const signer = await initializeSigner();
    const bank: BankType = new ethers.Contract(
      bankAddress,
      Bank.abi,
      provider
    ) as unknown as BankType;
    const balance = await bank.connect(signer).getAccountBalance();
    setDetail((prev) => ({
      ...prev,
      userAccount: {
        amount: ethers.formatEther(balance),
        exists: true,
      },
    }));
  }, [initializeSigner]);
  const getBankTotalBalance = useCallback(async () => {
    const provider = initializeProvider();
    const bank: BankType = new ethers.Contract(
      bankAddress,
      Bank.abi,
      provider
    ) as unknown as BankType;
    const totalBankBalance = await bank.getTotalBankBalance();
    setDetail((prev) => ({
      ...prev,
      totalBankBalance: ethers.formatEther(totalBankBalance),
    }));
  }, []);

  const createAccount = useCallback(async () => {
    const signer = await initializeSigner();
    const provider = initializeProvider();
    if (signer && provider) {
      const nonce = await provider.getTransactionCount(bankAddress);

      const bank: BankType = new ethers.Contract(
        bankAddress,
        Bank.abi,
        signer
      ) as unknown as BankType;
      const tx = await bank
        .connect(signer)
        .createAccount({ nonce, value: ethers.parseEther(`${amountToSend}`) });
      await tx.wait();
      console.log("reached");
      await getUserAccountBalance();
    }
  }, [amountToSend, initializeSigner, getUserAccountBalance]);

  const handleCreate = () => {
    createAccount().catch((err) => console.log(err));
  };

  useEffect(() => {
    getBankTotalBalance().catch((err) => console.log(err));
    getUserAccountBalance().catch((err) => console.log(err));
  }, [getBankTotalBalance, getUserAccountBalance]);

  return (
    <>
      <p className="read-the-docs">Info</p>
      <p className="read-the-docs">
        Total Bank Balance:{detail.totalBankBalance}
      </p>
      <p className="read-the-docs">
        My Account Balance:{detail.userAccount.amount}
      </p>
      <p className="read-the-docs">
        <input
          placeholder="Enter the amount to enter in ether"
          value={amountToSend}
          onChange={(e) => setAmountToSend(+e.target.value)}
        />
        <button
          disabled={detail.userAccount.exists}
          onClick={() => handleCreate()}
        >
          Create Account
        </button>
      </p>
      <p className="read-the-docs">
        <input
          placeholder="Enter the amount to enter in ether"
          value={amountToSend}
          onChange={(e) => setAmountToSend(+e.target.value)}
        />
        <button disabled={!detail.userAccount.exists}>Deposit</button>
      </p>
    </>
  );
}

export default App;
