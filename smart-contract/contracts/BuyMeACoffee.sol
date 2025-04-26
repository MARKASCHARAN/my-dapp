// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract BuyMeACoffee {
    address payable public owner;

    struct Memo {
        string name;
        string message;
        address from;
        uint timestamp;
    }

    Memo[] public memos;

    constructor() {
        owner = payable(msg.sender);
    }

    function buyCoffee(string memory _name, string memory _message) public payable {
        require(msg.value > 0, "Please send some ETH!");

        // Save memo
        memos.push(Memo(_name, _message, msg.sender, block.timestamp));

        // Transfer ETH
        owner.transfer(msg.value);
    }

    // Getter to fetch all memos
    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}
