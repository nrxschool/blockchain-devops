// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Token} from "./Token.sol";

error InsuficientAmount();

contract VendorMachine {
    uint256 public tokensPerEth;

    Token token;

    event BuyTokens(address buyer, uint256 amountOfETH, uint256 amountOfTokens);

    constructor(uint256 price, address _token) {
        tokensPerEth = price;
        token = Token(_token);
    }

    function buyTokens() external payable returns (bool) {
        if (msg.value >= tokensPerEth) {
            uint256 amount = ((msg.value * 1 ether) / tokensPerEth);
            token.transfer(msg.sender, amount);

            return true;
        } else {
            revert InsuficientAmount();
        }
    }

    function supply() external view returns (uint256) {
        return token.balanceOf(address(this));
    }
}
