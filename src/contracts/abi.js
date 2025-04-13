import { Contract } from "ethers";

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
    "function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory)",
  ],
];

export const createContracts = (provider) => {
  const TKcontract = new Contract(
    "0x11812cb190736FcF572442f8c0C9012C0973b212",
    abi[0],
    provider
  ); // lacks information
  const NFTcontract = new Contract(
    "0xbab9F68224E3C060666C8cbD26473373488A647f",
    abi[1],
    provider
  ); // lacks information

  return [TKcontract, NFTcontract];
};
