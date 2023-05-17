const FindMeFactory = artifacts.require('./levels/FindMeFactory.sol');
const FindMe = artifacts.require('./levels/FindMe.sol');

//const Ethernaut = artifacts.require('./Ethernaut.sol');
const {
  //BN,
  // constants,
  // expectEvent,
  expectRevert,
} = require('openzeppelin-test-helpers');
const utils = require('../utils/TestUtils');
//const { ethers, upgrades } = require('hardhat');

contract('FindMe', function (accounts) {
  let ethernaut;
  let level;
  let instance;
  let player = accounts[0];

  before(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy();
    level = await FindMeFactory.new();
    await ethernaut.registerLevel(level.address);
    instance = await utils.createLevelInstance(
      ethernaut,
      level.address,
      player,
      FindMe,
      { from: player, value: web3.utils.toWei('1', 'ether') }
    );
  });

  describe('instance', function () {
    it('should start locked', async function () {
      assert.equal(await instance.isUnlock(), false);
    });

    it('should not unlock with any key', async function () {
      await expectRevert.unspecified(instance.unLock('0x123'));
    });

    it('should unlock with the proper key', async function () {
      // Read storage.
    //   for (let i = 0; i < 6; i++) {
    //     console.log(await web3.eth.getStorageAt(instance.address, i));
    //   }

    //   // Read contract storage.
      const dataEntry = await web3.eth.getStorageAt(instance.address, 4);
      //console.log("data entry " + dataEntry)
      const key = '0x' + dataEntry.substring(2, 34);

      // Unlock.
      await instance.unLock(key);
      assert.equal(await instance.isUnlock(), true);

      // Factory check (should pass)
      const completed = await utils.submitLevelInstance(
        ethernaut,
        level.address,
        instance.address,
        player
      );
      assert.equal(completed, true);
    });
  });
});