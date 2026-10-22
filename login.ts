document.getElementById("loginform")?.addEventListener("submit", function(e) {
    e.preventDefault();

    document.querySelectorAll(".error").forEach(err => err.innerHTML = "");

    const storedUsers = localStorage.getItem("users");

    if (!storedUsers) {
        (document.getElementById("error") as HTMLParagraphElement).innerHTML =
            "No registered user found. Please sign up first.";
        return;
    }

    const users = JSON.parse(storedUsers);

    const username =
        (document.getElementById("name") as HTMLInputElement).value.trim();

    const password =
        (document.getElementById("pass") as HTMLInputElement).value.trim();

    const user = users.find(
        (u: any) => u.username === username && u.password === password
    );

    if (user) {

        localStorage.setItem("loggedInUser", user.username);

        const redirectPage = localStorage.getItem("loginRedirect");

        if (redirectPage) {
            localStorage.removeItem("loginRedirect");
            window.location.href = redirectPage;
        } else {
            window.location.href = "index.html";
        }

    } else {

        (document.getElementById("error") as HTMLParagraphElement).innerHTML =
            "Invalid username or password!";

    }
});