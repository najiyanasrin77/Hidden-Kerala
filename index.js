"use strict";
const nextbutton = document.getElementById("nextBtn");
const container = document.querySelector(".rightcontainers");
const backbutton = document.getElementById("backBtn");
const eventnext = document.getElementById("evtnextBtn");
const eventback = document.getElementById("evtbackBtn");
const eventcontainer = document.querySelector(".eventscontainer");
const packSmartLink = document.getElementById("packSmartLink");
packSmartLink?.addEventListener("click", function (event) {
    event.preventDefault();
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        window.location.href = "plansmart.html";
    }
    else {
        localStorage.setItem("loginRedirect", "plansmart.html");
        window.location.href = "login.html";
    }
});
const myTripsLink = document.getElementById("myTripsLink");
myTripsLink?.addEventListener("click", function (event) {
    event.preventDefault();
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        window.location.href = "mytrips.html";
    }
    else {
        localStorage.setItem("loginRedirect", "mytrips.html");
        window.location.href = "login.html";
    }
});
const usernameDisplay = document.getElementById("usernameDisplay");
const logoutBtn = document.getElementById("logoutBtn");
const loginLink = document.getElementById("loginLink");
const loggedInUser = localStorage.getItem("loggedInUser");
if (loggedInUser) {
    usernameDisplay.innerHTML = `Welcome, ${loggedInUser}!`;
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
    window.location.href = "index.html";
});
let position = 0;
let eventPosition = 0;
if (nextbutton) {
    nextbutton.addEventListener("click", () => {
        if (position < 7) {
            position++;
            container.style.transform = `translateX(-${position * 300}px)`;
        }
    });
}
if (backbutton) {
    backbutton.addEventListener("click", () => {
        if (position > 0) {
            position--;
            container.style.transform =
                `translateX(-${position * 300}px)`;
        }
    });
}
if (eventnext) {
    eventnext.addEventListener("click", () => {
        if (eventPosition < 5) {
            eventPosition++;
            eventcontainer.style.transform = `translateX(-${eventPosition * 340}px)`;
        }
    });
}
if (eventback) {
    eventback.addEventListener("click", () => {
        if (eventPosition > 0) {
            eventPosition--;
            eventcontainer.style.transform =
                `translateX(-${eventPosition * 340}px)`;
        }
    });
}
