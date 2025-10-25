import axios from "axios";
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Plus, Minus } from "lucide-react";

function Product(props) {
  const userId = "670e2f1cf9a0b3142b12b70c";
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleCart = async () => {
    try {
      await axios.post("http://localhost:5000/cart", {
        userId,
        productId: props.id,
        quantity: 1,
      });
      setAdded(true);
      toast.success(`${props.title} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  useEffect(() => {
    const checkCartStatus = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/cart/${userId}`);
        const userCart = res.data; // adjust to match your backend response
        const foundItem = userCart.items.find(
          (item) => item.productId._id === props.id
        );

        if (foundItem) {
          setAdded(true);
          setQuantity(foundItem.quantity);
        }
      } catch (error) {
        console.error("Error checking cart:", error);
      }
    };

    checkCartStatus();
  }, [props.id]);

  const handleQuantityChange = async (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 50) {
      setQuantity(newQuantity);
      try {
        await axios.put("http://localhost:5000/cart", {
          userId,
          productId: props.id,
          quantity: newQuantity,
        });
        toast.success(`Quantity updated to ${newQuantity}`);
      } catch (err) {
        console.error("Error Updating Cart", err);
        toast.error("Failed to update quantity");
      }
    }
  };

  return (
    <>
      <article className="cat-card bg-white overflow-hidden rounded-2xl shadow-xl hover:-translate-y-2 transition-all duration-200">
        <div className="relative p-2 h-56">
          <img
            alt="Cake"
            // src="/images/cake-2.jpg"
            src={props.img}
            className="h-full w-full rounded-xl object-cover cat-img"
          />

          {/* <div className={`absolute inset-0 ${colors[props.color]}`}></div> */}

          {/* Centered hover button */}
          <div className="hover-content">
            <Link
              to={`/products/${props.category}/${props.id}`}
              className="bg-white rounded-3xl px-4 py-2 font-bold shadow"
            >
              View details
            </Link>
            <div></div>
          </div>
        </div>

        {/* Bottom white content */}
        <div className=" p-4 sm:p-6">
          <div className="text-black flex">
            <div className="flex items-center gap-2 w-10/12">
              <div>
                <h3 className="font-bold text-xl">{props.title}</h3>
                <p className="text-md pt-2">{props.subject}</p>
              </div>
            </div>
            <p className="mt-2 pb-3 font-extrabold text-3xl text-blue-500">
              {" "}
              ₹{props.price}
            </p>
          </div>
          <div className="pt-3">
            {!added ? (
              <button
                className="group relative inline-flex items-center overflow-hidden rounded-sm bg-cyan-500 px-8 py-3 text-white focus:ring-3 focus:outline-hidden mr-3"
                onClick={handleCart}
              >
                <span className="absolute -start-full transition-all group-hover:start-4">
                  <svg
                    className="size-5 rtl:rotate-180"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </g>
                  </svg>
                </span>

                <span className="text-sm font-medium transition-all group-hover:ms-4">
                  Add to cart
                </span>
              </button>
            ) : (
              <div className="space-x-2 translate-y-1 group relative inline-flex items-center overflow-hidden rounded-sm bg-cyan-500 py-2 text-white focus:ring-3 focus:outline-hidden mr-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                  // disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                  // disabled={quantity >= 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
            <button
              className="group relative inline-flex items-center overflow-hidden rounded-sm border border-current px-3 py-3 text-sky-600 focus:ring-3 focus:outline-hidden"
              href="#"
            >
              <span className="absolute -start-full transition-all group-hover:start-1">
                <svg
                  className="size-5 rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>

              <span className="text-sm font-medium transition-all group-hover:ms-4">
                Buy Now
              </span>
            </button>
          </div>
        </div>
      </article>
    </>
  );
}
export default Product;
