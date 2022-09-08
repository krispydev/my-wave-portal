// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {

    uint256 totalWaves;

    event NewWave(address indexed from, uint timestamp, string message);

    struct Wave{
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] wavers;

    constructor() payable {
        console.log("Here we go again.");
    }

    function wave(string memory _message) public {
        totalWaves += 1;
        console.log("%s has waved", msg.sender);
        wavers.push(Wave(msg.sender, _message, block.timestamp));
        emit NewWave(msg.sender, block.timestamp, _message);

        uint256 toSend = 0.0001 ether;

        require(toSend < address(this).balance, "Chris is out of funds. He has to recharge his wallet.");
        (bool success, ) = (msg.sender).call{value: toSend}(""); // this is where ETH is sent
        require(success, "Failed to send ether."); // this tells us whether it was successful or not
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return wavers;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("Total no. of wavers: ", totalWaves);
        return totalWaves;
    }
}
