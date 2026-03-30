import { motion } from "framer-motion";
import { Badge } from "../../components/ui/badge";
import { useState, useEffect } from "react";
import { ShoppingBag, PackageOpen } from "lucide-react";
import api from "../../api"; // Using existing axios instance

const statusColors = {
  confirmed: "bg-blue-100 text-blue-700 border-blue-200",
  processing: "bg-orange-100 text-orange-700 border-orange-200",
  shipped: "bg-purple-100 text-purple-700 border-purple-200",
  delivered: "bg-green-100 text-green-700 border-green-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
};

export function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const response = await api.get("/my-orders");
        setOrders(response.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMyOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500 border-2 border-dashed border-gray-200 rounded-xl">
        <PackageOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-bold text-gray-600">No Orders Yet</h3>
        <p className="mt-1">Looks like you haven't bought anything yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {orders.map((order, index) => {
        // Find the main product details
        const mainProduct = order.products?.[0];
        
        // Handle potentially missing populated data gracefully
        const fallbackImage = "https://images.unsplash.com/photo-1559563458-527698bf5295?w=500&q=80";
        const image = mainProduct?.productId?.image || mainProduct?.productId?.thumbnail || fallbackImage;
        const title = mainProduct?.title || "Unknown Product";
        
        const isMultipleItems = order.products?.length > 1;
        const displayTitle = isMultipleItems 
          ? `${title} + ${order.products.length - 1} more items` 
          : title;

        const orderStatus = (order.orderStatus || "pending").toLowerCase();

        return (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50 border border-gray-100 flex items-center justify-center">
              {typeof image === "string" ? (
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ShoppingBag className="w-8 h-8 text-gray-300" />
              )}
            </div>

            <div className="flex-1 min-w-0 w-full">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-gray-900 font-bold text-base truncate pr-4">{displayTitle}</h4>
                <p className="font-bold text-gray-900 flex-shrink-0 whitespace-nowrap">₹{order.totalPrice}</p>
              </div>
              
              <div className="text-sm text-gray-500 flex flex-wrap gap-x-4 gap-y-1 mb-2">
                <span>Order ID: #{order._id.substring(order._id.length - 8).toUpperCase()}</span>
                <span>•</span>
                <span>{new Date(order.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
              </div>
            </div>

            <Badge
              className={`flex-shrink-0 ${
                statusColors[orderStatus] || "bg-gray-100 text-gray-700"
              } rounded-lg px-3 py-1 font-semibold uppercase tracking-wider text-[10px] border shadow-none`}
            >
              {orderStatus}
            </Badge>
          </motion.div>
        );
      })}
    </div>
  );
}
