const regEmail = document.getElementById('regEmail');
const regPassword = document.getElementById('regPassword');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const message = document.getElementById('message');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const tabs = document.querySelectorAll('.tab');

// Toggle between Login and Register
function toggleAuth(type) {
    if (type === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    } else {
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
        tabs[0].classList.remove('active');
        tabs[1].classList.add('active');
    }
    message.innerText = '';
}

// API functions
async function register() {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: regEmail.value,
      password: regPassword.value
    })
  });

  message.innerText = res.ok ? "Registration successful" : "Registration failed";
}

async function login() {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: loginEmail.value,
      password: loginPassword.value
    })
  });

  if (res.ok) {
    const user = await res.json();
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "portfolio.html";
  } else {
    message.innerText = "Invalid login credentials";
  }
}

// Make functions global
window.toggleAuth = toggleAuth;
window.register = register;
window.login = login;
