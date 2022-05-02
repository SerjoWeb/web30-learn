// SPDX-License-Identifier: UNLICENSED

// the solidity language version
pragma solidity ^0.8.0;

// init a Transaction class
contract Transactions {
    // init a variable transactionCount as a unit256 type
    uint256 transactionCount;

    // init a Transfer event including vars: sender: address, receiver: address, amount: unit, message: string, keyword: string
    event Transfer(address sender, address receiver, uint amount, string message, uint256 timestamp, string keyword);

    // init a structure including types: sender: address, receiver: address, amount: unit, message: string, keyword: string
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    // init an array transaction of a type - TrnasferStruct
    TransferStruct[] transactions;

    // public function addToBlockchain including vars: receiver (address payable), amount: unit, message (string memory), keyword (string memory)
    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public {
        // increment the transactionCount
        transactionCount += 1;

        // push data to a transactions array as a structure using specific objects msg and block
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));
        
        // make a transaction using emit functionality
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    // public function getAllTransactions returns TransferStruct as an array from memory
    function getAllTransactions() public view returns(TransferStruct[] memory) {
        return transactions;
    }

    // public function getTransactionCount
    function getTransactionCount() public view returns(uint256) {
        return transactionCount;
    }
}
