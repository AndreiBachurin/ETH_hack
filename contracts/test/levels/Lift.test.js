const LiftFactory = artifacts.require('./levels/LiftFactory.sol');
const Lift = artifacts.require('./levels/Lift.sol');
const LiftAttack = artifacts.require('../../contracts/attacks/LiftAttack.sol');
const utils = require('../utils/TestUtils');

contract('Lift', function (accounts) {
  let ethernaut;
  let level;
  //let owner = accounts[1];
  let player = accounts[0];

  before(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy();
    level = await LiftFactory.new();
    await ethernaut.registerLevel(level.address);
  });

  it('should fail if the player didnt solve the level', async function () {
    const instance = await utils.createLevelInstance(
      ethernaut,
      level.address,
      player,
      Lift
    );
    const completed = await utils.submitLevelInstance(
      ethernaut,
      level.address,
      instance.address,
      player
    );

    assert.isFalse(completed);
  });

  it('should allow the player to solve the level', async function () {
    const instance = await utils.createLevelInstance(
      ethernaut,
      level.address,
      player,
      Lift
    );

    const attacker = await LiftAttack.new(instance.address);
    await attacker.callLift(7);

    const completed = await utils.submitLevelInstance(
      ethernaut,
      level.address,
      instance.address,
      player
    );

    assert.isTrue(completed);
  });
});