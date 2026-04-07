function goToScanner() {
  window.location.href = "index.html";
}
const user = JSON.parse(localStorage.getItem("user"));

const text = `
Welcome, <b>${user ? user.username : "Guest"}</b> ✨<br><br>

In a world full of deception, truth hides in patterns.<br><br>

Not every link is safe.  
Not every message is real.<br><br>

But awareness is your shield ⚖️
`;

document.getElementById("welcomeText").innerHTML = text;