const {
  getNamedAccounts,
  deployments,
  ethers,
  network,
  hardhatArguments,
} = require("hardhat")
const {
  developmentChains,
  governorName,
  votingDelay,
  votingPeriod,
  proposalThreshold,
  quorumPercent,
  func,
} = require("../helper-hardhat-config")
const { assert, expect } = require("chai")
const {
  isCallTrace,
} = require("hardhat/internal/hardhat-network/stack-traces/message-trace")

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Governor Contract Tests", async function () {
      let TimeLock,
        MyGovernor,
        Treasury,
        deployer,
        user,
        user2,
        emptyBytes,
        encodedFunctionCall
      beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer
        user = (await getNamedAccounts()).user
        user2 = (await getNamedAccounts()).user2

        await deployments.fixture()

        TimeLock = await ethers.getContract("TimeLock", deployer)

        MyGovernor = await ethers.getContract("MyGovernor", deployer)

        Treasury = await ethers.getContract("Treasury", deployer)
        const ethersToTransfer = ethers.utils.parseEther("1")
        encodedFunctionCall = Treasury.interface.encodeFunctionData(func, [
          user2,
          ethersToTransfer,
        ])

        GovernanceToken = await ethers.getContract("GovernanceToken", deployer)
      })

      describe("Constructor Tests", async function () {
        it("Name is Correct", async function () {
          const nameofGovernor = await MyGovernor.name()
          assert.equal(governorName, governorName)
        })

        it("Token Contract Address is Correct", async function () {
          const token = await MyGovernor.token()
          assert.equal(token, GovernanceToken.address)
        })

        it("Timelock Contract Address is Correct", async function () {
          const timelock = await MyGovernor.timelock()
          assert.equal(timelock, TimeLock.address)
        })

        it("Voting Delay is correctly set ", async function () {
          const votingDelayFromContract = await MyGovernor.votingDelay()
          assert.equal(votingDelayFromContract, votingDelay)
        })

        it("Voting Period is correctly set ", async function () {
          const votingPeriodFromContract = await MyGovernor.votingPeriod()
          assert.equal(votingPeriodFromContract, votingPeriod)
        })

        it("Proposal Threshold is correctly set ", async function () {
          const proposalThresholdFromContract =
            await MyGovernor.proposalThreshold()
          assert.equal(proposalThresholdFromContract, proposalThreshold)
        })
      })

      describe("Modify Governance", async function () {
        it("Proposal Threshold Cannot be Modified by deployer", async function () {
          await expect(MyGovernor.setProposalThreshold(2)).to.be.revertedWith(
            "Governor: onlyGovernance"
          )
        })
        it("Voting Delay Cannot be Modified by deployer", async function () {
          await expect(MyGovernor.setVotingDelay(2)).to.be.revertedWith(
            "Governor: onlyGovernance"
          )
        })
        it("Voting Period Cannot be Modified by deployer", async function () {
          await expect(MyGovernor.setVotingPeriod(2)).to.be.revertedWith(
            "Governor: onlyGovernance"
          )
        })
      })

      describe("Propose", async function () {
        it("Proposal Can be entered by anyone meeting proposal threshold", async function () {
          const proposal = await MyGovernor.propose(
            [Treasury.address],
            [0],
            [encodedFunctionCall],
            "This is a Proposal to release funds to the user"
          )

          const proposed = await proposal.wait(1)

          const proposalId = proposed.events[0].args[0]

          const proposalSnapshot = await MyGovernor.proposalSnapshot(proposalId)

          // IN PROGRESS
        })
      })
    })
