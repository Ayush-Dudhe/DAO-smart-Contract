const { getNamedAccounts, deployments, ethers, network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { assert, expect } = require("chai")
const { minDelay } = require("../helper-hardhat-config")

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Time Lock Unit Tests", async function () {
      let TimeLock, deployer, user, user2
      beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer
        user = (await getNamedAccounts()).user
        user2 = (await getNamedAccounts()).user2

        await deployments.fixture()

        TimeLock = await ethers.getContract("TimeLock", deployer)
        MyGovernor = await ethers.getContract("MyGovernor", deployer)
      })

      describe("Constructor", async function () {
        it("Min Delay is set correctly", async function () {
          const minDelayFromTimeContract = await TimeLock.getMinDelay()
          assert.equal(minDelayFromTimeContract, minDelay)
        })

        it("Governor has the proposer role", async function () {
          const proposerRole = await TimeLock.PROPOSER_ROLE()
          const hasRole = await TimeLock.hasRole(
            proposerRole,
            MyGovernor.address
          )
          assert.equal(hasRole, true)
        })

        it("Executor Role is assigned to address 0", async function () {
          const executorRole = await TimeLock.EXECUTOR_ROLE()
          const hasRole = await TimeLock.hasRole(
            executorRole,
            "0x0000000000000000000000000000000000000000"
          )
          assert.equal(hasRole, true)
        })

        it("Deployer is not admin", async function () {
          const adminRole = await TimeLock.TIMELOCK_ADMIN_ROLE()
          const hasRole = await TimeLock.hasRole(adminRole, deployer)
          assert.equal(hasRole, false)
        })
      })
    })
