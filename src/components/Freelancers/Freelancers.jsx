import "./Freelancers.css";

const freelancers = [
  {
    name: "Aarav Sharma",
    skill: "Full Stack Developer",
    rating: "⭐ 4.9",
    price: "$25/hr",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Verma",
    skill: "UI/UX Designer",
    rating: "⭐ 4.8",
    price: "$20/hr",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rahul Mehta",
    skill: "AI Engineer",
    rating: "⭐ 5.0",
    price: "$35/hr",
    image: "https://randomuser.me/api/portraits/men/51.jpg",
  },
  {
    name: "Sneha Patel",
    skill: "Content Writer",
    rating: "⭐ 4.7",
    price: "$15/hr",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

function Freelancers() {
  return (
    <section className="freelancers">
      <h2>Featured Freelancers</h2>

      <div className="freelancer-grid">
        {freelancers.map((item, index) => (
          <div className="freelancer-card" key={index}>
            <img src={item.image} alt={item.name} />

            <h3>{item.name}</h3>

            <p>{item.skill}</p>

            <span>{item.rating}</span>

            <h4>{item.price}</h4>

            <button>Hire Now</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Freelancers;