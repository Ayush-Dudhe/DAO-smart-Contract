const developmentChains = ["hardhat", "localhost"]
const proposalFile = "proposals.json"
const tokenName = "DAOTOKEN"
const tokenSymbol = "DAOT"
const daoVersion = "1"
const minDelay = 60
const func = "releaseFunds"

const governorName = "MyGovernor"
const votingDelay = 1
const votingPeriod = 100
const proposalThreshold = 1
const quorumPercent = 4

module.exports = {
  developmentChains,
  proposalFile,
  tokenName,
  tokenSymbol,
  daoVersion,
  minDelay,
  func,
  governorName,
  votingDelay,
  votingPeriod,
  proposalThreshold,
  quorumPercent,
}
