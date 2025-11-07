import { useState } from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import toast from "react-hot-toast";

function Product(props) {
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Add to cart (local only)
  const handleCart = () => {
    setAdded(true);
    toast.success(`${props.title} added to cart!`);
  };

  // WhatsApp Direct Send
  const sendToWhatsApp = () => {
    const phone = "916379240125"; // your WhatsApp number (no +)
    const message = `Hi! I would like to order ${quantity} x ${props.title}.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleQuantityChange = (change) => {
    const newQty = quantity + change;
    if (newQty >= 1 && newQty <= 50) {
      setQuantity(newQty);
    }
  };

  return (
    <>
      <article className="cat-card bg-white group/card overflow-hidden rounded-2xl shadow-xl hover:-translate-y-2 transition-all duration-200">
        <div className="relative p-2 h-56">
          <img
            alt={props.title}
            src={props.img}
            className={`${
              props.inStock ? "" : "opacity-60"
            } h-full w-full rounded-xl object-cover`}
          />
          {!props.inStock && (
            <div className="absolute top-2 right-2">
              <span className="text-lg border-2 border-red-600 bg-white rounded-lg p-1 font-extrabold text-red-600">
                SOLD OUT
              </span>
            </div>
          )}

          <div
            className={`${
              props.inStock ? "block" : "hidden"
            } absolute inset-0 flex justify-center items-center translate-y-10 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300`}
          >
            <Link
              to={`/products/${props.category}/${props.id}`}
              className="bg-white rounded-3xl px-4 py-2 font-bold shadow"
            >
              View details
            </Link>
          </div>
        </div>

        {/* <div>
          <div
            className={`${
              props.inStock ? "block" : "hidden"
            } absolute inset-0 flex justify-center items-center translate-y-10 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300`}
          >
            <Link
              to={`/products/${props.category}/${props.id}`}
              className="bg-white rounded-3xl px-4 py-2 font-bold shadow"
            >
              View details
            </Link>
          </div>
        </div> */}

        <div className="p-4 md:p-6">
          <div className="text-black flex">
            <div className="flex items-center gap-2 w-10/12">
              <div>
                <h3 className="font-bold text-xl">{props.title}</h3>
                <p className="text-md pt-2">{props.subject}</p>
              </div>
            </div>
            <p className="mt-2 w-full flex justify-end gap-3 items-center pb-3 font-extrabold text-2xl text-black">
              <span className="text-xl line-through text-red">
                ₹{props.originalPrice}
              </span>
              <span> ₹{props.discountedPrice}</span>
            </p>
          </div>

          {/* Quantity + WhatsApp */}
          <div className="pt-3 flex gap-2">
            {!added ? (
              <button
                disabled={!props.inStock}
                className={`${
                  props.inStock
                    ? "cursor-pointer new-primary-text"
                    : "cursor-not-allowed text-gray-400"
                } group relative inline-flex items-center overflow-hidden rounded-lg border border-current px-8 py-3 `}
                onClick={handleCart}
              >
                <span className="text-sm font-medium transition-all group-hover:ms-2">
                  Add to cart
                </span>
              </button>
            ) : (
              <div className="space-x-2 inline-flex items-center overflow-hidden rounded-lg border border-current py-1 new-primary-text px-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                >
                  <Minus className="h-3 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(1)}>
                  <Plus className="h-3 w-4" />
                </Button>
              </div>
            )}

            <button
              disabled={!props.inStock}
              className={`${
                props.inStock
                  ? "cursor-pointer new-primary-bg"
                  : "cursor-not-allowed bg-gray-400"
              } group relative inline-flex items-center overflow-hidden rounded-lg px-4 py-3 text-white `}
              onClick={sendToWhatsApp}
            >
              <span className="text-sm font-medium">Buy Now</span>
            </button>
          </div>
        </div>
      </article>
    </>
  );
}
export default Product;
