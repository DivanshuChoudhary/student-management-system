const table = document.getElementById("studentTable");
const search = document.getElementById("search");

let students = [];

// ======================
// Load Students
// ======================

async function loadStudents() {

    const response = await fetch(API);

    students = await response.json();

    displayStudents(students);

}

// ======================
// Display Students
// ======================

function displayStudents(data) {

    table.innerHTML = "";

    if (data.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="6">No Students Found</td>
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

                <button
                    class="btn btn-warning btn-sm"
                    onclick="editStudent(${student.id})">

                    Edit

                </button>

                <button
                    class="btn btn-danger btn-sm"
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

    const confirmDelete = confirm("Delete this student?");

    if (!confirmDelete) return;

    await fetch(`${API}/${id}`, {

        method: "DELETE"

    });

    loadStudents();

}

// ======================
// Edit Student
// ======================

function editStudent(id) {

    window.location.href = `/edit-student?id=${id}`;

}

// ======================

loadStudents();