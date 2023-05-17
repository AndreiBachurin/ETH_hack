// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;


interface House {
    function isTopFloor(uint) external returns (bool);
}


contract Lift {
    bool public top;
    uint public floor;

    function goToFloor(uint _floor) public {
        House house = House(msg.sender);
        if (!house.isTopFloor(_floor)) {
            floor = _floor;
            top = house.isTopFloor(floor);
        }
    }
}