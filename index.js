const express = require("express");
const path = require("path");

const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// HTML Pages
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/add-student", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "add-student.html"));
});

app.get("/view-students", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "view-student.html"));
});

app.get("/edit-student", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "edit-student.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "about.html"));
});

// Student API
app.use("/api/students", studentRoutes);

// Server
app.listen(PORT, () => {
    console.log(`✅ Server Running : http://localhost:${PORT}`);
});