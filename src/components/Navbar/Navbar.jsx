import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="logo">
        Freelancer<span>Hub</span>
      </div>

      <ul className="nav-links">

        <li>
          <a href="/">Home</a>
        </li>

        <li>
          <a href="/projects">Projects</a>
        </li>

        {!user ? (
          <>
            <li>
              <a href="/login">Login</a>
            </li>

            <li>
              <a href="/register">Register</a>
            </li>
          </>
        ) : (
          <>
            <li className="user-name">
              Hi, {user.name}
            </li>

            <li>
              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        )}

      </ul>

      <button className="post-btn">
        Post Project
      </button>

    </nav>
  );
}

export default Navbar;