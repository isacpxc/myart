import { ethers } from "ethers";
import { createContractTK } from "../contracts/abi";
import * as handleTx from "../services/handleTx";

export const connectMM = async () => {
  let signer = null;
  let provider;
  if (window.ethereum == null) {
    console.log("MetaMask not installed; using read-only defaults");
    provider = ethers.getDefaultProvider();
  } else {
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
  }

  return [provider, signer];
};

export const handlePurchase = async (info) => {
  const signer = (await connectMM())[1];
  const contractTK = await createContractTK(signer);
  const tx = await handleTx.buyNft(contractTK, info);
  return await tx.wait();
};
