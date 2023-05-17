// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


abstract contract Level {
  function createInstance(address _player) virtual public payable returns (address);
  function validateInstance(address payable _instance, address _player) virtual public returns (bool);
}
