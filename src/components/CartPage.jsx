import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  ArrowRight,
  Cake,
  Truck,
  Zap,
  Info,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import toast from "react-hot-toast";

const CartItem = ({ item, updateQuantity, removeCartItem }) => (
  <div className="flex gap-4 py-4 group">
    {/* Product Image */}
    <div className="relative flex-shrink-0">
      <img
        src={item.image || "/images/cake-2.jpg"}
        alt={item.name}
        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl shadow-sm border border-gray-100 group-hover:scale-105 transition-transform duration-300"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/images/cake-2.jpg";
        }}
      />
    </div>

    {/* Details */}
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-start mb-1">
        <div>
          <h3 className="font-bold text-gray-900 truncate pr-2">
            {item.name}
          </h3>
          <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">
            {item.description}
          </p>
        </div>
        <button
          onClick={() => {
            removeCartItem(item.id);
            toast.success("Item removed from cart");
          }}
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="flex justify-between items-center mt-3">
        {/* Quantity Controls */}
        <div className="flex items-center bg-gray-50 rounded-lg border border-gray-100 p-0.5 shadow-inner">
          <button
            onClick={() => updateQuantity(item.id, item.quantity, -1)}
            disabled={item.quantity <= 1}
            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-pink-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white rounded-md transition-all"
          >
            <Minus size={14} />
          </button>
          <span className="w-8 text-center text-sm font-bold text-gray-800">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity, 1)}
            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-pink-600 hover:bg-white rounded-md transition-all"
          >
            <Plus size={14} />
          </button>
        </div>

        <div className="text-right">
          <p className="font-extrabold text-blue-600">
            ₹{(item.price * item.quantity).toLocaleString()}
          </p>
          <p className="text-[10px] text-gray-400 font-medium tracking-tight">
            ₹{item.price} each
          </p>
        </div>
      </div>
    </div>
  </div>
);

const CartSection = ({
  title,
  subtitle,
  items,
  type,
  onCheckout,
  updateQuantity,
  removeCartItem,
}) => {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const isBakery = type === "bakery";
  const deliveryFee = isBakery ? 35 : 50; // Dynamic or flat logic
  const isFreeDelivery = isBakery ? subtotal > 500 : subtotal > 1000;
  const deliveryCost = isFreeDelivery ? 0 : deliveryFee;
  const total = subtotal + deliveryCost;

  if (items.length === 0) return null;

  return (
    <Card
      className={`border-none shadow-xl overflow-hidden mb-8 transition-all hover:shadow-2xl duration-500 ${
        isBakery ? "bg-orange-50/30" : "bg-blue-50/20"
      }`}
    >
      <div className="p-5 md:p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
                {title}
              </h2>
              <Badge
                variant="outline"
                className={`text-[10px] px-2 py-0 h-5 border-none font-bold uppercase tracking-wider ${
                  isBakery ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"
                }`}
              >
                {isBakery ? (
                  <span className="flex items-center gap-1">
                    <Zap size={10} className="fill-current" /> Fast Delivery
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Truck size={10} className="fill-current" /> Standard Shipping
                  </span>
                )}
              </Badge>
            </div>
            <p className="text-gray-500 text-xs font-medium flex items-center gap-1.5 uppercase tracking-wide">
              {subtitle}
            </p>
          </div>
          <p className="text-[10px] text-gray-400 bg-white/60 px-2 py-1 rounded-full border border-gray-100 backdrop-blur-sm shadow-sm backdrop-saturate-200">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        </div>

        {/* Item List */}
        <div className="space-y-1 divide-y divide-gray-100/50">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              removeCartItem={removeCartItem}
            />
          ))}
        </div>

        {/* Section Summary */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex flex-col gap-2.5 mb-6">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="font-bold text-gray-800 tracking-tight">₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 font-medium">Delivery Fee</span>
              <span
                className={`font-bold tracking-tight ${
                  deliveryCost === 0 ? "text-green-600" : "text-gray-800"
                }`}
              >
                {deliveryCost === 0 ? "FREE" : `₹${deliveryCost}`}
              </span>
            </div>
            <Separator className="my-1 bg-gray-100/50" />
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-900 text-lg tracking-tight">Total</span>
              <span className="text-xl font-black text-gray-900 tracking-tighter">
                ₹{total.toLocaleString()}
              </span>
            </div>
          </div>

          <button
            onClick={onCheckout}
            className={`group relative w-full h-12 md:h-14 flex items-center justify-center overflow-hidden rounded-2xl text-white font-bold text-base transition-all active:scale-95 shadow-lg shadow-gray-200 ${
              isBakery
                ? "bg-pbrown hover:bg-sbrown"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <span className="z-10 flex items-center gap-2">
              Proceed to {isBakery ? "Delivery" : "Courier Selection"}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>
        </div>
      </div>
    </Card>
  );
};

export function CartPage({
  cartItems,
  updateCartItem,
  removeCartItem,
  onNext,
  promoCode,
  setPromoCode,
}) {
  const [promoInput, setPromoInput] = useState(promoCode || "");
  const [promoApplied, setPromoApplied] = useState(!!promoCode);

  const applyPromo = () => {
    if (promoInput === "SAVE20") {
      setPromoCode(promoInput);
      setPromoApplied(true);
      toast.success("20% DISCOUNT APPLIED!");
    } else {
      setPromoCode("");
      setPromoApplied(false);
      toast.error("Invalid promo code");
    }
  };
  const bakeryItems = useMemo(
    () => cartItems.filter((i) => i.type === "bakery"),
    [cartItems]
  );
  const essentialItems = useMemo(
    () => cartItems.filter((i) => i.type === "essential"),
    [cartItems]
  );

  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleQuantityChange = (itemId, currentQuantity, change) => {
    const newQuantity = Number(currentQuantity) + change;
    if (newQuantity < 1 || newQuantity > 50) return;
    updateCartItem(itemId, newQuantity);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-4xl text-center">
        <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-50 text-gray-200">
          <ShoppingCart className="h-12 w-12" />
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 tracking-tight">Your cart is feeling light</h3>
        <p className="text-gray-500 mb-10 max-w-sm mx-auto font-medium">
          Fresh from the oven, our cakes are waiting for you. Let's add some sweetness!
        </p>
        <Link
          to={`/categories`}
          className="inline-flex items-center justify-center h-14 px-10 rounded-2xl bg-pbrown text-white font-bold hover:bg-sbrown transition-all active:scale-95 shadow-xl shadow-orange-100"
        >
          <span className="flex items-center gap-2">
            <Cake size="18" /> Browse Products
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <div className="container mx-auto px-4 py-8 max-w-7xl pt-24 md:pt-32">
        {/* Header */}
        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-2">
              My Cart
            </h1>
            <p className="text-gray-500 font-semibold uppercase tracking-widest text-[10px] md:text-xs">
              Review items and choose checkout path
            </p>
          </div>
          <div className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-white rounded-2xl shadow-sm border border-gray-100">
            <Info size={14} className="text-blue-500" />
            <p className="text-[11px] text-gray-500 font-bold tracking-tight">
              Different delivery types will arrive separately
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-2">
            {/* Bakery Section */}
            {bakeryItems.length > 0 && (
              <CartSection
                title="Bakery Items"
                subtitle="Express Delivery in 60 mins"
                items={bakeryItems}
                type="bakery"
                onCheckout={() => onNext("bakery")}
                updateQuantity={handleQuantityChange}
                removeCartItem={removeCartItem}
              />
            )}

            {bakeryItems.length > 0 && essentialItems.length > 0 && (
              <div className="flex items-center justify-center py-4 opacity-30 select-none">
                <Separator className="w-12 bg-gray-300" />
                <span className="mx-4 text-gray-400 font-bold text-xs uppercase tracking-widest">or</span>
                <Separator className="w-12 bg-gray-300" />
              </div>
            )}

            {/* Essentials Section */}
            {essentialItems.length > 0 && (
              <CartSection
                title="Baking Essentials"
                subtitle="Courier Delivery in 3-5 Days"
                items={essentialItems}
                type="essential"
                onCheckout={() => onNext("essential")}
                updateQuantity={handleQuantityChange}
                removeCartItem={removeCartItem}
              />
            )}
          </div>

          {/* Sticky Total Summary (For context, optional individual sections have buttons) */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
            <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-white">
              <div className="p-6 md:p-8">
                <h3 className="font-extrabold text-xl text-gray-900 mb-6 flex items-center justify-between">
                  Overview
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-lg">Combined</span>
                </h3>
                
                <div className="space-y-4 mb-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium tracking-tight uppercase text-[10px]">Bakery subtotal</span>
                    <span className="font-bold text-gray-800 tracking-tight">
                      ₹{bakeryItems.reduce((s, i) => s + i.price * i.quantity, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium tracking-tight uppercase text-[10px]">Essentials subtotal</span>
                    <span className="font-bold text-gray-800 tracking-tight">
                      ₹{essentialItems.reduce((s, i) => s + i.price * i.quantity, 0).toLocaleString()}
                    </span>
                  </div>
                  
                  {promoCode === "SAVE20" && (
                    <div className="flex justify-between items-center text-sm text-green-600 font-bold bg-green-50/50 p-2 rounded-xl">
                      <span className="uppercase text-[10px]">Discount (20%)</span>
                      <span>-₹{(cartTotal * 0.2).toLocaleString()}</span>
                    </div>
                  )}

                  <Separator className="bg-gray-50" />
                  
                  {/* Promo Input */}
                  <div className="py-2">
                    <div className="flex gap-2 p-1.5 bg-gray-50 rounded-2xl border border-gray-100 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                      <input
                        type="text"
                        placeholder="Promo Code"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                        className="bg-transparent border-none focus:ring-0 text-xs font-bold px-2 py-1 flex-1 uppercase"
                      />
                      <button
                        onClick={applyPromo}
                        className="bg-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase text-gray-900 border border-gray-100 hover:bg-gray-100 transition-colors shadow-sm"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 rounded-3xl bg-blue-50/30 border border-blue-100/50">
                    <span className="text-gray-900 font-black tracking-tight">Grand Total</span>
                    <span className="text-3xl font-black text-blue-600 tracking-tighter">₹{(cartTotal - (promoCode === "SAVE20" ? cartTotal * 0.2 : 0)).toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100 mb-6">
                  <div className="flex gap-3">
                    <Info size={16} className="text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-orange-900 leading-tight">Delivery Note</p>
                      <p className="text-[10px] text-orange-700 mt-1 leading-relaxed">
                        Items from different sections will be processed as separate orders for optimized delivery.
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  to="/categories"
                  className="flex items-center justify-center gap-2 text-sm font-bold text-gray-400 hover:text-pbrown transition-colors group mb-2"
                >
                  Continue Shopping
                  <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </Card>

            {/* Support/Security Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-white/50 rounded-2xl border border-gray-100 text-center group transition-colors hover:bg-white cursor-default">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                     <Truck size={18} className="text-gray-400" />
                  </div>
                  <span className="text-[9px] font-black uppercase text-gray-500 tracking-tighter">Safe Shipping</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-white/50 rounded-2xl border border-gray-100 text-center group transition-colors hover:bg-white cursor-default">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                     <ShoppingCart size={18} className="text-gray-400" />
                  </div>
                  <span className="text-[9px] font-black uppercase text-gray-500 tracking-tighter">Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
