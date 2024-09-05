// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script, console2} from "forge-std/Script.sol";
import {Token} from "../src/Token.sol";
import {VendorMachine} from "../src/VendorMachine.sol";

contract Local is Script {
    Token token;
    VendorMachine vmachine;

    function setUp() public {}

    function run() public {
        vm.startBroadcast(0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80);

        // Create a new token
        token = new Token("Floripa coin", "FLN", 1000 * 10e18);
        // Create Vendor Machine
        vmachine = new VendorMachine(0.1 ether, address(token));
        // Load Vendor Machine
        token.transfer(address(vmachine), 1000 * 10e18);

        console2.log("Vendor Machine address: ", address(vmachine));
        console2.log("Token address: ", address(token));

        vm.stopBroadcast();
    }
}
