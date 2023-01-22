const { ethers, network } = require("hardhat")
const {
  developmentChains,
  proposalFile,
} = require("../helper-hardhat-config.js")
const { moveBlocks } = require("../utils/move-blocks")
const fs = require("fs")

async function propose(args, functionToCall, proposalDescription) {
  const governor = await ethers.getContract("MyGovernor")
  const treasury = await ethers.getContract("Treasury")
  const encodedFunctionCall = treasury.interface.encodeFunctionData(
    functionToCall,
    args
  )

  console.log(`Proposing ${functionToCall} on ${treasury.address} with ${args}`)

  console.log(`Proposal Description: \n ${proposalDescription}`)

  const proposeTx = await governor.propose(
    [treasury.address],
    [0],
    [encodedFunctionCall],
    proposalDescription
  )

  if (developmentChains.includes(network.name)) {
    await moveBlocks(10)
  }

  const proposeReciept = await proposeTx.wait(1)

  console.log("Proposal Reciept", proposeReciept)
  const proposalId = proposeReciept.events[0].args.proposalId
  storeProposalId(proposalId)
  // proposals[network.config.chainId.toString()].push(proposalId.toString())
  // fs.writeFileSync(proposalFile, JSON.stringify(proposals))
}

function storeProposalId(proposalId) {
  const chainId = network.config.chainId.toString()
  let proposals
  if (fs.existsSync(proposalFile)) {
    proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"))
  } else {
    proposals = {}
    proposals[chainId] = []
  }

  proposals[chainId].push(proposalId.toString())
  fs.writeFileSync(proposalFile, JSON.stringify(proposals), "utf8")
}

propose(
  ["0x5FbDB2315678afecb367f032d93F642f64180aa3"],
  "releaseFunds",
  "Proposal Number 1 - Transfer Funds"
)
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    process.exit(1)
  })
