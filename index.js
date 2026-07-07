const express = require("express");
const path = require("path");

const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// ============================
// Middleware
// ============================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================
// Static Folder
// ============================

app.use(express.static(path.join(__dirname, "public")));

// ============================
// HTML Routes
// ============================

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

// ============================
// Student API Routes
// ============================

app.use("/api/students", studentRoutes);

// ============================
// 404 Page
// ============================

app.use((req, res) => {
    res.status(404).send("<h2>404 | Page Not Found</h2>");
});

// ============================
// Start Server
// ============================

app.listen(PORT, () => {
    console.log(`🚀 Server Running : http://localhost:${PORT}`);
});