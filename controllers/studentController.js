const fs = require("fs");
const path = require("path");

const dataFile = path.join(__dirname, "../data/students.json");

// ==============================
// Read Students
// ==============================

const readStudents = () => {
    try {
        const data = fs.readFileSync(dataFile, "utf8");
        return data ? JSON.parse(data) : [];
    } catch (error) {
        return [];
    }
};

// ==============================
// Write Students
// ==============================

const writeStudents = (students) => {
    fs.writeFileSync(dataFile, JSON.stringify(students, null, 2));
};

// ==============================
// GET All Students
// ==============================

const getStudents = (req, res) => {

    const students = readStudents();

    res.status(200).json(students);

};

// ==============================
// GET Student By ID
// ==============================

const getStudentById = (req, res) => {

    const students = readStudents();

    const id = Number(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student Not Found"
        });
    }

    res.status(200).json(student);

};

// ==============================
// ADD Student
// ==============================

const addStudent = (req, res) => {

    const students = readStudents();

    let { name, roll, course, email } = req.body;

    name = name?.trim();
    roll = roll?.trim();
    course = course?.trim();
    email = email?.trim();

    if (!name || !roll || !course || !email) {

        return res.status(400).json({
            message: "All fields are required."
        });

    }

    const rollExists = students.find(student => student.roll === roll);

    if (rollExists) {

        return res.status(400).json({
            message: "Roll Number already exists."
        });

    }

    const emailExists = students.find(student => student.email === email);

    if (emailExists) {

        return res.status(400).json({
            message: "Email already exists."
        });

    }

    const newStudent = {

        id: Date.now(),

        name,

        roll,

        course,

        email

    };

    students.push(newStudent);

    writeStudents(students);

    res.status(201).json({

        message: "Student Added Successfully",

        student: newStudent

    });

};

// ==============================
// UPDATE Student
// ==============================

const updateStudent = (req, res) => {

    const students = readStudents();

    const id = Number(req.params.id);

    const index = students.findIndex(student => student.id === id);

    if (index === -1) {

        return res.status(404).json({

            message: "Student Not Found"

        });

    }

    const { name, roll, course, email } = req.body;

    const rollExists = students.find(student => student.roll === roll && student.id !== id);

    if (rollExists) {

        return res.status(400).json({
            message: "Roll Number already exists."
        });

    }

    const emailExists = students.find(student => student.email === email && student.id !== id);

    if (emailExists) {

        return res.status(400).json({
            message: "Email already exists."
        });

    }

    students[index] = {

        id,

        name,

        roll,

        course,

        email

    };

    writeStudents(students);

    res.status(200).json({

        message: "Student Updated Successfully",

        student: students[index]

    });

};

// ==============================
// DELETE Student
// ==============================

const deleteStudent = (req, res) => {

    const students = readStudents();

    const id = Number(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {

        return res.status(404).json({

            message: "Student Not Found"

        });

    }

    const updatedStudents = students.filter(student => student.id !== id);

    writeStudents(updatedStudents);

    res.status(200).json({

        message: "Student Deleted Successfully"

    });

};

// ==============================

module.exports = {

    getStudents,

    getStudentById,

    addStudent,

    updateStudent,

    deleteStudent

};