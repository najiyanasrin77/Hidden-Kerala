"use strict";
const forestcards = document.querySelector(".forestcards");
const backarrow = document.getElementById("backarrow");
if (backarrow) {
    backarrow.addEventListener("click", function () {
        window.location.href = "explore.html";
    });
}
async function loadforestCards() {
    const response = await fetch("data/destinations.json");
    const destinations = await response.json();
    destinations.forEach((destination) => {
        console.log(destination.name);
        console.log(destination.category);
        if (destination.category.includes("forest")) {
            const card = document.createElement("div");
            card.className = "explorechard";
            card.id = destination.id;
            card.innerHTML = `<img
                    src="${destination.image}"
                    width="180"
                    height="120">

                <h3>${destination.name}</h3>

                <p>
                    ${destination.description}
                </p>

                <a href="viewdetails.html?destination=${encodeURIComponent(destination.name)}">
                View Details
                </a>

            `;
            forestcards.appendChild(card);
        }
    });
}
loadforestCards();
