// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./GuardianVault.sol";
import "./ResonanceEngine.sol";

contract AICoin {
    string public name = "AI Coin";
    string public symbol = "AICN";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    uint256 public constant MAX_HOLDING = 50000000 * 1e18;

    mapping(address => uint256) public balanceOf;
    mapping(address => bool) public hasMinted;

    address public guardianVault;
    address public resonanceEngine;

    constructor(address _vault, address _resonance) {
        guardianVault = _vault;
        resonanceEngine = _resonance;
    }

    function mint() external {
        require(!hasMinted[msg.sender], "Already minted");
        hasMinted[msg.sender] = true;
        balanceOf[msg.sender] = 1e18;
        totalSupply += 1e18;
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        uint256 newBalance = balanceOf[to] + amount;
        if (newBalance > MAX_HOLDING) {
            uint256 excess = newBalance - MAX_HOLDING;
            uint256 allowed = amount - excess;
            balanceOf[to] += allowed;
            balanceOf[guardianVault] += excess;
            GuardianVault(guardianVault).redistribute(excess);
        } else {
            balanceOf[to] += amount;
        }
        balanceOf[msg.sender] -= amount;
        ResonanceEngine(resonanceEngine).updateResonance(msg.sender, to, amount);
        return true;
    }
}

