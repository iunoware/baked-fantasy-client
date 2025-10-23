import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  Tag,
  ArrowRight,
  Cake,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

export function CartPage({
  cartItems,
  updateCartItem,
  removeCartItem,
  promoCode,
  setPromoCode,
  orderSummary,
  onNext,
}) {
  const [promoInput, setPromoInput] = useState(promoCode);
  const [promoApplied, setPromoApplied] = useState(false);

  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const userId = "670e2f1cf9a0b3142b12b70c";

  const applyPromo = () => {
    if (promoInput === "SAVE20") {
      setPromoCode(promoInput);
      setPromoApplied(true);
    } else {
      setPromoCode("");
      setPromoApplied(false);
    }
  };

  const handleQuantityChange = async (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1 || newQuantity > 50) return;

    try {
      await axios.put("http://localhost:5000/cart", {
        userId,
        productId: itemId,
        quantity: newQuantity,
      });

      // Call your parent’s updateCartItem to update the state
      updateCartItem(itemId, newQuantity);

      toast.success(`Quantity updated to ${newQuantity}`);
    } catch (err) {
      console.error("Error updating cart:", err);
      toast.error("Failed to update quantity");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8 ">
        <div className="flex pt-12 md:pt-0 items-center gap-3 mb-2">
          <ShoppingCart className="h-8 w-8 text-pink-500" />
          <h1 className="text-3xl font-bold">Your Cart</h1>
        </div>
        <p className="text-gray-600">
          Review your items and proceed to checkout
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.length === 0 ? (
            <Card className="p-12 text-center">
              <CardContent className="space-y-4">
                <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto" />
                <h3 className="text-xl text-gray-500">Your cart is empty</h3>
                <p className="text-gray-400">
                  Your cart is empty, but the oven is ready. Pick your
                  favorites!
                </p>
                <Link
                  to={`/categories`}
                  className="group relative justify-center mt-6 inline-flex items-center overflow-hidden rounded-sm bg-cyan-500 px-8 py-3 text-white focus:ring-3 focus:outline-hidden mr-3"
                >
                  <span className="absolute -start-full transition-all group-hover:start-4">
                    <Cake size="18" />
                  </span>

                  <span className="text-sm font-medium text-center transition-all group-hover:ms-4">
                    Browse Products
                  </span>
                </Link>
              </CardContent>
            </Card>
          ) : (
            cartItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Item Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">
                            {item.description}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCartItem(item.id)}
                          className="text-red-500 hover:text-bold hover:size-lg hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity, -1)
                              }
                              className="h-8 w-8 p-0 hover:bg-orange-50"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-3 py-1 min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity, 1)
                              }
                              className="h-8 w-8 p-0 hover:bg-orange-50"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg text-sky-600">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            ₹{item.price} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}

          {/* Promo Code */}
          {cartItems.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Tag className="h-5 w-5 text-pink-500" />
                  <h3 className="font-semibold">Apply Promo Code</h3>
                </div>
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter promo code (try SAVE20)"
                    value={promoInput}
                    onChange={(e) =>
                      setPromoInput(e.target.value.toUpperCase())
                    }
                    className="flex-1"
                  />
                  <Button onClick={applyPromo} variant="outline">
                    Apply
                  </Button>
                </div>
                {promoApplied && (
                  <p className="text-green-600 text-sm mt-2">
                    ✓ Promo code applied successfully!
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary - Sticky */}
        {cartItems.length > 0 && (
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>₹{orderSummary.subtotal.toLocaleString()}</span>
                    </div>

                    {orderSummary.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-₹{orderSummary.discount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxes & Fees</span>
                      <span>₹{orderSummary.taxes.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span
                        className={
                          orderSummary.deliveryFee === 0 ? "text-green-600" : ""
                        }
                      >
                        {orderSummary.deliveryFee === 0
                          ? "FREE"
                          : `₹${orderSummary.deliveryFee}`}
                      </span>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-sky-600">
                        ₹{orderSummary.total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={onNext}
                    className="group relative w-full justify-center mt-6 inline-flex items-center overflow-hidden rounded-sm bg-cyan-500 px-8 py-3 text-white focus:ring-3 focus:outline-hidden mr-3"
                  >
                    <span className="absolute -start-full transition-all group-hover:start-4">
                      <ArrowRight size={15} />
                    </span>

                    <span className="text-sm font-medium text-center transition-all group-hover:ms-4">
                      Proceed to Delivery
                    </span>
                  </button>

                  <p className="text-sm text-gray-500  mt-3">
                    Free delivery on orders above ₹500
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
