module.exports.default = async (hre) => {
  const { getNamedAccounts, deployments } = hre
  const { deploy, log, get } = deployments
  const { deployer, user } = await getNamedAccounts()
  const chainId = network.config.chainId

  const addressGovernanceToken = await get("GovernanceToken")
  const addressTimeLock = await get("TimeLock")

  const args = [
    addressGovernanceToken.address,
    addressTimeLock.address,
    1,
    50400,
    4,
    0,
  ]
  const governor = await deploy("MyGovernor", {
    from: deployer,
    args: args,
    log: true,
    // waitConfirmations: 6,
  })

  log("Governor Contract Deployed")
  // const addressDeployed = await get("GovernanceToken");
  // console.log(`Contract Deployed at ${addressDeployed.address}`);

  if (chainId != 31337 && process.env.ETHERSCAN_API_KEY) {
    await verify(governor.address, args)
  }
  log("-----------------------------------------------------")
}
