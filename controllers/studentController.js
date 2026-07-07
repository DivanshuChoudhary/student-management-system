const fs = require("fs");
const path = require("path");

const dataFile = path.join(__dirname, "../data/students.json");

// Read Data
const readStudents = () => {
    const data = fs.readFileSync(dataFile, "utf-8");

    if (!data) return [];

    return JSON.parse(data);
};

// Write Data
const writeStudents = (students) => {
    fs.writeFileSync(dataFile, JSON.stringify(students, null, 2));
};

// ==========================
// GET All Students
// ==========================

const getStudents = (req, res) => {

    const students = readStudents();

    res.status(200).json(students);

};

const getStudentById = (req, res) => {

    const students = readStudents();

    const id = Number(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {

        return res.status(404).json({
            message: "Student Not Found"
        });

    }

    res.json(student);

};

// ==========================
// ADD Student
// ==========================

const addStudent = (req, res) => {

    const students = readStudents();

    const {

        name,
        roll,
        course,
        email

    } = req.body;

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

// ==========================
// UPDATE Student
// ==========================

const updateStudent = (req, res) => {

    const students = readStudents();

    const id = Number(req.params.id);

    const index = students.findIndex(student => student.id === id);

    if (index === -1) {

        return res.status(404).json({

            message: "Student Not Found"

        });

    }

    students[index] = {

        ...students[index],

        ...req.body,

        id

    };

    writeStudents(students);

    res.json({

        message: "Student Updated Successfully",

        student: students[index]

    });

};

// ==========================
// DELETE Student
// ==========================

const deleteStudent = (req, res) => {

    const students = readStudents();

    const id = Number(req.params.id);

    const filteredStudents = students.filter(student => student.id !== id);

    writeStudents(filteredStudents);

    res.json({

        message: "Student Deleted Successfully"

    });

};



module.exports = {

    getStudents,

    addStudent,

    updateStudent,

    deleteStudent

};