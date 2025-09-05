import Product from "../../components/Products.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function SpecificCategory() {
  const { categoryName } = useParams(); // comes from URL /products/:categoryName
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/products/category/${categoryName}`
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [categoryName]);

  return (
    <div className="category-page">
      {/* hero section */}
      <div className="hero bg-[url(/images/cake-hero.png)] bg-cover bg-center h-[80vh] flex justify-baseline items-center ps-10 ">
        <h1 className="w-4/12 text-9xl font-extrabold">{categoryName}</h1>
      </div>

      {/* products */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 px-20 py-10">
        {products.map((p) => (
          <Product
            key={p._id}
            id={p._id} // ✅ pass id
            category={categoryName}
            img={`http://localhost:5000${p.images?.[0]}`} // 👈 thumbnail only
            price={p.price}
            title={p.title}
            subject={p.subject}
          />
        ))}
      </div>
    </div>
  );
}

export default SpecificCategory;
