import { Contract } from "ethers";
import { connectMM } from "../services/metaConnection";

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
  const TKcontract = new Contract(
    "0x11812cb190736FcF572442f8c0C9012C0973b212",
    abi[0],
    provider
  );
  return TKcontract;
};

export const createContractNFT = async ([provider]) => {
  const NFTcontract = new Contract(
    "0xbab9F68224E3C060666C8cbD26473373488A647f",
    abi[1],
    provider
  );

  return NFTcontract;
};
