import Product from "../../components/Products.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function SpecificCategory() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await axios.get(
          `http://localhost:5000/products/categories/name/${categoryName}`
        );
        setCategory(catRes.data);

        const prodRes = await axios.get(
          `http://localhost:5000/products/category/${categoryName}`
        );
        setProducts(prodRes.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchData();
  }, [categoryName]);
  return (
    <>
      {/* <Link to={`/products/cake/cake-1`} className="card"> */}
      <div className="category-page">
        {/* hero section */}
        <div className="hero bg-[url(/images/cake-hero.png)] bg-cover bg-center h-[80vh] flex justify-baseline items-center ps-10 ">
          <h1 className="w-4/12 text-9xl font-extrabold">{categoryName}</h1>
        </div>
        {/* products */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 px-20 py-10">
          {products.map((p) => {
            return (
              <Product
                key={p._id}
                img={p.imageUrl}
                price={p.price}
                title={p.title}
                subject={p.subject}
              />
            );
          })}
        </div>
      </div>
      {/* </Link> */}
    </>
  );
}

export default SpecificCategory;
