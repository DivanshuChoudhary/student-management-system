const express = require("express");
const path = require("path");

const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT= process.env.PORT || 3000;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(express.static(path.join(__dirname, "public")));



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



app.use("/api/students", studentRoutes);



app.use((req, res) => {
    res.status(404).send("<h2>404 | Page Not Found</h2>");
});



app.listen(PORT, () => {
    console.log(`🚀 Server Running : http://localhost:${PORT}`);
});