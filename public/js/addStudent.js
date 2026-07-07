const form = document.getElementById("studentForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const student = {

        name: document.getElementById("name").value,

        roll: document.getElementById("roll").value,

        course: document.getElementById("course").value,

        email: document.getElementById("email").value

    };

    const response = await fetch(API, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(student)

    });

    if(response.ok){

        alert("Student Added Successfully");

        form.reset();

    }

});