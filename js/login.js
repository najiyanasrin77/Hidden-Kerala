"use strict";
document.getElementById("loginform")?.addEventListener("submit", function (e) {
    e.preventDefault();
    document.querySelectorAll(".error").forEach(err => err.innerHTML = "");
    const storedUsers = localStorage.getItem("users");
    if (!storedUsers) {
        document.getElementById("error").innerHTML =
            "No registered user found. Please sign up first.";
        return;
    }
    const users = JSON.parse(storedUsers);
    const username = document.getElementById("name").value.trim();
    const password = document.getElementById("pass").value.trim();
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
        localStorage.setItem("loggedInUser", user.username);
        const redirectPage = localStorage.getItem("loginRedirect");
        if (redirectPage) {
            localStorage.removeItem("loginRedirect");
            window.location.href = redirectPage;
        }
        else {
            window.location.href = "index.html";
        }
    }
    else {
        document.getElementById("error").innerHTML =
            "Invalid username or password!";
    }
});
