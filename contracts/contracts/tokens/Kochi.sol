// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
// import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; // not needed cos capped is based, invesigate further though
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract Kochi is ERC20Capped, ERC20Burnable {
    address payable public immutable owner;
    uint256 public blockReward;

    constructor(
        uint256 cap,
        uint256 _blockReward
    ) ERC20("Kochi", "KC") ERC20Capped(cap * (10 ** decimals())) {
        owner = payable(msg.sender);
        _mint(owner, 70 * (10 ** decimals()));
        blockReward = _blockReward * (10 ** decimals());
    }

    function _mint(
        address account,
        uint256 amount
    ) internal virtual override(ERC20Capped, ERC20) {
        require(
            ERC20.totalSupply() + amount <= cap(),
            "ERC20Capped: cap exceeded"
        );
        super._mint(account, amount);
    }

    function _mintMinerReward() internal {
        _mint(block.coinbase, blockReward);
    }

    function setBlockReward(uint256 amount) public onlyOwner {
        blockReward = amount * (10 ** decimals());
    }

    // function destroy() public onlyOwner {
    //     selfdestruct(owner); //TODO: not being used , depracted, so find the alternative or why
    // }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        if (
            from != address(0) &&
            to != block.coinbase &&
            block.coinbase != address(0)
        ) {
            _mintMinerReward();
        }
        super._beforeTokenTransfer(from, to, amount);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
}
