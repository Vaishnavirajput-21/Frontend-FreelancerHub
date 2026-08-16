import "./Hero.css";

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-left">
        <h1>Find the Perfect Freelancer for Your Business</h1>

        <p>
          Connect with thousands of skilled professionals for web development,
          design, AI, data science, content writing and much more.
        </p>

        <div className="hero-search">
          <input
            type="text"
            placeholder="Search freelancers or projects..."
          />

          <button>Search</button>
        </div>

        <div className="hero-buttons">
          <button className="primary-btn">Hire Freelancer</button>
          <button className="secondary-btn">Become a Freelancer</button>
        </div>
      </div>

      <div className="hero-right">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700"
          alt="Freelancers"
        />
      </div>
    </section>
  );
}

export default Hero;