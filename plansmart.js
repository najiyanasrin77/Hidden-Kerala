"use strict";
const form = document.getElementById("packingForm");
const destination = document.getElementById("destination");
const duration = document.getElementById("duration");
const tripType = document.getElementById("tripType");
const weather = document.getElementById("weather");
const packingList = document.getElementById("packingList");
const destierror = document.getElementById("destierror");
const durationerror = document.getElementById("durationerror");
const triperror = document.getElementById("triperror");
const weathererror = document.getElementById("weathererror");
const saveTripbtn = document.getElementById("saveTripbtn");
let packingItems = [];
form.addEventListener("submit", function (event) {
    event.preventDefault();
    document.querySelectorAll(".error").forEach(err => err.innerHTML = "");
    let isValid = true;
    const selectedDestination = destination.value;
    const selectedDuration = duration.value;
    const selectedTripType = tripType.value;
    const selectedWeather = weather.value;
    console.log(selectedDestination);
    console.log(selectedDuration);
    console.log(selectedTripType);
    console.log(selectedWeather);
    if (selectedDestination === "") {
        destierror.innerHTML = "please select a destination";
        isValid = false;
    }
    if (Number(selectedDuration) <= 0) {
        durationerror.innerHTML = "please enter a valid duration";
        isValid = false;
    }
    if (selectedTripType === "") {
        triperror.innerHTML = "please select a tripType";
        isValid = false;
    }
    if (selectedWeather === "") {
        weathererror.innerHTML = "please select a weather";
        isValid = false;
    }
    let items = [];
    items.push("Clothes");
    items.push("Socks");
    items.push("ToothBrush");
    items.push("ToothPaste");
    items.push("Phone Charger");
    if (selectedTripType === "adventure") {
        items.push("Trekking Shoes");
        items.push("Backpack");
        items.push("Water Bottle");
        items.push("First Aid Kit");
    }
    else if (selectedTripType === "beach") {
        items.push("Swimwear");
        items.push("Sunglasses");
        items.push("Sunscreen");
        items.push("Beach Towel");
    }
    else if (selectedTripType === "nature") {
        items.push("Binoculars");
        items.push("Comfortable Shoes");
        items.push("Water Bottle");
        items.push("Mosquito Repellent");
    }
    else if (selectedTripType === "family") {
        items.push("Snacks");
        items.push("First Aid Kit");
        items.push("Extra Clothes");
    }
    else if (selectedTripType === "solo") {
        items.push("Power Bank");
        items.push("Small Backpack");
        items.push("Personal Documents");
        items.push("pepper spray");
        items.push("First Aid Kit");
    }
    if (selectedWeather === "rainy") {
        items.push("Umbrella");
        items.push("Rain coat");
    }
    else if (selectedWeather === "sunny") {
        items.push("Umbrella");
        items.push("Hat");
        items.push("Sunscreen");
        items.push("Sunglasses");
    }
    else if (selectedWeather === "cool") {
        items.push("Jacket");
        items.push("Warm Clothes");
        items.push("Sweater");
        items.push("full pants");
        items.push("Socks");
        items.push("Comfortable shoes");
        items.push("Moisturizer");
    }
    else if (selectedWeather === "humid") {
        items.push("Light Cotton Clothes");
        items.push("Extra Clothes");
        items.push("Sunscreen");
        items.push("Water Bottle");
        items.push("Towel");
        items.push("Deodorant");
        items.push("Comfortable Sandals");
    }
    if (selectedDestination === "varkala") {
        items.push("Beach Wear");
        items.push("Flip Flop");
        items.push("Sunscreen ");
        items.push("Sunglasses");
    }
    else if (selectedDestination === "Ranipuram") {
        items.push("Trecking Shoes");
        items.push("Jacket");
        items.push("Water Bottle ");
        items.push("Cap");
    }
    else if (selectedDestination === "athirappally") {
        items.push("Comfortable Shoes");
        items.push("Umbrella");
        items.push("Raincoat");
        items.push("Water Bottle");
        items.push("Extra Clothes");
        items.push("Towel");
        items.push("Small Bacpack");
    }
    else if (selectedDestination === "munnar") {
        items.push("Comfortable Shoes");
        items.push("Warm Clothes");
        items.push("Jacket");
    }
    else if (selectedDestination === "alapuzha") {
        items.push("Light Clothes");
        items.push("Sunscreen");
        items.push("Sunglasses");
    }
    else if (selectedDestination === "kochi") {
        items.push("Comfortable Footwear");
        items.push("Light Cotton Clothes");
        items.push("Sunscreen");
        items.push("Sunglasses");
        items.push("Water Bottle");
        items.push("Cap");
        items.push("Small Bacpack");
        items.push("Power Bank");
    }
    else if (selectedDestination === "wayanad") {
        items.push("Trecking Shoes");
        items.push("Mosquito Repellent");
        items.push("Water Bottle");
    }
    else if (selectedDestination === "vagamon") {
        items.push("Trecking Shoes");
        items.push("Rain Coat");
        items.push("Water Bottle");
        items.push("Jacket");
    }
    else if (selectedDestination === "gavi") {
        items.push("Trecking Shoes");
        items.push("Mosquito Repellent");
        items.push("Water Bottle");
        items.push("Torch");
    }
    else if (selectedDestination === "thenmala") {
        items.push("Trecking Shoes");
        items.push("Mosquito Repellent");
        items.push("Water Bottle");
        items.push("Cap");
    }
    const days = Number(selectedDuration);
    items.push(`Clothes = ${days} sets`);
    items.push(`Socks = ${days}-${days + 1} pairs`);
    if (!isValid) {
        return;
    }
    packingItems = [...new Set(items)];
    packingList.innerHTML = ` 
        <h2>Your Packing List</h2>

        <ul>
            ${packingItems.map(item => `<li><input type="checkbox">${item}</li>`).join("")}
        </ul>
    `;
});
saveTripbtn.addEventListener("click", function () {
    console.log("Save Trip Clicked");
    if (destination.value === "" ||
        duration.value === "" ||
        tripType.value === "" ||
        weather.value === "") {
        alert("Please complete your trip details before saving.");
        return;
    }
    if (packingItems.length === 0) {
        alert("Please generate your packing list first.");
        return;
    }
    const loggedInUser = localStorage.getItem("loggedInUser");
    const trip = {
        username: loggedInUser,
        destination: destination.value,
        duration: duration.value,
        tripType: tripType.value,
        weather: weather.value,
        items: packingItems
    };
    console.log(trip);
    const savedTrips = localStorage.getItem("myTrips");
    let trips = savedTrips ? JSON.parse(savedTrips) : [];
    trips.push(trip);
    localStorage.setItem("myTrips", JSON.stringify(trips));
    console.log(trips);
    window.location.href = "mytrips.html";
});
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
    window.location.href = "plansmart.html";
});
