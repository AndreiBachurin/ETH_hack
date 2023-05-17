// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import './base/Level.sol';
import './Lift.sol';


contract LiftFactory is Level {

    function createInstance(address) override public payable returns (address) {
        Lift instance = new Lift();
        return address(instance);
    }

    function validateInstance(address payable _instance, address) override public view returns (bool) {
        Lift lift = Lift(_instance);
        return lift.top();
    }
}