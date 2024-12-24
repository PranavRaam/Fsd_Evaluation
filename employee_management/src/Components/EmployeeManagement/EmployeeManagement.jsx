import React, { useState, useEffect } from "react";
import EmployeeForm from "./EmployeeForm";
import EmployeeList from "./EmployeeList";
import "./EmployeeManagement.css";
import axios from "axios";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/employee");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const addEmployee = async (employee) => {
    try {
      const response = await axios.post("http://localhost:5000/api/employee/add", employee);
      setEmployees((prevEmployees) => [...prevEmployees, response.data]);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const deleteEmployee = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:5000/api/employee/${employeeId}`);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.employeeId !== employeeId)
      );
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Extract existing employee IDs
  const existingEmployeeIds = employees.map((employee) => employee.employeeId);

  return (
    <div className="employee-management">
      <h1>Employee Management</h1>
      <EmployeeForm addEmployee={addEmployee} existingEmployeeIds={existingEmployeeIds} />
      <EmployeeList employees={employees} deleteEmployee={deleteEmployee} />
    </div>
  );
};

export default EmployeeManagement;

