import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  User,
  Phone,
  MapPin,
  ChevronRight,
  Plus,
  ArrowRight,
  AlertCircle,
  LayoutGrid,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";

const STATUS_COLUMNS = [
  {
    id: "confirmed",
    label: "New Orders",
    icon: Plus,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "preparing",
    label: "Preparing",
    icon: Clock,
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: "packed",
    label: "Packed",
    icon: Package,
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "out_for_delivery",
    label: "Out for Delivery",
    icon: Truck,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "delivered",
    label: "Delivered",
    icon: CheckCircle,
    color: "bg-gray-100 text-gray-700",
  },
];

function OrdersAdmin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [activeTab, setActiveTab] = useState("confirmed"); // For mobile view

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      setLoading(true);
      let res = await axios.get(`${import.meta.env.VITE_API_URL}/orders`);
      setOrders(res.data.orders);
    } catch (err) {
      console.error("Error fetching Orders:", err);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }

  const updateOrderStatus = async (orderId, newStatus, deliveryPartner = null) => {
    setUpdatingId(orderId);
    try {
      const updateData = { orderStatus: newStatus };
      if (deliveryPartner) {
        updateData.deliveryPartner = deliveryPartner;
      }

      await axios.patch(`${import.meta.env.VITE_API_URL}/orders/${orderId}`, updateData);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? {
                ...order,
                orderStatus: newStatus,
                deliveryPartner: deliveryPartner || order.deliveryPartner,
              }
            : order,
        ),
      );

      toast.success(`Order status: ${newStatus.replace(/_/g, " ")}`);
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const isNew = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    return now - date < 15 * 60 * 1000; // 15 minutes
  };

  if (loading && orders.length === 0) {
    return (
      <div className="flex items-center justify-center bg-[#fef9ec]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#870D32]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#fef9ec] h-screen flex overflow-hidden font-sans">
      <Sidebar />
      <Toaster position="bottom-right" />

      <div className="flex-1 flex flex-col min-w-0 ml-16 md:ml-20">
        {/* Refined Header */}
        <header className="h-20 flex-shrink-0 flex items-center justify-between px-6 md:px-10 bg-white border-b border-pink-100/50 z-10">
          <div>
            <h1 className="text-xl md:text-2xl font-bold new-primary-text lora flex items-center gap-2">
              <LayoutGrid size={24} /> Orders Management
            </h1>
            <p className="hidden md:flex text-[10px] text-gray-500 font-black uppercase tracking-widest items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Tracking System
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex bg-pink-50 px-3 py-1.5 rounded-xl border border-pink-100 items-center gap-2">
              <span className="text-[10px] font-black text-pink-600 uppercase">
                Active
              </span>
              <span className="text-sm font-black new-primary-text leading-none">
                {orders.filter((o) => o.orderStatus !== "delivered").length}
              </span>
            </div>
            <button
              onClick={fetchOrders}
              className="p-2 sm:p-2.5 bg-white border border-gray-200 rounded-xl hover:border-[#870D32] hover:text-[#870D32] transition-colors shadow-sm"
              title="Refresh Orders"
            >
              <ArrowRight size={18} className="rotate-90" />
            </button>
          </div>
        </header>

        {/* Mobile Tab Navigation */}
        <div className="md:hidden flex bg-white overflow-x-auto border-b border-gray-100 no-scrollbar sticky top-0 z-30">
          {STATUS_COLUMNS.map((col) => (
            <button
              key={col.id}
              onClick={() => setActiveTab(col.id)}
              className={`flex-shrink-0 px-6 py-4 text-xs font-black uppercase tracking-wider transition-all border-b-2 flex items-center gap-2 ${activeTab === col.id ? "border-[#870D32] text-[#870D32]" : "border-transparent text-gray-400"}`}
            >
              {col.label}
              <span className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px]">
                {orders.filter((o) => o.orderStatus === col.id).length}
              </span>
            </button>
          ))}
        </div>

        {/* Kanban Board */}
        <main className="flex-1 overflow-hidden p-3 md:p-6 lg:p-8">
          <div className="flex gap-4 md:gap-6 h-full overflow-x-auto pb-4 ">
            {STATUS_COLUMNS.map((column) => (
              <div
                key={column.id}
                className={`flex-shrink-0 w-full md:w-[320px] lg:w-[350px] h-full flex flex-col bg-gray-50/50 rounded-[32px] border border-gray-200/50 ${activeTab !== column.id ? "hidden md:flex" : "flex"}`}
              >
                {/* Column Header */}
                <div className="p-4 md:p-5 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur rounded-t-[32px] border-b border-gray-100 z-10">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${column.color} shadow-sm`}>
                      <column.icon size={18} />
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm md:text-base tracking-tight">
                      {column.label}
                    </h3>
                  </div>
                  <span className="bg-gray-200/50 text-gray-600 px-2.5 py-1 rounded-lg text-xs font-black min-w-[32px] text-center">
                    {orders.filter((o) => o.orderStatus === column.id).length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="flex-1 p-3 md:p-4 overflow-y-auto space-y-4 custom-scrollbar">
                  <AnimatePresence mode="popLayout">
                    {orders
                      .filter((o) => o.orderStatus === column.id)
                      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                      .map((order) => (
                        <OrderCard
                          key={order._id}
                          order={order}
                          updateStatus={updateOrderStatus}
                          updatingId={updatingId}
                          getTimeAgo={getTimeAgo}
                          isNew={isNew(order.createdAt)}
                        />
                      ))}
                  </AnimatePresence>

                  {orders.filter((o) => o.orderStatus === column.id).length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center py-24 opacity-30 select-none">
                      <div className="p-5 bg-gray-200 rounded-full mb-4">
                        <AlertCircle size={32} className="text-gray-400" />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                        Queue Empty
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

function OrderCard({ order, updateStatus, updatingId, getTimeAgo, isNew }) {
  const [showPartnerForm, setShowPartnerForm] = useState(false);
  const [partnerData, setPartnerData] = useState({
    name: "",
    phone: "",
    vehicle: "Bike",
  });

  const handleStartDelivery = (e) => {
    e.preventDefault();
    if (!partnerData.name || !partnerData.phone) {
      toast.error("Please fill partner details");
      return;
    }
    updateStatus(order._id, "out_for_delivery", partnerData);
    setShowPartnerForm(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
      className={`bg-white rounded-[28px] p-5 md:p-6 border border-gray-100 shadow-sm relative overflow-hidden group transition-all hover:shadow-xl hover:shadow-[#870D32]/5 ${order.orderStatus === "delivered" ? "opacity-60 saturate-0" : ""}`}
    >
      {isNew && (
        <div className="absolute top-0 right-0 w-1.5 h-full bg-[#870D32] md:opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
      )}

      {/* Card Header */}
      <div className="flex justify-between items-start mb-5 relative z-10">
        <div className="flex flex-col min-w-0">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            Order ID: #{order._id.slice(-6).toUpperCase()}
          </span>
          <h4 className="font-bold text-gray-900 text-base md:text-lg flex items-center gap-2 group-hover:text-[#870D32] transition-colors leading-tight truncate">
            {order.name}
          </h4>
        </div>
        <div className="shrink-0 flex items-center gap-1.5 text-gray-400 font-bold text-[9px] md:text-[10px] bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
          <Clock size={10} />
          {getTimeAgo(order.createdAt)}
        </div>
      </div>

      {/* Customer Info */}
      <div className="space-y-3 mb-6 border-l-2 border-pink-50 pl-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <Phone size={13} className="text-[#870D32]/60 shrink-0" />
          <span className="text-xs font-bold text-gray-600">
            {order.shippingAddress?.phone || "No Phone"}
          </span>
        </div>
        <div className="flex items-start gap-2.5">
          <MapPin size={13} className="text-[#870D32]/60 shrink-0 mt-0.5" />
          <span className="text-xs font-medium text-gray-500 leading-snug line-clamp-2">
            {order.shippingAddress?.address}, {order.shippingAddress?.city}
          </span>
        </div>
      </div>

      {/* Product List */}
      <div className="bg-[#fdfbf7] rounded-[22px] p-4 mb-6 space-y-2.5 border border-[#f5efdf]/50 relative z-10">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[8px] font-black text-gray-300 uppercase tracking-[0.2em]">
            Baker's List
          </span>
          <span className="bg-white/80 px-2 py-0.5 rounded text-[9px] font-bold text-[#870D32]">
            {order.products.length} Items
          </span>
        </div>

        {order.products.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-gray-700">
              <span className="truncate pr-4">
                • {item.productId?.title || item.productId?.name}
              </span>
              <span className="shrink-0 text-[#870D32] font-black tracking-tighter">
                × {item.quantity}
              </span>
            </div>
            <div className="pt-3 mt-3 border-t border-dashed border-gray-200/80 flex justify-between items-center">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                Total Price
              </span>
              <span className="text-lg md:text-xl font-black text-[#870D32]">
                ₹{item.price || order.pricing?.totalAmount}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="min-h-[56px] flex items-end relative z-10">
        {updatingId === order._id ? (
          <div className="w-full py-4 bg-gray-50 rounded-2xl flex items-center justify-center gap-3 border border-gray-100">
            <div className="w-4 h-4 border-2 border-gray-200 border-t-[#870D32] rounded-full animate-spin"></div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Processing...
            </span>
          </div>
        ) : (
          <div className="w-full">
            {order.orderStatus === "confirmed" && (
              <button
                onClick={() => updateStatus(order._id, "preparing")}
                className="w-full py-4 bg-[#870D32] text-white rounded-2xl text-[11px] font-black tracking-[0.1em] uppercase shadow-lg shadow-[#870D32]/10 hover:shadow-[#870D32]/25 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                START PREPARING <ArrowRight size={15} />
              </button>
            )}

            {order.orderStatus === "preparing" && (
              <button
                onClick={() => updateStatus(order._id, "packed")}
                className="w-full py-4 bg-orange-500 text-white rounded-2xl text-[11px] font-black tracking-[0.1em] uppercase shadow-lg shadow-orange-500/10 hover:bg-orange-600 hover:scale-[1.01] active:scale-95 transition-all"
              >
                MARK AS PACKED
              </button>
            )}

            {order.orderStatus === "packed" && !showPartnerForm && (
              <button
                onClick={() => setShowPartnerForm(true)}
                className="w-full py-4 bg-purple-600 text-white rounded-2xl text-[11px] font-black tracking-[0.1em] uppercase shadow-lg shadow-purple-600/10 hover:bg-purple-700 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                ASSIGN PARTNER <Truck size={15} />
              </button>
            )}

            {showPartnerForm && (
              <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2.5 p-3.5 bg-gray-50 rounded-[22px] border border-gray-200"
                onSubmit={handleStartDelivery}
              >
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Partner Name"
                    className="w-full p-3 text-xs bg-white border border-gray-200 rounded-xl focus:border-purple-300 focus:outline-none transition-all"
                    value={partnerData.name}
                    onChange={(e) =>
                      setPartnerData({ ...partnerData, name: e.target.value })
                    }
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Partner Phone"
                    className="w-full p-3 text-xs bg-white border border-gray-200 rounded-xl focus:border-purple-300 focus:outline-none transition-all"
                    value={partnerData.phone}
                    onChange={(e) =>
                      setPartnerData({ ...partnerData, phone: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-purple-600 text-white rounded-xl text-[10px] font-black uppercase"
                  >
                    START
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPartnerForm(false)}
                    className="px-4 py-2.5 bg-white text-gray-400 rounded-xl text-[10px] font-black border border-gray-100"
                  >
                    X
                  </button>
                </div>
              </motion.form>
            )}

            {order.orderStatus === "out_for_delivery" && (
              <div className="space-y-3.5 w-full">
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-2xl border border-emerald-100/50 shadow-sm shadow-emerald-900/5 hover:bg-emerald-100/50 transition-colors">
                  <div className="shrink-0 p-2 bg-white rounded-xl text-emerald-600 shadow-sm border border-emerald-50">
                    <Truck size={15} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black text-gray-700 uppercase truncate tracking-tight">
                      {order.deliveryPartner?.name || "Partner Name"}
                    </p>
                    <p className="text-[9px] font-bold text-gray-400 leading-none mt-0.5">
                      {order.deliveryPartner?.phone}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => updateStatus(order._id, "delivered")}
                  className="w-full py-4 bg-emerald-600 text-white rounded-2xl text-[11px] font-black tracking-[0.1em] uppercase shadow-lg shadow-emerald-600/10 hover:bg-emerald-700 transition-all active:scale-95"
                >
                  Confirm Delivery
                </button>
              </div>
            )}

            {order.orderStatus === "delivered" && (
              <div className="w-full py-4 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center gap-2.5 border border-emerald-100 select-none">
                <CheckCircle size={18} />
                <span className="text-[10px] font-black uppercase tracking-[0.15em]">
                  Order Completed
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default OrdersAdmin;
