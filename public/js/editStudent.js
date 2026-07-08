const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log("Student ID:", id);
console.log("API URL:", `${API}/${id}`);

const form = document.getElementById("editStudentForm");

// ======================
// Load Student
// ======================

async function loadStudent() {

    try {

        const response = await fetch(`${API}/${id}`);

        console.log("Response Status:", response.status);

        if (!response.ok) {

            alert("Student Not Found");
            return;

        }

        const student = await response.json();

        console.log("Student Data:", student);

        document.getElementById("name").value = student.name;
        document.getElementById("roll").value = student.roll;
        document.getElementById("course").value = student.course;
        document.getElementById("email").value = student.email;

    } catch (error) {

        console.error(error);
        alert("Error loading student.");

    }

}

// ======================
// Update Student
// ======================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const updatedStudent = {

        name: document.getElementById("name").value.trim(),
        roll: document.getElementById("roll").value.trim(),
        course: document.getElementById("course").value.trim(),
        email: document.getElementById("email").value.trim()

    };

    try {

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

    } catch (error) {

        console.error(error);
        alert("Update Failed");

    }

});

// ======================

loadStudent();