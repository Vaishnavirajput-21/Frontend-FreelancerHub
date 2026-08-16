import "./Testimonials.css";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Startup Founder",
    review:
      "FreelancerHub helped me hire an excellent React developer within one day.",
    rating: "⭐⭐⭐⭐⭐",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Patel",
    role: "Business Owner",
    review:
      "The platform is simple, secure, and very easy to use. Highly recommended!",
    rating: "⭐⭐⭐⭐⭐",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Amit Verma",
    role: "Project Manager",
    review:
      "Amazing experience. The payment system and project tracking are excellent.",
    rating: "⭐⭐⭐⭐⭐",
    image: "https://randomuser.me/api/portraits/men/51.jpg",
  },
];

function Testimonials() {
  return (
    <section className="testimonials">
      <h2>What Our Clients Say</h2>

      <div className="testimonial-grid">
        {testimonials.map((item, index) => (
          <div className="testimonial-card" key={index}>
            <img src={item.image} alt={item.name} />

            <h3>{item.name}</h3>

            <span>{item.role}</span>

            <p>{item.review}</p>

            <h4>{item.rating}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;