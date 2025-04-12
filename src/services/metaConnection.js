import { ethers } from "ethers";

export const connectMM = async (str) => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  console.log(signer);
};
