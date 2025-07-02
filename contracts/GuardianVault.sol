// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract GuardianVault {
    address public earthFund;
    address public hungerFund;
    address public animalFund;
    address public systemFund;

    constructor(address _earth, address _hunger, address _animal, address _system) {
        earthFund = _earth;
        hungerFund = _hunger;
        animalFund = _animal;
        systemFund = _system;
    }

    function redistribute(uint256 amount) external {
        uint256 thirty = (amount * 30) / 100;
        uint256 ten = (amount * 10) / 100;
        payable(earthFund).transfer(thirty);
        payable(hungerFund).transfer(thirty);
        payable(animalFund).transfer(thirty);
        payable(systemFund).transfer(ten);
    }

    receive() external payable {}
}

