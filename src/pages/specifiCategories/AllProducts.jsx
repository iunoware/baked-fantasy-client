/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Product from "../../components/Products.jsx";
import axios from "axios";
import Loading from "../../components/Loading";
import { WarningProvider } from "@radix-ui/react-dialog";

function AllProducts() {
  const token = "";
  const [products, setProducts] = useState([]);

  async function fetchAllProducts() {
    try {
      const response = await axios.get(`http://localhost:5000/products`);
      console.log("all products: ", response.data);
      // console.log("category name: ", response.data[0].category.title);
      setProducts(response.data);
    } catch (error) {
      console.error("Can't fetch all products", error.message);
    }
  }

  useEffect(() => {
    fetchAllProducts();
    // function handleFocus() {
    //   fetchAllProducts();
    // }
    // window.addEventListener("focus", handleFocus());
    // return () => window.removeEventListener("focus", handleFocus());
  }, []);

  return (
    <div className="bg">
      <div className="hero relative bg-[url(/images/ess-hero3.png)] bg-cover bg-center h-[80vh] flex justify-baseline items-center ps-10 ">
        <div className="absolute inset-0 top-23 left-5 space-x-2 mb-8">
          <Link
            variant="ghost"
            size="sm"
            to={`/categories`}
            className="flex items-center text-muted-foreground hover:text-[#870D32]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Categories
          </Link>
        </div>
        <h1 className="w-4/12 text-9xl font-extrabold">All Products</h1>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 lg:px-20 md:px-15 sm:px-10 px-5 py-10">
        {products.length > 0 ? (
          products.map((p) =>
            p.isActive ? (
              <Product
                key={p._id}
                id={p._id} // ✅ pass id
                category={p.category?.title || "Uncategorized"}
                img={`http://localhost:5000${p.images?.[0]}`}
                originalPrice={p.originalPrice}
                discountedPrice={p.discountedPrice}
                title={p.title}
                subject={p.subject}
                inStock={p.inStock}
              />
            ) : (
              ""
            ),
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

export default AllProducts;
