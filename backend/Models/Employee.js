const pool = require("../config/db").pool;

const createEmployee = async (employeeData) => {
  const {
    name,
    employeeId,
    email,
    phone,
    department,
    dateOfJoining,
    role,
  } = employeeData;

  const query = `
    INSERT INTO employee (name, employeeId, email, phone, department, dateOfJoining, role)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [name, employeeId, email, phone, department, dateOfJoining, role];

  try {
    const [result] = await pool.execute(query, values);
    if (result.affectedRows > 0) {
      return { message: 'Employee added successfully', employeeId: result.insertId };
    } else {
      throw new Error('Failed to add employee');
    }
  } catch (error) {
    console.error("Error in createEmployee:", error);
    throw { message: 'Failed to add employee', details: error.message };
  }
};

const getAllEmployees = async () => {
  const query = "SELECT * FROM employee";
  try {
    const [rows] = await pool.execute(query);
    return rows;
  } catch (error) {
    console.error("Error in getAllEmployees:", error);
    throw { message: 'Failed to fetch employees', details: error.message };
  }
};

const getEmployeeById = async (id) => {
  const query = "SELECT * FROM employee WHERE employeeId = ?";
  try {
    const [rows] = await pool.execute(query, [id]);
    if (rows.length === 0) {
      throw new Error('Employee not found');
    }
    return rows[0];
  } catch (error) {
    console.error("Error in getEmployeeById:", error);
    throw { message: 'Failed to fetch employee', details: error.message };
  }
};

const updateEmployee = async (id, employeeData) => {
  const {
    name,
    employeeId,
    email,
    phone,
    department,
    dateOfJoining,
    role,
  } = employeeData;

  const query = `
    UPDATE employee
    SET name = ?, employeeId = ?, email = ?, phone = ?, department = ?, dateOfJoining = ?, role = ?
    WHERE id = ?
  `;
  const values = [name, employeeId, email, phone, department, dateOfJoining, role, id];

  try {
    const [result] = await pool.execute(query, values);
    if (result && result.affectedRows > 0) {
      return { message: 'Employee updated successfully' };
    } else {
      throw new Error('Failed to update employee');
    }
  } catch (error) {
    console.error("Error in updateEmployee:", error);
    throw { message: 'Failed to update employee', details: error.message };
  }
};

const deleteEmployee = async (id) => {
  const query = "UPDATE employee SET deleted = true WHERE employeeId = ?";
  try {
    const [result] = await pool.execute(query, [id]);
    if (result.affectedRows > 0) {
      return { message: "Employee marked as deleted successfully" };
    } else {
      throw new Error("No employee found with the given ID");
    }
  } catch (error) {
    console.error("Error in deleteEmployee:", error);
    throw { message: "Failed to delete employee", details: error.message };
  }
};



//  //const query = "DELETE FROM employee WHERE employeeId = ?";
//  try {
//    const [result] = await pool.execute(query, [id]);
//    if (result && result.affectedRows > 0) {
//      return { message: 'Employee deleted successfully' };
//    } else {
//      throw new Error('No rows affected, employee ID may not exist');
//    }
//  } catch (error) {
//    console.error("Error in deleteEmployee:", error);
//    throw { message: 'Failed to delete employee', details: error.message };
//  }
//};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
