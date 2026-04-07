let form = document.querySelector('form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
        alert("🔐 Login successful!");

        // Redirect to dashboard
        window.location.href = "../dashboard.html";
    } else {
        alert("❌ Invalid credentials");
    }
});