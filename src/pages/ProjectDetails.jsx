import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProjectDetails.css";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Bid states
  const [bidAmount, setBidAmount] = useState("");
  const [proposal, setProposal] = useState("");
  const [deliveryDays, setDeliveryDays] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Bids states
  const [bids, setBids] = useState([]);
  const [bidsLoading, setBidsLoading] = useState(false);

  // Fetch Project
  useEffect(() => {
    fetch(`http://localhost:5000/api/projects/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Project not found");
        }

        return response.json();
      })
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Project Error:", error);
        setLoading(false);
      });
  }, [id]);

  // Fetch Bids
  const fetchBids = async () => {
    try {
      setBidsLoading(true);

      const response = await fetch(
        `http://localhost:5000/api/bids/project/${id}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch bids");
      }

      setBids(data);
    } catch (error) {
      console.error("Bids Error:", error);
    } finally {
      setBidsLoading(false);
    }
  };

  // Load bids
  useEffect(() => {
    fetchBids();
  }, [id]);

  // Submit Bid
  const handleBidSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (user.role !== "freelancer") {
      alert("Only freelancers can apply for projects");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        "http://localhost:5000/api/bids",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            project: project._id,
            freelancer: user.id,
            bidAmount: Number(bidAmount),
            proposal,
            deliveryDays: Number(deliveryDays),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to submit bid");
        return;
      }

      alert("Bid submitted successfully! 🎉");

      setBidAmount("");
      setProposal("");
      setDeliveryDays("");

      fetchBids();
    } catch (error) {
      console.error("Bid Error:", error);
      alert("Unable to connect to server");
    } finally {
      setSubmitting(false);
    }
  };

  // Accept / Reject Bid
  const handleBidAction = async (bidId, action) => {
    try {
      const token = localStorage.getItem("token");

const response = await fetch(
  `http://localhost:5000/api/bids/${bidId}/${action}`,
  {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Action failed");
        return;
      }

      if (action === "accept") {
        alert("Bid accepted successfully! 🎉");
      } else {
        alert("Bid rejected successfully!");
      }

      fetchBids();
    } catch (error) {
      console.error("Bid Action Error:", error);
      alert("Unable to connect to server");
    }
  };

  // Loading
  if (loading) {
    return (
      <h2 className="details-message">
        Loading project...
      </h2>
    );
  }

  // Project not found
  if (!project) {
    return (
      <div className="details-message">
        <h2>Project not found</h2>

        <button onClick={() => navigate("/projects")}>
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="project-details-container">

      {/* Back Button */}
      <button
        className="back-btn"
        onClick={() => navigate("/projects")}
      >
        ← Back to Projects
      </button>

      <div className="project-details-card">

        {/* Project Top */}
        <div className="details-top">

          <span className="project-status">
            {project.status}
          </span>

          <span className="details-budget">
            ₹{project.budget}
          </span>

        </div>

        {/* Project Information */}
        <h1>{project.title}</h1>

        <p className="details-description">
          {project.description}
        </p>

        {/* Skills */}
        <h3>Required Skills</h3>

        <div className="skills">
          {project.skills?.map((skill, index) => (
            <span key={index}>
              {skill}
            </span>
          ))}
        </div>

        {/* Client Information */}
        <div className="client-section">

          <h3>Client Information</h3>

          <p>
            <strong>Name:</strong>{" "}
            {project.client?.name || "Vaishnavi"}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {project.client?.email || "Not available"}
          </p>

        </div>

        {/* Apply / Bid Section */}
        <div className="bid-section">

          <h2>Apply for this Project</h2>

          <form onSubmit={handleBidSubmit}>

            <input
              type="number"
              placeholder="Your Bid Amount"
              value={bidAmount}
              onChange={(e) =>
                setBidAmount(e.target.value)
              }
              required
              min="1"
            />

            <input
              type="number"
              placeholder="Delivery Time (days)"
              value={deliveryDays}
              onChange={(e) =>
                setDeliveryDays(e.target.value)
              }
              required
              min="1"
            />

            <textarea
              placeholder="Write your proposal..."
              value={proposal}
              onChange={(e) =>
                setProposal(e.target.value)
              }
              rows="6"
              required
            />

            <button
              type="submit"
              className="apply-btn"
              disabled={submitting}
            >
              {submitting
                ? "Submitting..."
                : "Submit Bid"}
            </button>

          </form>

        </div>

        {/* Freelancer Bids */}
        <div className="bids-section">

          <h2>Freelancer Bids</h2>

          {bidsLoading ? (
            <p>Loading bids...</p>
          ) : bids.length === 0 ? (
            <p>No bids submitted yet.</p>
          ) : (
            <div className="bids-list">

              {bids.map((bid) => (
                <div
                  className="bid-card"
                  key={bid._id}
                >

                  {/* Bid Header */}
                  <div className="bid-header">

                    <div>
                      <h3>
                        {bid.freelancer?.name ||
                          "Unknown Freelancer"}
                      </h3>

                      <p>
                        {bid.freelancer?.email ||
                          "No email"}
                      </p>
                    </div>

                    <span
                      className={`bid-status ${bid.status}`}
                    >
                      {bid.status}
                    </span>

                  </div>

                  {/* Bid Information */}
                  <div className="bid-info">

                    <div>
                      <strong>Bid Amount</strong>

                      <span>
                        ₹{bid.bidAmount}
                      </span>
                    </div>

                    <div>
                      <strong>Delivery</strong>

                      <span>
                        {bid.deliveryDays} days
                      </span>
                    </div>

                  </div>

                  {/* Proposal */}
                  <div className="bid-proposal">

                    <strong>Proposal</strong>

                    <p>
                      {bid.proposal}
                    </p>

                  </div>

                  {/* Accept / Reject */}
                  {bid.status === "pending" && (
                    <div className="bid-actions">

                      <button
                        className="accept-btn"
                        onClick={() =>
                          handleBidAction(
                            bid._id,
                            "accept"
                          )
                        }
                      >
                        Accept Bid
                      </button>

                      <button
                        className="reject-btn"
                        onClick={() =>
                          handleBidAction(
                            bid._id,
                            "reject"
                          )
                        }
                      >
                        Reject Bid
                      </button>

                    </div>
                  )}

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default ProjectDetails;