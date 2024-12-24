import React, { useState } from 'react';

const EmployeeList = ({ employees, deleteEmployee }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSort = (key) => {
    const order = sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortOrder(order);
  };

  const handleDepartmentFilter = (e) => {
    setDepartmentFilter(e.target.value);
  };

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedEmployee.name}?`)) {
      await deleteEmployee(selectedEmployee.employeeId);
      setSelectedEmployee(null);
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Name', 'Employee ID', 'Email', 'Phone', 'Department', 'Role'],
      ...employees.map((emp) => [
        emp.name,
        emp.employeeId,
        emp.email,
        emp.phone,
        emp.department,
        emp.role,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'employee_list.csv');
    link.click();
  };

  const filteredEmployees = employees
    .filter((employee) =>
      [employee.name, employee.email, employee.department].some((field) =>
        field.toLowerCase().includes(searchTerm)
      )
    )
    .filter((employee) =>
      departmentFilter ? employee.department === departmentFilter : true
    )
    .sort((a, b) => {
      if (!sortKey) return 0;
      const valueA = a[sortKey].toLowerCase();
      const valueB = b[sortKey].toLowerCase();
      return valueA < valueB ? (sortOrder === 'asc' ? -1 : 1) : valueA > valueB ? (sortOrder === 'asc' ? 1 : -1) : 0;
    });

  return (
    <div>
      <h2>Employee List</h2>
      <div>
        <input
          type="text"
          placeholder="Search by name, email, or department"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select onChange={handleDepartmentFilter}>
          <option value="">All Departments</option>
          {[...new Set(employees.map((e) => e.department))].map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        <button onClick={exportToCSV}>Export to CSV</button>
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name</th>
            <th>Employee ID</th>
            <th onClick={() => handleSort('email')}>Email</th>
            <th>Phone</th>
            <th onClick={() => handleSort('department')}>Department</th>
            <th onClick={() => handleSort('role')}>Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <tr
                key={employee.employeeId}
                onClick={() => handleRowClick(employee)}
                style={{
                  backgroundColor:
                    departmentFilter && employee.department === departmentFilter
                      ? '#f0f8ff'
                      : 'transparent',
                  cursor: 'pointer',
                }}
              >
                <td>{employee.name}</td>
                <td>{employee.employeeId}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.department}</td>
                <td>{employee.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {selectedEmployee && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '20px' }}>
          <h3>Employee Details</h3>
          <p><strong>Name:</strong> {selectedEmployee.name}</p>
          <p><strong>Employee ID:</strong> {selectedEmployee.employeeId}</p>
          <p><strong>Email:</strong> {selectedEmployee.email}</p>
          <p><strong>Phone:</strong> {selectedEmployee.phone}</p>
          <p><strong>Department:</strong> {selectedEmployee.department}</p>
          <p><strong>Role:</strong> {selectedEmployee.role}</p>
          <button onClick={() => setSelectedEmployee(null)}>Close</button>
          <button onClick={handleDelete} style={{ marginLeft: '10px', color: 'red' }}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;

