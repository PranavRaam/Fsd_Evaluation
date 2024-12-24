const express = require("express");
const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../Models/Employee");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const employees = await getAllEmployees();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message, details: err.details });
  }
});

router.post("/add", async (req, res) => {
  try {
    const newEmployee = await createEmployee(req.body);
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message, details: err.details });
  }
});

router.get("/:id", async (req, res) => {
  console.log("ID received:", req.params.id);
  try {
    const employee = await getEmployeeById(req.params.id);
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message, details: err.details });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedEmployee = await updateEmployee(req.params.id, req.body);
    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message, details: err.details });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Employee ID is required" });
  }

  try {
    const result = await deleteEmployee(id);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error in DELETE /:id route:", err);
    res.status(500).json({ error: err.message, details: err.details });
  }
});

module.exports = router;
