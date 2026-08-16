import "./WhyChoose.css";

const features = [
  {
    title: "Verified Freelancers",
    desc: "Hire trusted professionals with verified profiles and ratings.",
    icon: "✅",
  },
  {
    title: "Secure Payments",
    desc: "Milestone-based escrow payments with complete security.",
    icon: "💳",
  },
  {
    title: "24/7 Support",
    desc: "Dedicated support team to help clients and freelancers.",
    icon: "🎧",
  },
  {
    title: "Fast Hiring",
    desc: "Post your project and receive bids within minutes.",
    icon: "⚡",
  },
];

function WhyChoose() {
  return (
    <section className="why-section">
      <h2>Why Choose FreelancerHub?</h2>

      <div className="why-grid">
        {features.map((item, index) => (
          <div className="why-card" key={index}>
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChoose;