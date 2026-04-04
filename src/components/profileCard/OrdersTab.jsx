import { useEffect, useState } from "react";
import api from "../../api";
import { ShoppingBag } from "lucide-react";

export function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await api.get("/my-orders");
        setOrders(response.data.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
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
      <div className="flex flex-col items-center justify-center p-12 text-gray-400 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
        <ShoppingBag className="w-12 h-12 mb-3 opacity-20" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">No orders yet</h3>
        <p className="text-sm">When you buy something, it will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order._id}
          className="p-4 border border-gray-100 rounded-xl hover:border-pink-100 transition-colors"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                Order #{order._id.slice(-8)}
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-600"
                  : "bg-pink-100 text-pink-600"
              }`}
            >
              {order.status}
            </span>
          </div>
          <div className="flex justify-between items-end mt-4">
            <div className="flex -space-x-2">
              {order.items.slice(0, 3).map((item, idx) => (
                <div
                  key={idx}
                  className="w-10 h-10 rounded-lg border-2 border-white bg-gray-100 overflow-hidden shadow-sm"
                >
                  <img
                    src={`http://localhost:5000${item.image}`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {order.items.length > 3 && (
                <div className="w-10 h-10 rounded-lg border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600 shadow-sm">
                  +{order.items.length - 3}
                </div>
              )}
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Total Amount</p>
              <p className="text-lg font-bold text-gray-900">₹{order.totalAmount}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
