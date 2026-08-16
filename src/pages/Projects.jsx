import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Projects.css";

function Projects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        return response.json();
      })
      .then((data) => {
        console.log("PROJECT DATA:", data);
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("PROJECT ERROR:", error);
        setError("Unable to load projects");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2 className="projects-message">Loading projects...</h2>;
  }

  if (error) {
    return <h2 className="projects-message">{error}</h2>;
  }

  return (
    <div className="projects-container">

      <div className="projects-header">
        <h1>Available Projects</h1>
        <p>Find projects and start working with clients.</p>
      </div>

      {projects.length === 0 ? (
        <div className="projects-message">
          <h2>No projects available</h2>
        </div>
      ) : (
        <div className="projects-grid">

          {projects.map((project) => (
            <div className="project-card" key={project._id}>

              <div className="project-top">
                <span className="project-status">
                  {project.status}
                </span>

                <span className="project-budget">
                  ₹{project.budget}
                </span>
              </div>

              <h2>{project.title}</h2>

              <p className="project-description">
                {project.description}
              </p>

              <div className="skills">
                {project.skills?.map((skill, index) => (
                  <span key={index}>
                    {skill}
                  </span>
                ))}
              </div>

              <div className="project-client">
                <strong>Client:</strong>{" "}
                {project.client?.name || "Unknown"}
              </div>

              <button
                className="view-project-btn"
                onClick={() =>
                  navigate(`/projects/${project._id}`)
                }
              >
                View Project
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Projects;