// const { ethers, network } = require("hardhat")
// const {
//   developmentChains,
//   proposalFile,
// } = require("../helper-hardhat-config.js")
// const { moveBlocks } = require("../utils/move-blocks")
// const fs = require("fs")

// async function queueAndExecute() {
//     const governor = await ethers.getContract("MyGovernor")
//     const treasury = await ethers.getContract("Treasury")
//   const encodedFunctionCall = treasury.interface.encodeFunctionData(
//     functionToCall,
//     ["0x5FbDB2315678afecb367f032d93F642f64180aa3"]
//   )

//   console.log(`Proposing ${functionToCall} on ${treasury.address} with ${args}`)

//   console.log(`Proposal Description: \n ${proposalDescription}`)

//   const proposeTx = await governor.queue(
//     [treasury.address],
//     [0],
//     [encodedFunctionCall],
//     proposalDescription
//   )

//   if (developmentChains.includes(network.name)) {
//     await moveBlocks(10)
//   }

//   const proposeReciept = await proposeTx.wait(1)

// }

// queueAndExecute()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.log((error) => {
//       console.log(error)
//       process.exit(1)
//     })
//   })
