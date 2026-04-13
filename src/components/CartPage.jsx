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
  MapPin,
  Store,
  Globe,
  Info,
  ShieldCheck,
  CreditCard,
  ShoppingBag,
  Zap,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

// Delivery Section Definitions
const DELIVERY_CONFIG = {
  local: {
    id: "local",
    title: "Quick Delivery",
    subtitle: "⚡ Delivered within 10 km via Rapido",
    description: "Real-time delivery for instant cravings.",
    icon: <Zap className="w-5 h-5" />,
    badgeClass: "bg-amber-100 text-amber-700 border-amber-200",
    badgeText: "⚡ Quick Delivery",
    fee: 35,
    freeAbove: 500,
    cta: "Deliver Now",
  },
  pickup: {
    id: "pickup",
    title: "Pickup Only",
    subtitle: "Store Collection",
    description: "Collect your fresh treats directly from our oven.",
    icon: <Store className="w-5 h-5" />,
    badgeClass: "bg-orange-100 text-orange-700 border-orange-200",
    badgeText: "Pickup Only",
    fee: 0,
    freeAbove: 0,
  },
  state: {
    id: "state",
    title: "Tamil Nadu Delivery",
    subtitle: "Across the State",
    description: "Courier delivery in 1-2 business days.",
    icon: <Truck className="w-5 h-5" />,
    badgeClass: "bg-blue-100 text-blue-700 border-blue-200",
    badgeText: "TN Courier",
    fee: 60,
    freeAbove: 1000,
  },
  national: {
    id: "national",
    title: "Essentials",
    subtitle: "Delivered across India 🇮🇳",
    description: "Baking essentials delivered in 3-5 business days.",
    icon: <Globe className="w-5 h-5" />,
    badgeClass: "bg-purple-100 text-purple-700 border-purple-200",
    badgeText: "Pan India",
    fee: 80,
    freeAbove: 1500,
    cta: "Ship Across India",
  },
};

const CartItemCard = ({ item, updateQuantity, removeCartItem }) => {
  const dType =
    item.type === "essential" ? "national" : item.deliveryType || "local";
  const config = DELIVERY_CONFIG[dType] || DELIVERY_CONFIG.local;

  return (
    <div className="group relative flex items-center gap-4 p-5 mb-4 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-500 overflow-hidden">
      {/* Product Image */}
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
        <img
          src={item.image || "/images/fallback.png"}
          alt={item.name}
          className="w-full h-full object-cover rounded-xl shadow-sm border border-gray-50 transform group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/fallback.png";
          }}
        />
      </div>

      {/* Item Info (Middle) */}
      <div className="flex-1 min-w-0 pr-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-black text-gray-900 truncate tracking-tight">
            {item.name}
          </h3>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            {item.category ||
              (item.type === "essential" ? "Essential" : "Bakery Product")}
          </p>
          <div className="mt-2 text-left">
            <Badge
              variant="outline"
              className={`text-[9px] px-2 py-0.5 h-auto font-black uppercase tracking-widest border-2 shadow-sm ${config.badgeClass}`}
            >
              {config.badgeText}
            </Badge>
          </div>
        </div>
      </div>

      {/* Item Controls (Right) */}
      <div className="flex flex-col items-end gap-3 shrink-0">
        <div className="text-right">
          <p className="text-xl font-black text-gray-900 leading-none tracking-tighter">
            ₹{(item.price * item.quantity).toLocaleString()}
          </p>
          <p className="text-[10px] text-gray-400 font-black mt-1 uppercase tracking-widest">
            ₹{item.price} / unit
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-gray-50 rounded-xl border border-gray-100 p-1 shadow-inner">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white rounded-lg transition-all shadow-sm"
            >
              <Minus size={14} strokeWidth={3} />
            </button>
            <span className="w-8 text-center text-sm font-black text-gray-900">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-green-600 hover:bg-white rounded-lg transition-all shadow-sm"
            >
              <Plus size={14} strokeWidth={3} />
            </button>
          </div>

          <button
            onClick={() => {
              removeCartItem(item.id);
              toast.success("Item removed from cart");
            }}
            className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100 active:scale-95"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const TabContent = ({
  items,
  updateQuantity,
  removeCartItem,
  emptyMessage,
  emptySub,
  emptyIcon,
}) => {
  if (!items || items.length === 0) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center text-gray-200 mb-6 shadow-inner border border-gray-100">
          {emptyIcon}
        </div>
        <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">
          {emptyMessage}
        </h3>
        <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-8">
          {emptySub}
        </p>
        <Link
          to="/categories"
          className="inline-flex items-center justify-center h-12 px-8 rounded-2xl bg-gray-900 text-white font-black uppercase text-[10px] tracking-widest hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-200"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {items.map((item) => (
        <CartItemCard
          key={item.id}
          item={item}
          updateQuantity={updateQuantity}
          removeCartItem={removeCartItem}
        />
      ))}
    </div>
  );
};

const TabbedCart = ({
  cartItems,
  updateCartItem,
  removeCartItem,
  onNext,
  promoCode,
  applyPromo,
  promoInput,
  setPromoInput,
}) => {
  const { handleProtectedAction } = useAuth();
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeTab, setActiveTab] = useState("bakery");

  const handleCheckout = () => {
    handleProtectedAction(async () => {
      try {
        setIsExecuting(true);
        await onNext(getDeliveryTypeForCheckout());
      } finally {
        setIsExecuting(false);
      }
    });
  };

  const filteredItems = useMemo(() => {
    return {
      bakery: cartItems.filter(
        (item) =>
          item.type !== "essential" &&
          (item.deliveryType === "pickup" || item.deliveryType === "state"),
      ),
      quick: cartItems.filter(
        (item) => item.type !== "essential" && item.deliveryType === "local",
      ),
      essential: cartItems.filter((item) => item.type === "essential"),
    };
  }, [cartItems]);

  const activeTabData = filteredItems[activeTab];

  // Dynamic Summary Calculations
  const subtotal = activeTabData.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = promoCode === "SAVE20" ? subtotal * 0.2 : 0;

  const deliveryConfig =
    activeTab === "essential"
      ? DELIVERY_CONFIG.national
      : activeTab === "quick"
        ? DELIVERY_CONFIG.local
        : activeTabData.some((i) => i.deliveryType === "state")
          ? DELIVERY_CONFIG.state
          : DELIVERY_CONFIG.pickup;

  const deliveryFee =
    subtotal > 0 && subtotal < deliveryConfig.freeAbove
      ? deliveryConfig.fee
      : 0;
  const grandTotal = subtotal - discount + deliveryFee;

  const getCtaLabel = () => {
    if (activeTab === "bakery") return "Proceed (Pickup / TN Delivery)";
    if (activeTab === "quick") return "Deliver Now";
    return "Ship Across India";
  };

  const getDeliveryTypeForCheckout = () => {
    if (activeTab === "essential") return "essential";
    if (activeTab === "quick") return "local";
    // For bakery, it could be pickup or state. Default to pickup if any pickup item exists, else state
    if (activeTabData.some((i) => i.deliveryType === "pickup")) return "pickup";
    return "state";
  };

  const tabs = [
    {
      id: "bakery",
      label: "Bakery",
      // icon: "🧁",
      count: filteredItems.bakery.length,
    },
    {
      id: "quick",
      label: "Quick Delivery",
      // icon: "⚡",
      count: filteredItems.quick.length,
    },
    {
      id: "essential",
      label: "Essentials",
      // icon: "🛍",
      count: filteredItems.essential.length,
    },
  ];

  return (
    <div className="grid lg:grid-cols-12 gap-10 items-start">
      {/* Tab Selection (Main Content Area) */}
      <div className="lg:col-span-8">
        {/* Sticky Tab Bar */}
        <div className="sticky top-[80px] md:top-[112px] z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 rounded-b-3xl shadow-sm mb-8 overflow-x-auto no-scrollbar">
          <div className="flex px-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative cursor-pointer flex items-center gap-2 px-6 py-5 whitespace-nowrap group transition-all duration-300`}
              >
                {/* <span className="text-lg">{tab.icon}</span> */}
                <span
                  className={`text-[11px] font-black uppercase tracking-[0.15em] ${activeTab === tab.id ? "text-gray-900" : "text-gray-400 group-hover:text-gray-600"}`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="ml-2 text-[10px] font-black text-[#870D32] bg-pink-50 px-1.5 py-0.5 rounded-md">
                      {tab.count}
                    </span>
                  )}
                </span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-sbrown rounded-t-full shadow-[0_-4px_10px_rgba(135,13,50,0.3)] animate-in slide-in-from-left duration-300"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Highlight Banner */}
        {activeTab === "quick" && activeTabData.length > 0 && (
          <div className="mb-6 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-amber-500 shadow-sm border border-amber-100">
              <Zap size={20} />
            </div>
            <div>
              <p className="text-xs font-black text-amber-900 uppercase tracking-wider">
                ⚡ Super Fast Delivery
              </p>
              <p className="text-[10px] text-amber-700 font-bold leading-relaxed">
                {DELIVERY_CONFIG.local.subtitle}
              </p>
            </div>
          </div>
        )}

        {/* Tab Content Rendering */}
        <div className="min-h-[400px]">
          {activeTab === "bakery" && (
            <TabContent
              items={filteredItems.bakery}
              updateQuantity={updateCartItem}
              removeCartItem={removeCartItem}
              emptyMessage="No Bakery Items Found"
              emptySub="Sweet treats are waiting to be added"
              emptyIcon={<Cake size={40} />}
            />
          )}
          {activeTab === "quick" && (
            <TabContent
              items={filteredItems.quick}
              updateQuantity={updateCartItem}
              removeCartItem={removeCartItem}
              emptyMessage="No Quick Delivers"
              emptySub="Instant cravings are just a click away"
              emptyIcon={<Zap size={40} />}
            />
          )}
          {activeTab === "essential" && (
            <TabContent
              items={filteredItems.essential}
              updateQuantity={updateCartItem}
              removeCartItem={removeCartItem}
              emptyMessage="Essentials Cart is Empty"
              emptySub="Quality tools for professional baking"
              emptyIcon={<ShoppingBag size={40} />}
            />
          )}
        </div>
      </div>

      {/* Dynamic Summary Sidebar */}
      <div className="lg:col-span-4 sticky top-36">
        <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white border border-gray-100">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-xl text-gray-900 tracking-tight">
                Order Summary
              </h3>
              <Badge
                variant="secondary"
                className="bg-gray-50 text-gray-400 font-black text-[10px] uppercase tracking-widest px-3"
              >
                {activeTab}
              </Badge>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                  Subtotal
                </span>
                <span className="font-black text-gray-900">
                  ₹{subtotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest transition-colors">
                  {deliveryConfig.title} Fee
                </span>
                <span
                  className={`font-black ${deliveryFee === 0 ? "text-green-600" : "text-gray-900"}`}
                >
                  {deliveryFee === 0
                    ? "FREE"
                    : `₹${deliveryFee.toLocaleString()}`}
                </span>
              </div>

              {promoCode === "SAVE20" && subtotal > 0 && (
                <div className="flex justify-between items-center text-green-600 font-black">
                  <span className="text-[10px] uppercase tracking-widest">
                    20% Discount
                  </span>
                  <span>-₹{discount.toLocaleString()}</span>
                </div>
              )}

              <Separator className="bg-gray-100" />

              <div className="pt-2">
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="COUPON CODE"
                    value={promoInput}
                    onChange={(e) =>
                      setPromoInput(e.target.value.toUpperCase())
                    }
                    className="flex-1 h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-black uppercase tracking-widest focus:ring-2 focus:ring-[#870D32]/10 outline-none transition-all placeholder:text-gray-300"
                  />
                  <button
                    onClick={() => applyPromo(subtotal)}
                    className="h-12 px-6 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black active:scale-95 transition-all shadow-md"
                  >
                    Apply
                  </button>
                </div>

                <div className="flex justify-between items-end mb-8 mt-10">
                  <span className="text-lg font-bold text-gray-900 tracking-tighter">
                    Total Price
                  </span>
                  <span className="text-4xl font-bold text-gray-900 tracking-tighter tabular-nums leading-none">
                    ₹ {grandTotal.toLocaleString()}
                  </span>
                </div>

                <Button
                  disabled={activeTabData.length === 0}
                  onClick={() => onNext(getDeliveryTypeForCheckout())}
                  className="w-full h-16 rounded-2xl bg-sbrown hover:bg-pbrown text-white font-black uppercase tracking-[0.15em] text-xs  transition-all hover:-translate-y-1 active:scale-[0.98] disabled:opacity-30 disabled:translate-y-0"
                >
                  {getCtaLabel()}
                  <ArrowRight
                    size={18}
                    className="ml-3 group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 flex gap-3 border border-gray-100">
              <ShieldCheck size={18} className="text-gray-400 shrink-0" />
              <p className="text-[9px] font-bold text-gray-500 uppercase leading-relaxed tracking-wider">
                Shop securely. Your data is encrypted with enterprise-grade SSL
                protection.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
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

  const applyPromo = (currentSubtotal) => {
    if (currentSubtotal === 0) return;
    if (promoInput === "SAVE20") {
      setPromoCode(promoInput);
      toast.success("20% DISCOUNT APPLIED!", {
        style: {
          borderRadius: "1rem",
          background: "#FFF",
          color: "#870D32",
          fontWeight: "900",
          fontSize: "12px",
        },
      });
    } else {
      setPromoCode("");
      toast.error("Invalid coupon code");
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 50) return;
    updateCartItem(itemId, newQuantity);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-4xl text-center flex flex-col items-center justify-center min-h-[70vh]">
        <div className="mb-8 relative scale-110">
          <div className="absolute inset-0 bg-pink-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="relative w-40 h-40 rounded-full bg-white shadow-2xl flex items-center justify-center text-pink-200 border border-pink-50">
            <ShoppingCart size={72} strokeWidth={1} />
          </div>
        </div>
        <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tighter">
          Your cart is empty
        </h3>
        <p className="text-gray-400 mb-12 max-w-sm mx-auto font-black uppercase tracking-[0.2em] text-[10px] leading-loose">
          Looks like you haven't made your choice yet. <br /> Our fresh bakers
          are waiting for your call!
        </p>
        <Link
          to="/categories"
          className="inline-flex items-center justify-center h-16 px-12 rounded-2xl bg-[#870D32] text-white font-black uppercase text-xs tracking-[0.2em] hover:shadow-2xl hover:shadow-red-200 transition-all active:scale-95 group"
        >
          Explore Menu
          <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pb-24">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-[#FFF5E1] via-[#FAF9F6] to-[#fafafa] pointer-events-none -z-10"></div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Simplified Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between items-start gap-4 px-2">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-1.5 bg-sbrown rounded-full shadow-sm shadow-red-100"></span>
              <span className="text-[11px] font-black text-pbrown uppercase tracking-[0.25em]">
                Checkout Essentials
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter mb-4 flex items-center gap-6">
              Cart
              <span className="text-lg md:text-xl font-black text-gray-300 bg-white border border-gray-100 px-4 py-1 rounded-2xl shadow-sm tracking-widest align-middle flex items-center h-min translate-y-2 md:translate-y-4">
                {cartItems.length}
              </span>
            </h1>
          </div>
          <div className="hidden md:flex flex-col items-end gap-2 text-right opacity-60">
            <div className="flex items-center gap-2 text-gray-400">
              <ShieldCheck size={16} />
              <span className="text-[9px] uppercase font-black tracking-widest">
                Secure Gateway
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="md:w-10 md:h-6 bg-gray-100 rounded h-1.5 w-8"></div>
              <div className="md:w-10 md:h-6 bg-gray-100 rounded h-1.5 w-12"></div>
              <div className="md:w-10 md:h-6 bg-gray-100 rounded h-1.5 w-6"></div>
            </div>
          </div>
        </div>

        {/* Tabbed UI Component */}
        <TabbedCart
          cartItems={cartItems}
          updateCartItem={handleQuantityChange}
          removeCartItem={removeCartItem}
          onNext={onNext}
          promoCode={promoCode}
          applyPromo={applyPromo}
          promoInput={promoInput}
          setPromoInput={setPromoInput}
        />
      </div>
    </div>
  );
}
