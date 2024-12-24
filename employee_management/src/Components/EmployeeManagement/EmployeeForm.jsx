import React, { useState } from 'react';

const EmployeeForm = ({ addEmployee, existingEmployeeIds }) => {
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    email: '',
    phone: '',
    department: '',
    dateOfJoining: '',
    role: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const departments = ['HR', 'Engineering', 'Marketing', 'Finance', 'Sales']; // Dynamic department options

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error on change
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.name.trim()) formErrors.name = 'Name is required.';
    if (!/^[a-zA-Z\s]+$/.test(formData.name)) formErrors.name = 'Name must only contain letters and spaces.';
    
    if (!formData.employeeId.trim()) formErrors.employeeId = 'Employee ID is required.';
    if (existingEmployeeIds.includes(formData.employeeId)) {
      formErrors.employeeId = 'Employee ID must be unique.';
    } else if (!/^[A-Za-z0-9]+$/.test(formData.employeeId)) {
      formErrors.employeeId = 'Employee ID must be alphanumeric.';
    }

    if (!formData.email.trim()) formErrors.email = 'Email is required.';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) formErrors.email = 'Invalid email format.';

    if (!formData.phone.trim()) formErrors.phone = 'Phone number is required.';
    if (!/^\d{10}$/.test(formData.phone)) formErrors.phone = 'Phone number must be 10 digits.';

    if (!formData.department) formErrors.department = 'Department is required.';

    if (!formData.dateOfJoining) formErrors.dateOfJoining = 'Date of joining is required.';
    if (new Date(formData.dateOfJoining) > new Date()) formErrors.dateOfJoining = 'Date of joining cannot be in the future.';

    if (!formData.role.trim()) formErrors.role = 'Role is required.';

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const confirmSubmit = window.confirm('Are you sure you want to add this employee?');
    if (!confirmSubmit) return;

    try {
      // Ensure the employee ID is unique before adding
      if (existingEmployeeIds.includes(formData.employeeId)) {
        setErrors({ employeeId: 'This Employee ID already exists. Please enter a unique ID.' });
        return;
      }

      addEmployee(formData); // Pass the validated data to the parent
      setSuccessMessage('Employee added successfully!');
      setFormData({
        name: '',
        employeeId: '',
        email: '',
        phone: '',
        department: '',
        dateOfJoining: '',
        role: ''
      });
    } catch (error) {
      setErrors({ form: 'Failed to add employee. Please try again.' });
    }
  };

  const handleReset = () => {
    const confirmReset = window.confirm('Are you sure you want to reset the form?');
    if (confirmReset) {
      setFormData({
        name: '',
        employeeId: '',
        email: '',
        phone: '',
        department: '',
        dateOfJoining: '',
        role: ''
      });
      setErrors({});
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

        <label>Employee ID: </label>
        <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} maxLength="10" />
        {errors.employeeId && <p style={{ color: 'red' }}>{errors.employeeId}</p>}

        <label>Email: </label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

        <label>Phone: </label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} maxLength="10" />
        {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}

        <label>Department: </label>
        <select name="department" value={formData.department} onChange={handleChange}>
          <option value="">Select a department</option>
          {departments.map((dept, idx) => (
            <option key={idx} value={dept}>{dept}</option>
          ))}
        </select>
        {errors.department && <p style={{ color: 'red' }}>{errors.department}</p>}

        <label>Date of Joining: </label>
        <input type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} max={new Date().toISOString().split('T')[0]} />
        {errors.dateOfJoining && <p style={{ color: 'red' }}>{errors.dateOfJoining}</p>}

        <label>Role: </label>
        <input type="text" name="role" value={formData.role} onChange={handleChange} />
        {errors.role && <p style={{ color: 'red' }}>{errors.role}</p>}

        <button type="submit">Submit</button>
        <button type="reset" onClick={handleReset}>Reset</button>
      </form>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errors.form && <p style={{ color: 'red' }}>{errors.form}</p>}
    </div>
  );
};

export default EmployeeForm;

