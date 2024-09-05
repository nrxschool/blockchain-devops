// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Token} from "../src/Token.sol";
import {Utils} from "./Utils.t.sol";



contract BaseSetup is Utils {
    Token token;

    address[] _users;
    address controller;
    address alice;
    address bob;
    address zero;

    function setUp() public virtual {
        _users = createUsers(3);

        controller = _users[0];
        alice = _users[1];
        bob = _users[2];
        zero = address(0x0);

        vm.label(controller, "CONTROLLER");
        vm.label(alice, "ALICE");
        vm.label(bob, "BOB");
        vm.label(zero, "ZERO");

        vm.startPrank(controller);
        token = new Token("Floripa coin", "FLN", 1000 * 10e18);
        vm.stopPrank();
    }

    function test_basesetup_just_for_pass_in_converage() public {}
}
