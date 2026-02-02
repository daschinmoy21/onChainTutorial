// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRegistry {
    // Define the Student struct
    struct Student {
        string name;
        string rollNumber;
        bool isRegistered;
    }

    // Create a mapping to link an address to a Student
    mapping(address => Student) public students;

    // Define an Event that captures the new registration
    event StudentRegistered(address indexed studentAddress, string name, string rollNumber);

    /**
     * @dev Register a new student
     * @param _name Name of the student
     * @param _rollNumber Roll Number of the student
     */
    function register(string memory _name, string memory _rollNumber) public {
        // Require that the student is not already registered
        require(!students[msg.sender].isRegistered, "Student already registered");
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_rollNumber).length > 0, "Roll number cannot be empty");

        // Update the mapping with the new Student data
        students[msg.sender] = Student({
            name: _name,
            rollNumber: _rollNumber,
            isRegistered: true
        });
        
        // Emit the event
        emit StudentRegistered(msg.sender, _name, _rollNumber);
    }

    /**
     * @dev Get student details
     * @param _studentAddress Address of the student
     * @return name, rollNumber
     */
    function getStudent(address _studentAddress) public view returns (string memory, string memory) {
        // Return the student details from the mapping
        Student memory student = students[_studentAddress];
        return (student.name, student.rollNumber);
    }
}
