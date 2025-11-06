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

  // Quantity change
  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 50) {
      setQuantity(newQuantity);
    }
  };

  // Send to WhatsApp
  const sendToWhatsApp = () => {
    const phone = "916379240125"; // your WhatsApp number
    const message = `Order Details:%0A${props.title} - Quantity: ${quantity}`;
    window.open(`https://wa.me/${phone}?text=${message}`);
  };

  return (
    <>
      <article className="cat-card bg-white group/card overflow-hidden rounded-2xl shadow-xl hover:-translate-y-2 transition-all duration-200">
        <div className="relative p-2 h-56">
          <img
            alt="Cake"
            // src="/images/cake-2.jpg"
            src={props.img}
            className={`
              ${props.inStock ? "" : " opacity-60"}
              h-full w-full rounded-xl object-cover cat-img`}
          />
          <div className={`${props.inStock ? "hidden" : "flex"} absolute top-2 right-2`}>
            <span className="text-lg border-2 border-red-600 bg-white rounded-lg p-1 font-extrabold text-red-600">
              SOLD OUT
            </span>
          </div>
          {/* <div className={`absolute inset-0 ${colors[props.color]}`}></div> */}
          {/* Centered hover button */}
          <div
            className={`${
              props.inStock ? "block" : "hidden"
            } absolute inset-0 w-full h-full flex justify-center items-center translate-y-10 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300`}
          >
            <Link
              to={`/essential/${props.category}/${props.id}`}
              className="bg-white rounded-3xl px-4 py-2 font-bold shadow"
            >
              View details
            </Link>
            <div></div>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="text-black flex justify-between items-center">
            <div>
              <h3 className="font-bold text-xl">{props.title}</h3>
              <p className="text-md pt-2">{props.subject}</p>
            </div>
            <p className="font-extrabold text-2xl text-black">
              <span className="text-xl line-through text-red-500 mr-2">
                ₹{props.originalPrice}
              </span>
              ₹{props.discountedPrice}
            </p>
          </div>

          <div className="pt-3 flex gap-2">
            {!added ? (
              <button
                disabled={!props.inStock}
                className={`${
                  props.inStock
                    ? "cursor-pointer new-primary-text"
                    : "cursor-not-allowed text-gray-400"
                } group relative inline-flex items-center overflow-hidden rounded-lg  border border-current px-8 py-3`}
                onClick={handleCart}
              >
                <span className="text-sm font-medium transition-all group-hover:ms-2">
                  Add to cart
                </span>
              </button>
            ) : (
              <div className="space-x-2 inline-flex items-center overflow-hidden rounded-lg new-primary-text border border-current py-1 px-4">
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
              } group relative inline-flex items-center overflow-hidden text-white rounded-lg border border-current px-4 py-3`}
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
