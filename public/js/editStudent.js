const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const form = document.getElementById("studentForm");

// =====================
// Load Student
// =====================

async function loadStudent() {

    const response = await fetch(`${API}/${id}`);
    const student = await response.json();

    document.getElementById("name").value = student.name;
    document.getElementById("roll").value = student.roll;
    document.getElementById("course").value = student.course;
    document.getElementById("email").value = student.email;

}

// =====================
// Update Student
// =====================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const updatedStudent = {

        name: document.getElementById("name").value,
        roll: document.getElementById("roll").value,
        course: document.getElementById("course").value,
        email: document.getElementById("email").value

    };

    const response = await fetch(`${API}/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(updatedStudent)

    });

    const data = await response.json();

    if (response.ok) {

        alert(data.message);

        window.location.href = "/view-students";

    } else {

        alert(data.message);

    }

});

loadStudent();