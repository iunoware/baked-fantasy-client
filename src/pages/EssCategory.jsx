import { useEffect, useState } from "react";
import Category from "../components/Product-Cat.jsx";
import axios from "axios";

function EssCategories() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/ess-categories");
        setProducts(res.data);
      } catch (err) {
        console.error("Error Fetching Products", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <section className="lg:pt-30 md:pt-20 pt-40">
        <h1> Explore Our Product Categories </h1>
        <p className="subHeading">
          Discover our wide range of handcrafted baked goods, made with premium
          ingredients and traditional techniques passed down through
          generations.
        </p>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 px-20 py-10">
          {products.map((p, i) => {
            return (
              <Category
                key={p._id}
                img={p.imageUrl}
                emoji="🍩"
                title={p.title}
                subject={p.subject}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}

export default EssCategories;
