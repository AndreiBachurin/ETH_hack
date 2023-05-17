// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

import './base/Level.sol';
import './FindMe.sol';

contract FindMeFactory is Level {

  function createInstance(address) override public payable returns (address) {
    uint16 setImmutable = uint16(uint160(tx.origin));
    bytes32[3] memory data;
    data[0] = keccak256(abi.encodePacked(tx.origin,"0"));
    data[1] = keccak256(abi.encodePacked(tx.origin,"1"));
    data[2] = keccak256(abi.encodePacked(tx.origin,"2"));
    FindMe instance = new FindMe(setImmutable, data);
    return address(instance);
  }

  function validateInstance(address payable _instance, address) override public view returns (bool) {
    FindMe findMe = FindMe(_instance);
    return findMe.isUnlock();
  }
}