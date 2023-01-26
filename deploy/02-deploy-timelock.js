module.exports.default = async (hre) => {
  const { getNamedAccounts, deployments } = hre
  const { deploy, log, get } = deployments
  const { deployer, user } = await getNamedAccounts()
  const chainId = network.config.chainId

  const args = [60, [], [], deployer]
  const timeLock = await deploy("TimeLock", {
    from: deployer,
    args: args,
    log: true,
  })

  log("TimeLock Contract Deployed")
  // const addressDeployed = await get("GovernanceToken");
  // console.log(`Contract Deployed at ${addressDeployed.address}`);

  // const timeLockc = await ethers.getContract("TimeLock", deployer)
  // const adminRole = await timeLockc.TIMELOCK_ADMIN_ROLE()
  // const checkRole = await timeLockc.hasRole(adminRole, deployer)
  // console.log(checkRole)

  if (chainId != 31337 && process.env.ETHERSCAN_API_KEY) {
    await verify(timeLock.address, args)
  }
  log("-----------------------------------------------------")
}

module.exports.tags = ["all", "timelock"]
