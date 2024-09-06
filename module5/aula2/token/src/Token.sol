// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {IERC20} from "./IToken.sol";

contract Token is IERC20 {
    /*
    METADATA STORAGE
    */

    string public name;

    string public symbol;

    uint8 public immutable decimals;

    /*
    ERC20 STORAGE
    */

    uint256 private _totalSupply;

    mapping(address owner => uint256 balance) private _balanceOf;

    mapping(address owner => mapping(address spender => uint256 balance)) private _allowance;

    /*
    ERC20 STORAGE LOGIC
    */

    function totalSupply() external view override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) external view override returns (uint256) {
        return _balanceOf[account];
    }

    function allowance(address owner, address spender) external view override returns (uint256) {
        return _allowance[owner][spender];
    }

    /*
    ERC20 LOGIC
    */

    function approve(address spender, uint256 amount) public virtual returns (bool) {
        _allowance[msg.sender][spender] = amount;

        emit Approval(msg.sender, spender, amount);

        return true;
    }

    function transfer(address to, uint256 amount) public virtual returns (bool) {
        _balanceOf[msg.sender] -= amount;

        // Cannot overflow because the sum of all user
        // balances can't exceed the max uint256 value.
        unchecked {
            _balanceOf[to] += amount;
        }

        emit Transfer(msg.sender, to, amount);

        return true;
    }

    function transferFrom(address from, address to, uint256 amount) public virtual returns (bool) {
        uint256 allowed = _allowance[from][msg.sender]; // Saves gas for limited approvals.

        if (allowed != type(uint256).max) {
            _allowance[from][msg.sender] = allowed - amount;
        }

        _balanceOf[from] -= amount;

        // Cannot overflow because the sum of all user
        // balances can't exceed the max uint256 value.
        unchecked {
            _balanceOf[to] += amount;
        }

        emit Transfer(from, to, amount);

        return true;
    }

    /*
    INTERNAL MINT/BURN LOGIC
    */

    function _mint(address to, uint256 amount) internal virtual {
        _totalSupply += amount;

        // Cannot overflow because the sum of all user
        // balances can't exceed the max uint256 value.
        unchecked {
            _balanceOf[to] += amount;
        }

        emit Transfer(address(0), to, amount);
    }

    function _burn(address from, uint256 amount) internal virtual {
        _balanceOf[from] -= amount;

        // Cannot underflow because a user's balance
        // will never be larger than the total supply.
        unchecked {
            _totalSupply -= amount;
        }

        emit Transfer(from, address(0), amount);
    }
}
