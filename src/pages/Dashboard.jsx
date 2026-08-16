import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // Client projects
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [contracts, setContracts] = useState([]);
const [contractsLoading, setContractsLoading] = useState(true);

  // Freelancer bids
  const [myBids, setMyBids] = useState([]);
  const [bidsLoading, setBidsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    // Login check
    if (!token || !savedUser) {
      navigate("/login");
      return;
    }

    const currentUser = JSON.parse(savedUser);

    setUser(currentUser);
// Fetch My Contracts
fetch(
  `http://localhost:5000/api/contracts/user/${currentUser.id}`
)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch contracts");
    }

    return response.json();
  })
  .then((data) => {
    console.log("MY CONTRACTS:", data);
    setContracts(data);
  })
  .catch((error) => {
    console.error("Contracts Error:", error);
  })
  .finally(() => {
    setContractsLoading(false);
  });
    // ==========================================
    // CLIENT → FETCH MY PROJECTS
    // ==========================================

    if (currentUser.role === "client") {
      fetch(
        `http://localhost:5000/api/projects/client/${currentUser.id}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch projects");
          }

          return response.json();
        })
        .then((data) => {
          console.log("MY PROJECTS:", data);

          setProjects(data);
        })
        .catch((error) => {
          console.error(
            "Dashboard Projects Error:",
            error
          );
        })
        .finally(() => {
          setLoadingProjects(false);
        });
    } else {
      setLoadingProjects(false);
    }

    // ==========================================
    // FREELANCER → FETCH MY BIDS
    // ==========================================

    if (currentUser.role === "freelancer") {
      fetch(
        `http://localhost:5000/api/bids/freelancer/${currentUser.id}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch bids");
          }

          return response.json();
        })
        .then((data) => {
          console.log("MY BIDS:", data);

          setMyBids(data);
        })
        .catch((error) => {
          console.error(
            "My Bids Error:",
            error
          );
        })
        .finally(() => {
          setBidsLoading(false);
        });
    } else {
      setBidsLoading(false);
    }

  }, [navigate]);

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dashboard">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="dashboard-header">

        <div>
          <h1>
            Welcome, {user.name} 👋
          </h1>

          <p>
            Welcome to your FreelancerHub Dashboard
          </p>
        </div>

        <button onClick={handleLogout}>
          Logout
        </button>

      </div>


      {/* ======================================
          PROFILE
      ====================================== */}

      <div className="profile-card">

        <h2>My Profile</h2>

        <p>
          <strong>Name:</strong>{" "}
          {user.name}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {user.email}
        </p>

        <p>
          <strong>Role:</strong>{" "}
          {user.role}
        </p>

      </div>


      {/* ======================================
          CLIENT → MY PROJECTS
      ====================================== */}

      {user.role === "client" && (

        <div className="my-projects-section">

          <div className="section-header">

            <div>
              <h2>My Projects</h2>

              <p>
                Projects posted by you
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/projects")
              }
            >
              Browse Projects
            </button>

          </div>


          {/* Loading */}

          {loadingProjects ? (

            <p>
              Loading your projects...
            </p>

          ) : projects.length === 0 ? (

            /* No Projects */

            <div className="empty-projects">

              <h3>
                No projects yet
              </h3>

              <p>
                You haven't posted any projects.
              </p>

            </div>

          ) : (

            /* Projects */

            <div className="projects-grid">

              {projects.map((project) => (

                <div
                  className="dashboard-project-card"
                  key={project._id}
                >

                  <div className="project-card-top">

                    <span className="project-status">
                      {project.status}
                    </span>

                    <span className="project-budget">
                      ₹{project.budget}
                    </span>

                  </div>


                  <h3>
                    {project.title}
                  </h3>


                  <p>
                    {project.description}
                  </p>


                  {/* Skills */}

                  <div className="project-skills">

                    {project.skills?.map(
                      (skill, index) => (

                        <span key={index}>
                          {skill}
                        </span>

                      )
                    )}

                  </div>


                  {/* View Project */}

                  <button
                    onClick={() =>
                      navigate(
                        `/projects/${project._id}`
                      )
                    }
                  >
                    View Project
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

      )}


      {/* ======================================
          FREELANCER → MY BIDS
      ====================================== */}

      {user.role === "freelancer" && (

        <div className="my-projects-section">

          <div className="section-header">

            <div>

              <h2>
                My Bids
              </h2>

              <p>
                Track the projects you have applied for.
              </p>

            </div>

            <button
              onClick={() =>
                navigate("/projects")
              }
            >
              Find Projects
            </button>

          </div>


          {/* Loading */}

          {bidsLoading ? (

            <p>
              Loading your bids...
            </p>

          ) : myBids.length === 0 ? (

            /* No Bids */

            <div className="empty-projects">

              <h3>
                No bids yet
              </h3>

              <p>
                Apply for projects to see your bids here.
              </p>

            </div>

          ) : (

            /* Bids */

            <div className="projects-grid">

              {myBids.map((bid) => (

                <div
                  className="dashboard-project-card"
                  key={bid._id}
                >

                  {/* Top */}

                  <div className="project-card-top">

                    <span
                      className={`bid-status ${bid.status}`}
                    >
                      {bid.status}
                    </span>

                    <span className="project-budget">
                      ₹{bid.bidAmount}
                    </span>

                  </div>


                  {/* Project Name */}

                  <h3>
                    {bid.project?.title ||
                      "Project"}
                  </h3>


                  {/* Proposal */}

                  <p>
                    {bid.proposal}
                  </p>


                  {/* Delivery */}

                  <div className="bid-dashboard-info">

                    <strong>
                      Delivery:
                    </strong>{" "}

                    {bid.deliveryDays} days

                  </div>


                  {/* Project Budget */}

                  {bid.project?.budget && (

                    <div className="bid-dashboard-info">

                      <strong>
                        Project Budget:
                      </strong>{" "}

                      ₹{bid.project.budget}

                    </div>

                  )}


                  {/* View */}

                  {bid.project?._id && (

                    <button
                      onClick={() =>
                        navigate(
                          `/projects/${bid.project._id}`
                        )
                      }
                    >
                      View Project
                    </button>

                  )}

                </div>

              ))}

            </div>

          )}

        </div>

      )}


      {/* ======================================
          DASHBOARD CARDS
      ====================================== */}

      <div className="dashboard-cards">


        {/* Projects */}

        <div className="dashboard-card">

          <h3>
            Projects
          </h3>

          <p>
            View available projects and find
            opportunities.
          </p>

          <button
            onClick={() =>
              navigate("/projects")
            }
          >
            View Projects
          </button>

        </div>


        {/* Profile */}

        <div className="dashboard-card">

          <h3>
            My Profile
          </h3>

          <p>
            View and manage your account
            information.
          </p>

          <button
            onClick={() =>
              navigate("/profile")
            }
          >
            View Profile
          </button>

        </div>


        {/* Client → Post Project */}

        {user.role === "client" && (

          <div className="dashboard-card">

            <h3>
              Post Project
            </h3>

            <p>
              Create a new project and find
              freelancers.
            </p>

            <button>
              Post Project
            </button>

          </div>

        )}


        {/* Freelancer → My Bids */}

        {user.role === "freelancer" && (

          <div className="dashboard-card">

            <h3>
              My Bids
            </h3>

            <p>
              Track your submitted project bids.
            </p>

            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth"
                })
              }
            >
              View My Bids
            </button>

          </div>

        )}

      </div>

    </div>
  );
}

export default Dashboard;