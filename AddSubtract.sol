pragma solidity ^0.6.1;

contract AddSubtract {

    mapping (address => uint) private accountValues;

    function add() public {
        accountValues[msg.sender]++;
    }
    
    function subtract() public {
        if(accountValues[msg.sender]>0) {
            accountValues[msg.sender]--;    
        }
    }

    function get() public view returns (uint) {
        return accountValues[msg.sender];
    }
}
