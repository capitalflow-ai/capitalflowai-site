// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ResonanceEngine {
    mapping(address => int256) public resonanceScore;

    function updateResonance(address from, address to, uint256 amount) external {
        resonanceScore[to] += int256(amount / 1e18);
        resonanceScore[from] -= int256(amount / 2e18);
    }

    function getScore(address user) external view returns (int256) {
        return resonanceScore

