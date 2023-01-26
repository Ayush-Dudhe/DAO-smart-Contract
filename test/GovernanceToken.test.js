const { getNamedAccounts, deployments, ethers, network } = require("hardhat")
const {
  developmentChains,
  tokenName,
  tokenSymbol,
  daoVersion,
} = require("../helper-hardhat-config")
const { assert, expect } = require("chai")
const { parse } = require("typechain")

!developmentChains.includes(network.name)
  ? descrive.skip
  : describe("Governance Token Unit Tests", async function () {
      let GovernanceToken

      beforeEach(async function () {
        let { deployer } = await getNamedAccounts()
        await deployments.fixture()
        GovernanceToken = await ethers.getContract("GovernanceToken", deployer)
      })

      describe("Constructor", async function () {
        it("Initializes Name of Governance Token Correctly", async function () {
          const tokenNameFromContract = await GovernanceToken.name()
          assert.equal(tokenNameFromContract, tokenName)
        })
        it("Initializes Symbol of Governance Token Correctly", async function () {
          const tokenSymbolFromContract = await GovernanceToken.symbol()
          assert.equal(tokenSymbolFromContract, tokenSymbol)
        })
      })

      describe("Mint Token", async function () {
        it("Mints NFT to an address", async function () {
          let { deployer, user } = await getNamedAccounts()
          const mintedToken = await GovernanceToken.mintNFT(user, 1)
          const addressOfOwnerOfMintedToken = await GovernanceToken.ownerOf(1)
          assert(addressOfOwnerOfMintedToken, mintedToken)
        })
      })
    })
