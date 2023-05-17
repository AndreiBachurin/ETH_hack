// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import './base/Level.sol';
import './PredictTheFuture.sol';


contract PredictTheFutureFactory is Level {

    uint public insertCoin = 0.01 ether;

    function createInstance(address) override public payable returns (address) {
    require(msg.value >= insertCoin, "Must send at least 0.01 ETH");
    return address((new PredictTheFuture){value:msg.value}());
  }

  function validateInstance(address payable _instance, address) override public view returns (bool) {
    PredictTheFuture instance = PredictTheFuture(_instance);
    return address(instance).balance == 0;
  }
}