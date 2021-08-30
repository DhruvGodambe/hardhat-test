pragma solidity ^0.8.0;

contract Test {
    address payable public owner;

    constructor(address payable _owner) {
        owner = _owner;
    }

    function renounceOwnership(address payable _newOwner) public payable onlyOwner {
        require(msg.value >= 1 ether, "Not enough fund to renounce ownership");
        owner = _newOwner;
    }

    function claimOwnershipReward() public onlyOwner {
        uint balance = address(this).balance;
        require(balance > 0, "Rewards already Reaped");
        owner.transfer(balance);
    }

    modifier onlyOwner {
        require(msg.sender == owner, "C'mmon man! You are not the owner");
        _;
    }
}