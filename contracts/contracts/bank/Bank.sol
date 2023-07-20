// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Bank {
    struct Account {
        uint256 balance;
        string name;
        string email;
        bool exists;
    }
    bool internal locked;

    address public immutable owner;
    uint256 public constant minimumDeposit = 0.01 ether;

    mapping(address => Account) accounts;

    /**
     * @notice This modifier prevents the account from being vunerable to reentrancy attacks

     */
    modifier noRentrancy() {
        require(!locked, "No reentrancy");
        locked = true;
        _;
        locked = false;
    }
    /**
     * @notice This modifier ensures that only the address defined as the owner can call certain methods

     */
    modifier onlyBankOwner() {
        require(
            msg.sender == owner,
            "Only Owner can access total bank balance"
        );
        _;
    }
    /**
     * @notice This modifier ensures that only account owners can call certain functions e.g withdraw

     */
    modifier onlyAccountOwners() {
        require(
            accounts[msg.sender].exists,
            "This address does not have an account"
        );
        _;
    }
    /**
     * @notice This modifier ensures that an accountOwner cannot withraw above the amount in his/her account

     */
    modifier haveSufficientFunds(address payable _user, uint256 _amount) {
        require(accounts[_user].balance > _amount, "Insufficient funds");
        _;
    }

    /**
     * @notice This is the function that will be called when the contract is deployed

     */
    constructor(address _owner) payable {
        owner = _owner;
    }

    /**
     * @notice This function returns the amount of ether in the contract(bank) and can only be called by the bank ownner
    

     */
    function getTotalBankBalance() public view onlyBankOwner returns (uint256) {
        return address(this).balance;
    }

    /**
     * @notice This function returns the account balance of a user and can only be called by an account ownner
    

     */
    function getAccountBalance()
        public
        view
        onlyAccountOwners
        returns (uint256)
    {
        return accounts[msg.sender].balance;
    }

    /**
     * @notice This function enables an address(user) to create a new account provided the minimum deposit is met
    

     */
    function createAccount(
        string memory _email,
        string memory _name
    ) public payable {
        require(
            msg.value >= minimumDeposit,
            "The amount is less than the miminmum deposit"
        );
        require(
            accounts[msg.sender].exists == false,
            "This Account already exists"
        );

        accounts[msg.sender] = Account({
            exists: true,
            balance: msg.value,
            email: _email,
            name: _name
        });
    }

    /**
     * @notice This function enables ether to be deposited to an account and called be called only within the contract
    

     */

    function deposit(address _userAddress) internal {
        accounts[_userAddress].balance += msg.value;
    }

    /**
     * @notice This function allows account owners to deposit into the accounts of other owners from their own account provided they have sufficient funds

     */

    function depositIntoAnotherAccount(
        address _userAddress
    )
        public
        payable
        onlyAccountOwners
        haveSufficientFunds(payable(msg.sender), msg.value)
    {
        require(
            _userAddress != msg.sender,
            "Cannot deposit into your own account with this function"
        );
        deposit(_userAddress);
        accounts[msg.sender].balance -= msg.value;
    }

    /**
     * @notice This function allows an account owner to deposit into their account
    

     */
    function depositIntoMyAccount() public payable onlyAccountOwners {
        deposit(msg.sender);
    }

    /**
     * @notice This function enables an account owner to withraw a specified amount from their bank account, the function is also protected against reentrancy attacks
    

     */
    function withdraw(
        address payable _to,
        uint256 _amount
    ) public onlyAccountOwners haveSufficientFunds(_to, _amount) noRentrancy {
        accounts[_to].balance -= _amount;

        (bool sent, ) = _to.call{value: _amount}("");
        require(sent, "Transfer Failed");
    }

    // The functions below are called when ether is sent to the contract in this case the bank contract
    receive() external payable {}

    fallback() external payable {}
}
