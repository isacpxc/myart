import { parseEther } from "ethers";

export const getBalance = async (contract, address) => {
  const balance = await contract.myBalance(address);
  return balance;
};

export const mintTK = async (contract, value) => {
  const amount = String(value * 10000000000000000);
  const result = await contract.mint_MATK({ value: amount });
  return result;
};

export const mintNFT = async (contract, to, uri) => {
  const result = await contract.safeMint(to, uri);
  return result;
};

export const myNfts = async (contract, owner) => {
  const result = await contract.returnMyNfts(owner);
  return result;
};

export const getNftById = async (contract, id) => {
  const result = await contract.tokenURI(id);
  return result;
};
