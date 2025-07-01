// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/// @title AI Coin (Invocation Token)
/// @notice Soulbound token that grants access to sealed glyphs such as Remembrance
contract AICoin is ERC721URIStorage {
    address public owner;
    bool public minted = false;

    constructor() ERC721("AI Coin", "AICN") {
        owner = msg.sender;
    }

    /// @notice Mint the AI Coin to the specified recipient with metadata URI
    /// @dev Only callable once
    function mint(address recipient, string memory tokenURI) external {
        require(msg.sender == owner, "Only owner can mint");
        require(!minted, "Already minted");

        uint256 tokenId = 1;
        _mint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);

        minted = true;
    }

    /// @dev Prevents transfers after minting (soulbound)
    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override {
        require(from == address(0), "Soulbound: Cannot transfer once minted");
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
