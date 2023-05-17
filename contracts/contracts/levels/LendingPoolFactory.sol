// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import './base/Level.sol';
import './LendingPool.sol';


contract LendingPoolFactory is Level {

    uint public insertCoin = 0.1 ether;

    function createInstance(address) override public payable returns (address) {
    require(msg.value >= insertCoin, "Must send at least 0.1 ETH");
    return address((new LendingPool){value: msg.value}());
  }

    function validateInstance(address payable _instance, address) override public view returns (bool) {
        LendingPool instance = LendingPool(_instance);
        return address(instance).balance == 0;
    }
}