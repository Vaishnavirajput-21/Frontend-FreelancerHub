import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-box">
          <h2>FreelancerHub</h2>
          <p>
            Connect with talented freelancers and trusted clients
            from around the world.
          </p>
        </div>

        <div className="footer-box">
          <h3>Quick Links</h3>

          <ul>
            <li>Home</li>
            <li>Projects</li>
            <li>Freelancers</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="footer-box">
          <h3>Categories</h3>

          <ul>
            <li>Web Development</li>
            <li>Graphic Design</li>
            <li>UI/UX Design</li>
            <li>AI & ML</li>
          </ul>
        </div>

        <div className="footer-box">
          <h3>Contact</h3>

          <p>Email: support@freelancerhub.com</p>
          <p>Phone: +91 9876543210</p>
          <p>India</p>
        </div>

      </div>

      <hr />

      <div className="copyright">
        © 2026 FreelancerHub | All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;