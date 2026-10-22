"use strict";
document.getElementById("registerform")?.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;
    document.querySelectorAll(".error").forEach(err => err.innerHTML = "");
    const username = document.getElementById("username").value.trim();
    const phonenumber = document.getElementById("phoneno").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("cnfrmpassword").value.trim();
    const user = {
        username: username,
        phone: phonenumber,
        email: email,
        password: password
    };
    // Username
    if (username === "" || username.length < 3) {
        document.getElementById("nameError").innerHTML =
            "Name must contain at least 3 characters";
        isValid = false;
    }
    // Phone number
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phonenumber)) {
        document.getElementById("phoneError").innerHTML =
            "Phone number must contain 10 digits";
        isValid = false;
    }
    // Email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        document.getElementById("emailError").innerHTML =
            "Enter a valid email address";
        isValid = false;
    }
    // Password
    if (password.length < 8) {
        document.getElementById("passwordError").innerHTML =
            "Password must contain at least 8 characters";
        isValid = false;
    }
    // Confirm password
    if (password !== confirmPassword) {
        document.getElementById("confirmPasswordError").innerHTML =
            "The passwords do not match. Please re-enter";
        isValid = false;
    }
    if (isValid) {
        const existingUsers = localStorage.getItem("users");
        let users = existingUsers ? JSON.parse(existingUsers) : [];
        const emailExists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (emailExists) {
            document.getElementById("emailError").innerHTML =
                "This email is already registered. Please try logging in.";
            return;
        }
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        window.location.href = "login.html";
    }
});
