import Product from "../../components/EssProduct";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import Loading from "../../components/Loading.jsx";

function SpecificCategory() {
  const { categoryName } = useParams(); // comes from URL /products/:categoryName
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/essentials/category/${categoryName}`
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
      <div className="hero relative bg-[url(/images/ess-hero2.png)] bg-cover bg-center h-[80vh] flex justify-baseline items-center ps-10 ">
        <div className="absolute inset-0 top-23 left-5 space-x-2 mb-8">
          <Link
            variant="ghost"
            size="sm"
            to={`/ess-categories`}
            className="flex items-center text-muted-foreground hover:text-[#870D32]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </div>
        <h1 className="w-4/12 text-9xl font-extrabold">{categoryName}</h1>
      </div>

      {/* products */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 lg:px-20 md:px-15 sm:px-10 px-5 py-10">
        {products.length > 0 ? (
          products.map((p) =>
            p.isActive ? (
              <Product
                key={p._id}
                id={p._id} // ✅ pass id
                category={categoryName}
                img={`${import.meta.env.VITE_API_URL}${p.images?.[0]}`}
                originalPrice={p.originalPrice}
                discountedPrice={p.discountedPrice}
                title={p.title}
                subject={p.subject}
                inStock={p.inStock}
              />
            ) : (
              ""
            )
          )
        ) : (
          <div className="w-full flex justify-start col-span-full items-center">
            <Loading text={"Products are coming soon"} />
          </div>
        )}
      </div>
    </div>
  );
}

export default SpecificCategory;
