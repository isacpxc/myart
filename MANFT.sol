// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MyArtNFT is ERC721, ERC721URIStorage, Ownable {
    using Strings for string;
    uint256 private _nextTokenId;
    address private matk_contract_address;
    mapping (uint256 => uint256) private NFTprice;

    event e_minted(address indexed owner, uint256 toke_id);
    event e_nft_transfer(uint _id, string _uri);

    constructor(address initialOwner) ERC721("MyArtNFT", "MATNFT") Ownable(initialOwner){

    }

    
    function set_matk_address(address addr) public onlyOwner {
        matk_contract_address = addr;
    }

    function compareStrings(string memory s1, string memory s2) pure public returns(bool){
        return s1.equal(s2);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
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

    function changeTokenUri(address currentOwner, uint id, string memory uri, string memory oldUri) public {
        require(msg.sender == matk_contract_address, "not authorized");
        require(id < _nextTokenId, "id do not exist!");
        require(currentOwner == ownerOf(id), "You're not the owner of this NFT.");
        require(compareStrings(oldUri,tokenURI(id)),"the tokenId doesn't match this NFT");
        _setTokenURI(id, uri);
        emit e_nft_transfer(id,uri);
    }

}
