let form = document.querySelector('form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.querySelector('input[type="text"]').value;
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    // Save in browser
    localStorage.setItem("user", JSON.stringify({
        username,
        email,
        password
    }));

    alert("✨ Signup successful!");

    // Redirect to login
    window.location.href = "login.html";
});