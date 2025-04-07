// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;


contract MATK {
    mapping (address => uint) public myBalance;
    address private owner;
    uint public priceTokenInWei = 10e16;
    // myERC20 public TK;
    bool public paused = false;

    event e_minted(address indexed _acc,uint _amount, uint _change);
    event e_transferredTK(address indexed _sender, address _to, uint amount);
    event e_pause_action(bool _state);
    event e_balance(uint _balance);

    modifier onlyOwner {
        require(msg.sender == owner, "You're not the owner of this contract");
        _;
    }

    modifier ifNotPaused {
        require(paused == false, "The contract is curently paused!");
        _;
    }

    constructor(){
        owner = msg.sender;
    }

    function balance(address _addr)public view returns(uint){
        return myBalance[_addr];
    }

    // function balance(address _addr)public view returns(uint){
    //     emit e_balance(myBalance[_addr]);         
    // } most expensive

    function pauseContract() public onlyOwner {
        paused = true;
        emit e_pause_action(paused);
    }

    function unpauseContract() public onlyOwner {
        paused = false;
        emit e_pause_action(paused);
    }

    function transfer_TK(address _to, uint _amount) public payable ifNotPaused {
        require(_amount >= myBalance[msg.sender], "You don't have MATK for this transaction");
        myBalance[msg.sender] -= _amount;
        myBalance[_to] += _amount;
        emit e_transferredTK(msg.sender, _to, _amount);
    }



    function mint_MATK() public payable ifNotPaused{
        require(msg.value >= priceTokenInWei, "Insufficient amount sent");
        uint change = (msg.value) % (priceTokenInWei);
        uint tokensToMint = (msg.value - change)/priceTokenInWei;
        myBalance[msg.sender] += tokensToMint;
        payable(msg.sender).transfer(change);
        emit e_minted(msg.sender,tokensToMint,change);
    }

}