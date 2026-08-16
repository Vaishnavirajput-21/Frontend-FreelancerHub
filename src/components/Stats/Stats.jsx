import "./Stats.css";

function Stats() {
  const stats = [
    { number: "15K+", title: "Freelancers" },
    { number: "8K+", title: "Clients" },
    { number: "35K+", title: "Projects Completed" },
    { number: "98%", title: "Client Satisfaction" },
  ];

  return (
    <section className="stats">
      <h2>Our Platform in Numbers</h2>

      <div className="stats-grid">
        {stats.map((item, index) => (
          <div className="stat-card" key={index}>
            <h1>{item.number}</h1>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;