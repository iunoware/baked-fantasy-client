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
    const phone = "919003710091"; // your WhatsApp number
    const message = `Order Details:%0A${props.title} - Quantity: ${quantity}`;
    window.open(`https://wa.me/${phone}?text=${message}`);
  };

  return (
    <article className="cat-card overflow-hidden rounded-lg shadow-xl hover:-translate-y-2 transition-all duration-200">
      <div className="relative p-2 h-56">
        <img
          alt={props.title}
          src={props.img}
          className="h-full w-full rounded-2xl object-cover cat-img"
        />

        <div className="hover-content">
          <Link
            to={`/essentials/${props.category}/${props.id}`}
            className="bg-white rounded-lg px-4 py-2 font-bold shadow"
          >
            View details
          </Link>
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
              className="group relative inline-flex items-center overflow-hidden rounded-sm bg-cyan-500 px-8 py-3 text-white"
              onClick={handleCart}
            >
              <span className="text-sm font-medium transition-all group-hover:ms-2">
                Add to cart
              </span>
            </button>
          ) : (
            <div className="space-x-2 inline-flex items-center overflow-hidden rounded-sm bg-cyan-500 py-2 text-white px-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuantityChange(-1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuantityChange(1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}

          <button
            className="group relative inline-flex items-center overflow-hidden rounded-sm border border-current px-4 py-3 text-sky-600"
            onClick={sendToWhatsApp}
          >
            <span className="text-sm font-medium">Buy Now</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default Product;
