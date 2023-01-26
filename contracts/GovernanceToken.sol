// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/draft-ERC721Votes.sol";

contract GovernanceToken is ERC721, EIP712, ERC721Votes {
  constructor(
    string memory _tokenName,
    string memory _tokenSymbol,
    string memory _version
  ) ERC721(_tokenName, _tokenSymbol) EIP712(_tokenName, _version) {}

  // The following functions are overrides required by Solidity.

  function _afterTokenTransfer(
    address from,
    address to,
    uint256 tokenId,
    uint256 batchSize
  ) internal override(ERC721, ERC721Votes) {
    super._afterTokenTransfer(from, to, tokenId, batchSize);
  }

  function mintNFT(address _to, uint256 _tokenId) public {
    _safeMint(_to, _tokenId);
  }

  function _baseURI() internal pure override(ERC721) returns (string memory) {
    return "\\ipfs-token-uri";
  }
}
