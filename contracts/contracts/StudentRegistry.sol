// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// TODO: Define the Contract

    // TODO: Create a mapping to link an address to a Student
    // mapping(address => Student) public students;

    // TODO: Define an Event that captures the new registration
    // event StudentRegistered(...);

    /**
     * @dev Register a new student
     * @param _name Name of the student
     * @param _rollNumber Roll Number of the student
     */
    function register(string memory _name, string memory _rollNumber) public {
        // TODO: Require that the student is not already registered

        // TODO: Update the mapping with the new Student data
        
        // TODO: Emit the event
    }

    /**
     * @dev Get student details
     * @param _studentAddress Address of the student
     * @return name, rollNumber
     */
    function getStudent(address _studentAddress) public view returns (string memory, string memory) {
        // TODO: Return the student details from the mapping
        return ("ReplaceMe", "000"); // Placeholder
    }
}
