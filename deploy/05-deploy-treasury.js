const { ethers } = require("hardhat")
const {
  experimentalAddHardhatNetworkMessageTraceHook,
} = require("hardhat/config")

module.exports.default = async (hre) => {
  const { getNamedAccounts, deployments } = hre
  const { deploy, log, get } = deployments
  const { deployer, user } = await getNamedAccounts()
  const chainId = network.config.chainId

  const args = []
  const treasury = await deploy("Treasury", {
    from: deployer,
    args: args,
    log: true,
    // waitConfirmations: 6,
  })

  log("Treasury Contract Deployed")
  // const addressDeployed = await get("GovernanceToken");
  // console.log(`Contract Deployed at ${addressDeployed.address}`);

  if (chainId != 31337 && process.env.ETHERSCAN_API_KEY) {
    await verify(treasury.address, args)
  }

  log("transferring ownership of Treasury contract to TimeLock ")
  const timeLock = await ethers.getContract("TimeLock")
  const treasuryContract = await ethers.getContract("Treasury")

  const transferOwnershiptx = await treasuryContract.transferOwnership(
    timeLock.address
  )
  await transferOwnershiptx.wait(1)
  log("Done")
  log("-----------------------------------------------------")
}
