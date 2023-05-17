const LendingPoolFactory = artifacts.require('./levels/LendingPoolFactory.sol');
const LendingPool = artifacts.require('./levels/LendingPool.sol');
const LendingPoolAttack = artifacts.require('../../contracts/attacks/LendingPoolAttack.sol');
const utils = require('../utils/TestUtils');

contract('LendingPool', function (accounts) {
    let ethernaut;
    let level;
    let player = accounts[0];

    before(async function () {
        ethernaut = await utils.getEthernautWithStatsProxy();
        level = await LendingPoolFactory.new();
        await ethernaut.registerLevel(level.address);
    });

    it('should allow the player to solve the level', async function () {
        const insertCoin = web3.utils.fromWei(
            (await level.insertCoin.call()).toString(),
            'ether'
        );
    
        const instance = await utils.createLevelInstance(
            ethernaut,
            level.address,
            player,
            LendingPool,
            { from: player, value: web3.utils.toWei(insertCoin, 'ether') }
        );

        let instanceBalance = await utils.getBalance(web3, instance.address);
        assert.equal(instanceBalance, insertCoin);

        const attacker = await LendingPoolAttack.new(instance.address);
        await attacker.callPool();

        instanceBalance = await utils.getBalance(web3, instance.address);
        assert.equal(instanceBalance, 0);

        const completed = await utils.submitLevelInstance(
            ethernaut,
            level.address,
            instance.address,
            player
        );
        assert.equal(completed, true);
    })
});