// ===============================
// FreelancerHub - Main JavaScript
// ===============================

// ---------- SIGNUP ----------
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
      alert("Please fill all fields.");
      return;
    }

    const user = {
      name,
      email,
      password
    };

    localStorage.setItem("freelancerUser", JSON.stringify(user));

    alert("Account created successfully!");
    window.location.href = "login.html";
  });
}

// ---------- LOGIN ----------
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const savedUser = JSON.parse(localStorage.getItem("freelancerUser"));

    if (!savedUser) {
      alert("No account found. Please Sign Up.");
      return;
    }

    if (savedUser.email === email && savedUser.password === password) {
      localStorage.setItem("isLoggedIn", "true");
      alert("Login Successful!");
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid Email or Password.");
    }
  });
}

// ---------- DASHBOARD / PROFILE ----------
const username = document.getElementById("username");

if (username) {
  const user = JSON.parse(localStorage.getItem("freelancerUser"));

  if (user) {
    username.textContent = user.name;
  }
}

// ---------- LOGOUT ----------
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("isLoggedIn");
    alert("Logged Out Successfully!");
    window.location.href = "login.html";
  });
}

// ---------- SEARCH ----------
const searchForm = document.querySelector(".search-box");

if (searchForm) {
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const keyword = searchForm.querySelector("input").value.trim();

    if (keyword !== "") {
      window.location.href =
        "find-talent.html?search=" + encodeURIComponent(keyword);
    } else {
      window.location.href = "find-talent.html";
    }
  });
}