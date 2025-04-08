// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

interface MATK{
    function myBalance(address) external returns(uint256);
}

contract MyArtNFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    address private matk_contract_address;
    mapping (uint256 => uint256) private NFTprice;

    event e_minted(address indexed owner, uint256 toke_id);
    
    modifier realId(uint id) {
        require(id <= _nextTokenId, "item does not exist");
        _;
    }

    constructor(address initialOwner) ERC721("MyArtNFT", "MATNFT") Ownable(initialOwner){

    }

    function getNFTprice(uint id) private view realId(id) returns(uint){
        return NFTprice[id];
    }

    function set_matk_address(address addr) public onlyOwner {
        matk_contract_address = addr;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function balance_matk(address owner) public onlyOwner returns(uint256) {
        return MATK(matk_contract_address).myBalance(owner);
    }

    function safeMint(address to, string memory uri) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        emit e_minted(to, tokenId);
        return tokenId;
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

}
