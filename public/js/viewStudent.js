const table = document.getElementById("studentTable");
const search = document.getElementById("search");

let students = [];

// ======================
// Load Students
// ======================

async function loadStudents() {

    try {

        console.log("API =>", API);

        const response = await fetch(API);

        console.log("Response =>", response.status);

        if (!response.ok) {
            throw new Error("Failed to fetch students");
        }

        students = await response.json();

        console.log("Students =>", students);

        displayStudents(students);

    } catch (error) {

        console.error(error);

        table.innerHTML = `
            <tr>
                <td colspan="6" class="text-danger text-center">
                    Failed to load students
                </td>
            </tr>
        `;
    }

}

// ======================
// Display Students
// ======================

function displayStudents(data) {

    table.innerHTML = "";

    if (data.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">
                    No Students Found
                </td>
            </tr>
        `;

        return;
    }

    data.forEach(student => {

        table.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.roll}</td>
                <td>${student.course}</td>
                <td>${student.email}</td>
                <td>
                    <button class="btn btn-warning btn-sm me-2"
                        onclick="editStudent(${student.id})">
                        Edit
                    </button>

                    <button class="btn btn-danger btn-sm"
                        onclick="deleteStudent(${student.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;

    });

}

// ======================
// Search
// ======================

search.addEventListener("keyup", () => {

    const value = search.value.toLowerCase();

    const filtered = students.filter(student =>
        student.name.toLowerCase().includes(value) ||
        student.roll.toLowerCase().includes(value) ||
        student.course.toLowerCase().includes(value) ||
        student.email.toLowerCase().includes(value)
    );

    displayStudents(filtered);

});

// ======================
// Delete Student
// ======================

async function deleteStudent(id) {

    if (!confirm("Delete this student?")) return;

    const response = await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    if (response.ok) {

        alert("Student Deleted Successfully");

        loadStudents();

    }

}

// ======================
// Edit Student
// ======================

function editStudent(id) {

    window.location.href = `/edit-student?id=${id}`;

}

loadStudents();