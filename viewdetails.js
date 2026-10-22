"use strict";
const backarrow = document.getElementById("backarrow");
if (backarrow) {
    backarrow.addEventListener("click", function () {
        window.location.href = "explore.html";
    });
}
const usernameDisplay = document.getElementById("usernameDisplay");
const logoutBtn = document.getElementById("logoutBtn");
const loginLink = document.getElementById("loginLink");
const loggedInUser = localStorage.getItem("loggedInUser");
if (loggedInUser) {
    usernameDisplay.innerHTML = `Hey, ${loggedInUser}!`;
    loginLink.style.display = "none";
    logoutBtn.style.display = "inline-block";
}
else {
    usernameDisplay.innerHTML = "";
    loginLink.style.display = "inline-block";
    logoutBtn.style.display = "none";
}
logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("loggedInUser");
    logoutBtn.style.display = "none";
    loginLink.style.display = "inline-block";
    window.location.href = "viewdetails.html";
});
const params = new URLSearchParams(window.location.search);
const destinationName = params.get("destination");
fetch("./data/viewdetails.json")
    .then(response => response.json())
    .then((destinations) => {
    const selectedDestination = destinations.find(item => item.destination.toLowerCase() ===
        destinationName?.toLowerCase());
    if (!selectedDestination) {
        document.body.innerHTML = "<h1>Destination not found!</h1>";
        return;
    }
    // Update destination information
    const setText = (id, value) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    };
    setText("destinationName", selectedDestination.destination);
    setText("destinationTagline", selectedDestination.category);
    setText("simpleIntro", selectedDestination.simple_intro);
    setText("heroLocation", selectedDestination.location);
    setText("heroCategory", selectedDestination.category);
    setText("heroBudget", selectedDestination.herobudget);
    setText("location", selectedDestination.location);
    setText("category", selectedDestination.category);
    setText("budget", selectedDestination.budget);
    setText("bestTime", selectedDestination.best_time_to_visit);
    setText("duration", selectedDestination.recommended_duration);
    setText("aboutDestinationName", selectedDestination.about_destination_name);
    setText("heavyIntroduction", selectedDestination.heavy_introduction);
    setText("moreAboutName", selectedDestination.more_name);
    setText("moreAboutText", selectedDestination.heavy_introduction);
    const heroImage = document.getElementById("heroImage");
    if (heroImage) {
        heroImage.style.backgroundImage = `
        linear-gradient(
            to right,
            #010600fe,
            #071a01dd 25%,
            #071a01db 45%,
            #05130160 70%,
            #f1f4f000 100%
        ),
        url("${selectedDestination.images.hero}")`;
    }
    const image1 = document.getElementById("image1");
    const image2 = document.getElementById("image2");
    const image3 = document.getElementById("image3");
    if (image1)
        image1.src = selectedDestination.images.gallery[0];
    if (image2)
        image2.src = selectedDestination.images.gallery[1];
    if (image3)
        image3.src = selectedDestination.images.gallery[2];
    // Display things to do
    const todoList = document.getElementById("todoList");
    if (todoList) {
        todoList.innerHTML = "";
        selectedDestination.to_do_list.forEach(activity => {
            const li = document.createElement("li");
            li.textContent = `☑ ${activity}`;
            todoList.appendChild(li);
        });
    }
})
    .catch(error => {
    console.error("Error loading destination details:", error);
});
