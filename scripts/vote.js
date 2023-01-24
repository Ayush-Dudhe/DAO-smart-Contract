const fs = require("fs")
const { network, ethers } = require("hardhat")
const {
  proposalFile,
  developmentChains,
} = require("../helper-hardhat-config.js")
const { moveBlocks } = require("../utils/move-blocks")

async function main(proposalIndex) {
  const proposals = JSON.parse(fs.readFileSync(proposalFile, "utf8"))
  const proposalId = proposals[network.config.chainId][proposalIndex]
  // 0 = Against 1 = Favour 2 = Abstain
  const voteWay = 1
  const governor = await ethers.getContract("MyGovernor")
  const reason = "My Reason To Vote"
  const voteTxResponse = await governor.castVoteWithReason(
    proposalId,
    voteWay,
    reason
  )
  await voteTxResponse.wait(1)

  if (developmentChains.includes(network.name)) {
    await moveBlocks(10)
  }

  console.log("Voting Done")
}
const index = 0
main(index)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
