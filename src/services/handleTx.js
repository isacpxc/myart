export const getBalance = async (contract, address) => {
  const balance = await contract.myBalance(address);
  return balance;
};
