const { verify } = require("../utils/verify")
const {
  tokenName,
  tokenSymbol,
  daoVersion,
} = require("../helper-hardhat-config")

module.exports.default = async (hre) => {
  const { getNamedAccounts, deployments } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()

  const chainId = network.config.chainId

  const args = [tokenName, tokenSymbol, daoVersion]
  const governanceToken = await deploy("GovernanceToken", {
    from: deployer,
    args: args,
    log: true,
    // waitConfirmations: 6,
  })

  log("GovernanceToken Contract Deployed")
  // const addressDeployed = await get("GovernanceToken");
  // console.log(`Contract Deployed at ${addressDeployed.address}`);

  if (chainId != 31337 && process.env.ETHERSCAN_API_KEY) {
    await verify(governanceToken.address, args)
  }
  log("-----------------------------------------------------")
}

module.exports.tags = ["all", "token"]
