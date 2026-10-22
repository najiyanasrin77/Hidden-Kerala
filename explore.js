"use strict";
const backarrow = document.getElementById("backarrow");
if (backarrow) {
    backarrow.addEventListener("click", function () {
        window.location.href = "index.html";
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
    window.location.href = "explore.html";
});
// Get container
const container = document.getElementById("destinationContainer");
// Get search input
const searchInput = document.getElementById("search");
// Store JSON data
let destinations = [];
// Fetch destination data from JSON
fetch("./data/destinations.json")
    .then(response => response.json())
    .then((data) => {
    destinations = data;
    displayCards(destinations);
})
    .catch(error => {
    console.log("Error loading destinations:", error);
});
// Function to display cards
function displayCards(data) {
    // Remove existing cards
    container.innerHTML = "";
    // Create cards
    data.forEach((destination) => {
        const card = document.createElement("div");
        // Add class
        card.className = "explorechard";
        // Add ID from JSON
        card.id = destination.id;
        // Add category from JSON
        card.setAttribute("data-categories", destination.category.join(" "));
        // Add card content
        card.innerHTML = `

            <img
                src="${destination.image}"
                alt="${destination.name}"
                width="180"
                height="120"
            >

            <h3>${destination.name}</h3>

            <p>
                ${destination.description}
            </p>

            <a href="viewdetails.html?destination=${encodeURIComponent(destination.name)}">
            View Details
            </a>

        `;
        // Add card to container
        container.appendChild(card);
    });
}
// Search
searchInput.addEventListener("input", search);
function search() {
    const place = searchInput.value.toLowerCase().trim();
    const filteredDestinations = destinations.filter((destination) => {
        return destination.name
            .toLowerCase()
            .includes(place);
    });
    displayCards(filteredDestinations);
}
