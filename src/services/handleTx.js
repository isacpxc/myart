export const getBalance = async (contract, address) => {
  const balance = await contract.myBalance(address);
  return balance;
};

export const mintTK = async (contract, address, value) => {
  const result = await contract.mint_MATK().send(value);
  return result;
};

export const minNFT = async (contract, to, uri) => {
  const result = await contract.safeMint(to, uri);
  return result;
};
