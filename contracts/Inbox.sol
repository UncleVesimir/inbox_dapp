pragma solidity ^0.7;

contract Inbox {
    string public message;

    constructor(string memory initialMessage) {
        message = initialMessage;
    }

    function setMessage(string calldata newMessage) public{
        message = newMessage;
    }
}git c