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
    mapping (address => uint256[]) private  myNfts;

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
        return "";
    }

    function safeMint(address to, string memory uri) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        myNfts[to].push(tokenId);
        emit e_minted(to, tokenId);
        return tokenId;
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function changeNFTOwner(address newOwner, uint tokenId) private {
        super._update(newOwner, tokenId, address(0));
    }

    function removeElement(uint256 _tokenId, address _owner) private returns(bool){
        uint256 index;
        uint256 hold;
        for (uint256 i=0;i<myNfts[_owner].length;i++){
            if (myNfts[_owner][i] == _tokenId){
                index = i;
                break;
            }
        }
        hold = myNfts[_owner][myNfts[_owner].length-1];
        myNfts[_owner][myNfts[_owner].length-1] = myNfts[_owner][index];
        myNfts[_owner][index] = hold;
        myNfts[_owner].pop();
        return true;
    }

    function changeTokenOwner(address currentOwner, address newOwner, uint id, string memory uri, string memory oldUri) external {
        require(msg.sender == matk_contract_address, "not authorized");
        require(id < _nextTokenId, "id do not exist!");
        require(currentOwner == ownerOf(id), "You're not the owner of this NFT.");
        require(compareStrings(oldUri,tokenURI(id)),"the tokenId doesn't match this NFT");
        changeNFTOwner(newOwner, id);
        _setTokenURI(id, uri);
        require(removeElement(id,currentOwner), "Something went wrong trying to update myNfts");
        myNfts[newOwner].push(id);
        emit e_nft_transfer(id,uri);
    }


    
    function returnMyNfts(address _owner) public view returns(uint[] memory){
        return myNfts[_owner];
    }

}