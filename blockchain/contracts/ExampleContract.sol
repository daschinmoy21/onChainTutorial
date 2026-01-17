// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ExampleContract {
    // Example state variable
    string private value;

    // Event emitted when value is updated
    event ValueUpdated(string newValue);

    // Write data to the blockchain
    function setValue(string calldata _value) external {
        value = _value;
        emit ValueUpdated(_value);
    }

    // Read data from the blockchain
    function getValue() external view returns (string memory) {
        return value;
    }
}
