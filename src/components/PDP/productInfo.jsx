import { useState } from "react";
import { Heart, Minus, Plus, Star } from "lucide-react";

export default function ProductInfo({
  title,
  rating,
  reviewCount,
  price,
  originalPrice,
  description,
  sizes,
}) {
  const [selectedSize, setSelectedSize] = useState(sizes[0].value);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const selectedSizeData = sizes.find((size) => size.value === selectedSize);
  const currentPrice = selectedSizeData ? selectedSizeData.price : price;

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="space-y-6">
      {/* Title and Favorite */}
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-3xl font-medium text-gray-900">{title}</h1>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="text-gray-400 hover:text-pink-500"
        >
          <Heart
            className={`h-6 w-6 ${
              isFavorite ? "fill-pink-500 text-pink-500" : ""
            }`}
          />
        </button>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < Math.floor(rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>
        <span className="text-gray-600">
          {rating} ({reviewCount} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-semibold text-gray-900">
          ${currentPrice.toFixed(2)}
        </span>
        {originalPrice && originalPrice > currentPrice && (
          <>
            <span className="text-xl text-gray-500 line-through">
              ${originalPrice.toFixed(2)}
            </span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-lg text-sm">
              Save ${(originalPrice - currentPrice).toFixed(2)}
            </span>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed">{description}</p>

      {/* Size Selection */}
      <div className="space-y-3">
        <label className="text-lg font-medium text-gray-900">Size/Weight</label>
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="w-full h-12 text-lg rounded-xl border border-gray-300 px-3"
        >
          {sizes.map((size) => (
            <option key={size.value} value={size.value}>
              {size.label} - ${size.price.toFixed(2)}
            </option>
          ))}
        </select>
      </div>

      {/* Quantity Selector */}
      <div className="space-y-3">
        <label className="text-lg font-medium text-gray-900">Quantity</label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-200 rounded-xl">
            <button
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="h-12 w-12 rounded-l-xl"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-6 py-3 text-lg font-medium min-w-[80px] text-center">
              {quantity}
            </span>
            <button
              onClick={incrementQuantity}
              className="h-12 w-12 rounded-r-xl"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <span className="text-gray-600">
            Total: ${(currentPrice * quantity).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-4">
        <button className="w-full h-14 text-lg rounded-xl bg-pink-500 text-white hover:bg-pink-600">
          Add to Cart
        </button>
        <button className="w-full h-14 text-lg rounded-xl border border-pink-500 text-pink-500 hover:bg-pink-50">
          Buy Now
        </button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
        <div className="text-center p-4 bg-pink-50 rounded-xl">
          <div className="text-lg font-medium text-gray-900">Fresh Daily</div>
          <div className="text-sm text-gray-600">Baked fresh every morning</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-xl">
          <div className="text-lg font-medium text-gray-900">Free Delivery</div>
          <div className="text-sm text-gray-600">On orders over $50</div>
        </div>
      </div>
    </div>
  );
}
