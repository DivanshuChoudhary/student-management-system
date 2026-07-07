const form = document.getElementById("studentForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const student = {
        name: document.getElementById("name").value.trim(),
        roll: document.getElementById("roll").value.trim(),
        course: document.getElementById("course").value.trim(),
        email: document.getElementById("email").value.trim()
    };

    try {
        const response = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            form.reset();
        } else {
            alert(data.message);
        }

    } catch (error) {
        console.error(error);
        alert("Server Error");
    }
});