import { Contract } from "ethers";
import { connectMM } from "../services/metaConnection";
import { TKaddr, NFTaddr } from "../util/contracts";

const abi = [
  [
    // MATK contract
    "function transfer_TK (address _to, uint256 _amount, uint256 tokenId, string memory uri, string memory oldUri) public payable",
    "function mint_MATK () public payable",
    "function myBalance(address account) public view returns(uint256)",
  ],
  [
    // MANFT contract
    "function safeMint(address to, string memory uri) public returns (uint256)",
    "function tokenURI(uint256 tokenId) public view returns (string memory)",
  ],
];

export const createContractTK = async ([provider]) => {
  // const [provider] = await connectMM();
  const TKcontract = new Contract(TKaddr, abi[0], provider);
  return TKcontract;
};

export const createContractNFT = async ([provider]) => {
  const NFTcontract = new Contract(NFTaddr, abi[1], provider);

  return NFTcontract;
};
