import { useEffect, useState } from "react";
import axios from "axios";
import { Clock, MapPin, Phone, Package, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [showMore, setShowMore] = useState(false);

  // to fetch the today's orders in detail
  async function fetchOrders() {
    try {
      const response = await axios.get(`${API_URL}/orders/todayDetail`);
      setOrders(response.data.orders);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  // get time ago for the
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  // orders for last 6hrs and showMore & showLess
  const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);
  const lastSixHourOrders = orders.filter(
    (order) => new Date(order.createdAt) >= sixHoursAgo,
  );
  const visibleOrders = showMore ? lastSixHourOrders : orders.slice(0, 4);

  return (
    <>
      {/* orders overview section */}
      <div className="py-10">
        <h2 className="text-3xl lora new-primary-text font-semibold mb-20">
          Recent Orders
        </h2>
        {orders.length > 0 ? (
          <>
            <div
              // className={`flex flex-wrap gap-10 items-center ${orders.length <= 2 ? "justify-start" : "justify-around"}`}
              className={`grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 place-items-center`}
              // className={`flex justify-between gap-10`}
            >
              {visibleOrders.map((order, index) => (
                <div
                  key={index}
                  className="min-w-80 h-110 flex flex-col justify-between bg-white p-4 rounded-xl shadow-lg transition-all duration-300"
                >
                  <div>
                    {/* card header */}
                    <div key={index}>
                      <div className="flex justify-between items-start mb-5 relative z-10">
                        <div className="flex flex-col min-w-0">
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                            Order ID: #...{order._id.slice(-6).toUpperCase()}
                          </span>
                          <p className="font-bold text-gray-900 text-base md:text-lg flex items-center gap-2 group-hover:text-[#870D32] transition-colors leading-tight truncate">
                            {order.user.name}
                          </p>
                        </div>
                        <div className="shrink-0 flex items-center gap-1.5 text-gray-400 font-bold text-[9px] md:text-[10px] bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                          <Clock size={10} />
                          {getTimeAgo(order.createdAt)}
                        </div>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="space-y-3 mb-6 border-l-2 border-pink-50 pl-4 relative z-10">
                      <div className="flex items-center gap-2.5">
                        <Phone
                          size={13}
                          className="text-[#870D32]/60 shrink-0"
                        />
                        <span className="text-xs font-bold text-gray-600">
                          {order.user.phone || "No phone"}
                        </span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <MapPin
                          size={13}
                          className="text-[#870D32]/60 shrink-0 mt-0.5"
                        />
                        <span className="text-xs font-medium text-gray-500 leading-snug line-clamp-2">
                          {order.billingAddress}
                        </span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Package
                          size={13}
                          className="text-[#870D32]/60 shrink-0 mt-0.5"
                        />
                        <span className="text-xs font-medium text-gray-500 leading-snug line-clamp-2">
                          {order.orderStatus}
                        </span>
                      </div>
                    </div>

                    {/* Product List */}
                    <div className="bg-[#fdfbf7] rounded-[22px] p-4 mb-6 space-y-2.5 border border-[#f5efdf] relative z-10">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[8px] font-black text-gray-500 uppercase tracking-[0.2em]">
                          Products List
                        </span>
                      </div>

                      {order.products.map((item, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex justify-between text-xs font-semibold text-gray-800">
                            <span className="truncate pr-4">
                              • {item.title || item.product?.name}
                            </span>
                            <span className="shrink-0 text-[#870D32] font-black tracking-tighter">
                              × {item.quantity}
                            </span>
                          </div>
                        </div>
                      ))}

                      <div className="pt-3 mt-3 border-t border-dashed border-gray-200/80 flex justify-between items-center">
                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                          Total Price
                        </span>
                        <span className="text-lg md:text-xl font-semibold text-[#870D32]">
                          ₹{order.totalPrice}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* view details button */}
                  <Link
                    to="/admin/orders"
                    className="bg-[#870D32] hover:bg-[#870D32]/95 text-white w-full text-center block p-3 rounded-lg"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
            {/* show more button */}
            {lastSixHourOrders.length >= 5 ? (
              <div className="flex justify-center items-center mt-20">
                <button
                  onClick={() => setShowMore((prev) => !prev)}
                  className="new-primary-bg-dark flex justify-center items-center w-40 active:scale-97 active:shadow-lg cursor-pointer hover:new-primary-bg text-white text-center p-3 rounded-lg"
                >
                  {showMore ? (
                    <>
                      Show Less
                      <ChevronDown className="inline -rotate-180 ml-2" />
                    </>
                  ) : (
                    <>
                      Show More
                      <ChevronDown className="inline ml-2" />
                    </>
                  )}
                </button>
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <img
              src="/images/no-orders-found.png"
              alt="No orders found"
              className="h-auto grayscale-75 w-full md:w-150"
            />
            <h3 className="text-2xl font-bold new-primary-text">
              No Orders found
            </h3>
          </div>
        )}
      </div>
    </>
  );
}
