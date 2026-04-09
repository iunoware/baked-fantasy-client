import { Link } from "react-router-dom";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext.jsx";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext.jsx";

/**
 * A universal Product Card component used for both Bakery Products and Baking Essentials.
 *
 * @param {Object} props
 * @param {string} props.id - Product ID
 * @param {string} props.title - Product Title
 * @param {string} props.img - Product Image URL
 * @param {string} props.category - Product Category
 * @param {string} props.subject - Product Subtitle/Subject
 * @param {number|string} props.originalPrice - Original Price
 * @param {number|string} props.discountedPrice - Discounted Price
 * @param {boolean} props.inStock - Stock Availability
 * @param {string} props.type - 'bakery' or 'essential' (defaults to 'bakery')
 */
const ProductCard = ({
  id,
  title,
  img,
  category,
  subject,
  originalPrice,
  discountedPrice,
  inStock,
  type = "bakery",
  deliveryType = "local",
}) => {
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } =
    useCart();

  const { openLoginModal, isLoggedIn } = useAuth();
  const cartItem = cartItems.find((item) => item.id === id);
  const quantity = cartItem?.quantity || 0;
  const added = quantity > 0;

  // Login validation

  // const [userLoggedIn, setUserLoggedIn] = useState(false);

  // Add to cart handler
  const handleCart = (e) => {
    e.preventDefault();
    if (!inStock) return;

    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    addToCart({
      id,
      name: title,
      price: discountedPrice,
      image: img,
      category,
      subject,
      type,
      deliveryType,
    });
    toast.success(`${title} added to cart!`);
  };

  // Quantity change handler
  const handleQuantityChange = (change) => {
    if (change > 0) {
      increaseQuantity(id);
    } else {
      decreaseQuantity(id);
    }
  };

  // WhatsApp redirect for Baking Essentials
  const sendToWhatsApp = (e) => {
    e.stopPropagation();
    const phone = "916379240125";
    const message = `Order Details:%0A${title} - Quantity: ${quantity}`;
    window.open(`https://wa.me/${phone}?text=${message}`);
  };

  // Define dynamic paths and actions based on product type
  const detailLink =
    type === "essential"
      ? `/essential/${category}/${id}`
      : `/products/${category}/${id}`;

  const buyNowAction =
    type === "essential" ? sendToWhatsApp : (e) => e.stopPropagation();

  return (
    <div className="product-card group/card shadow-xl h-full group relative bg-white rounded-2xl border border-neutral-100 p-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col">
      {/* Image Section */}
      <Link
        to={detailLink}
        className="relative aspect-square w-auto h-60 rounded-xl overflow-hidden bg-neutral-50/50"
      >
        <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-110">
          <img
            src={img || "/images/fallback.png"}
            alt={title}
            className={`object-cover object-center h-full w-full ${!inStock ? "opacity-60 grayscale-[0.5]" : ""}`}
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/fallback.png";
            }}
          />
        </div>

        {/* Sold Out Badge */}
        {!inStock && (
          <div className="absolute top-2 right-2 z-20">
            <span className="text-xs border-2 border-red-600 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 font-extrabold text-red-600 shadow-sm">
              SOLD OUT
            </span>
          </div>
        )}

        {/* View Details Hover Overlay */}
        <div
          className={`${
            inStock ? "block" : "hidden"
          } absolute inset-0 z-10 flex justify-center items-center translate-y-10 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300`}
        >
          <div className="bg-white text-neutral-900 rounded-3xl px-5 py-2 font-bold shadow-lg group-hover:scale-105 transition-transform duration-300">
            View details
          </div>
        </div>
      </Link>

      {/* Details Section */}
      <div className="flex flex-col justify-between flex-1 p-3">
        <div>
          <div className="flex flex-col justify-between items-start mb-2">
            <h3 className="text-2xl font-bold mb-2 text-neutral-900 transition-colors duration-300 line-clamp-1">
              {title}
            </h3>
            <p className="text-sm text-neutral-600 line-clamp-1 h-5">
              {subject}
            </p>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold new-primary-text">
              ₹{discountedPrice}
            </span>
            <span className="w-1 h-1 rounded-full bg-neutral-300" />
            <span className="text-md line-through font-medium text-neutral-400">
              ₹{originalPrice}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div>
          {/* Add to Cart Button (Only shown if not already added) */}
          <button
            disabled={!inStock}
            onClick={handleCart}
            className={`mt-auto ${added ? "hidden" : "flex"} z-10 w-full cursor-pointer bg-pbrown text-white font-bold py-3.5 rounded-xl items-center justify-center gap-2 hover:bg-sbrown transition-all duration-300 active:scale-95 shadow-sm disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed`}
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>

          {/* Quantity Controls and Buy Now (Shown when added to cart) */}
          <div
            className={`${added ? "flex" : "hidden"} gap-3 z-10 items-center w-full`}
          >
            <div className="flex items-center justify-between bg-neutral-100 rounded-xl p-1.5 flex-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuantityChange(-1);
                }}
                className="p-2 z-10 cursor-pointer rounded-lg hover:bg-white hover:shadow-sm transition-all text-neutral-600 active:scale-90"
              >
                <Minus size={16} />
              </button>
              <span className="font-bold text-neutral-900 min-w-5 text-center">
                {quantity}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuantityChange(+1);
                }}
                className="p-2 cursor-pointer rounded-lg hover:bg-white hover:shadow-sm transition-all text-neutral-600 active:scale-90"
              >
                <Plus size={16} />
              </button>
            </div>
            {/* <button
              disabled={!inStock}
              onClick={buyNowAction}
              className="flex-[1.5] z-10 bg-violet text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-black transition-all duration-300 active:scale-95 shadow-sm disabled:opacity-50"
            >
              Buy now
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
