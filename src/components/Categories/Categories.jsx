import "./Categories.css";

const categories = [
  "Web Development",
  "UI/UX Design",
  "Mobile App",
  "Graphic Design",
  "Content Writing",
  "AI & Machine Learning",
  "Digital Marketing",
  "Data Science",
];

function Categories() {
  return (
    <section className="categories">
      <h2>Popular Categories</h2>

      <div className="category-grid">
        {categories.map((item, index) => (
          <div className="category-card" key={index}>
            <h3>{item}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;