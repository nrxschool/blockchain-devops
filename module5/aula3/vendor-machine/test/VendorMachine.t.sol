// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {BaseSetup} from "../test/BaseSetup.t.sol";
import {VendorMachine} from "../src/VendorMachine.sol";
import {console2} from "forge-std/Script.sol";

contract VendorMachineTest is BaseSetup {
    VendorMachine vmachine;

    function setUp() public override {
        BaseSetup.setUp();

        vm.startPrank(controller);
        // Create Vendor Machine
        // Price is 1 Token == 1 Ether
        vmachine = new VendorMachine(1 ether, address(token));
        // Load Vendor Machine
        token.transfer(address(vmachine), 1_000 * 10e18);
        vm.stopPrank();
    }

    function test_buyTokens() public {
        uint256 initialBalance = token.balanceOf(alice);
        uint256 ethAmount = 4 ether;
        console2.log("Ethers", ethAmount);

        // Alice buy tokens
        vm.startPrank(alice);
        vmachine.buyTokens{value: ethAmount}();
        vm.stopPrank();

        // Checks that Alice's token balance has increased correctly
        uint256 finalBalance = token.balanceOf(alice);
        assertEq(finalBalance, initialBalance + 4 * 10e18, "Token purchase failed");

        // Checks if the VendorMachine contract has decreased its token balance
        uint256 vendorBalance = token.balanceOf(address(vmachine));
        assertEq(vendorBalance, 1000 * 10e18 - 4 * 10e18, "Incorrect contract balance after purchase");
    }
}