import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (!token || !savedUser) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(savedUser));
  }, [navigate]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container">

      <div className="profile-card">

        <div className="profile-avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <h1>{user.name}</h1>

        <p className="profile-role">
          {user.role}
        </p>

        <div className="profile-details">

          <div className="detail">
            <span>Name</span>
            <strong>{user.name}</strong>
          </div>

          <div className="detail">
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>

          <div className="detail">
            <span>Role</span>
            <strong>{user.role}</strong>
          </div>

        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>

      </div>

    </div>
  );
}

export default Profile;