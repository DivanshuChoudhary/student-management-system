const express = require("express");
const router = express.Router();

const {
    getStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent
} = require("../controllers/studentController");

// Get All Students
router.get("/", getStudents);

// Get Single Student
router.get("/:id", getStudentById);

// Add Student
router.post("/", addStudent);

// Update Student
router.put("/:id", updateStudent);

// Delete Student
router.delete("/:id", deleteStudent);

module.exports = router;