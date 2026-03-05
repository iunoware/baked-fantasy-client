import axios from "axios";
import { useEffect, useState } from "react";

function OrdersAdmin() {
  const [active, setActive] = useState();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getOrder() {
      try {
        let res = await axios.get(`http://localhost:5000/orders`);
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Error fetching Products:", err);
      }
    }
    getOrder();
  }, []);

  return (
    <div className="bg mb-10">
      <div className="lg:pl-30 pl-20 pt-10 pr-10">
        <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between">
          <div>
            <h1 className="text-3xl new-primary-text font-semibold lora">
              Orders Management
            </h1>
            <p className="text-md pt-1">Manage and track all bakery orders</p>
          </div>
          <div></div>
        </div>
        <div className="bg-white h-fit mt-10 shadow-2xl rounded-2xl">
          {/* heading */}
          <div className="p-6">
            <div>
              <h2 className="text-2xl lora new-primary-text font-bold">
                {" "}
                All Orders
              </h2>
              <p className="text-lg">Track and manage customer orders</p>
            </div>
          </div>
          {/* selectors */}
          <div className="md:p-10 p-4">
            <div className="flex justify-around h-15 items-center rounded-2xl font-bold bg-pink-100">
              <div
                className={`${
                  active === "courses" ? "new-primary-bg text-white" : ""
                } flex items-center justify-center text-sm md:text-[14px] rounded-xl ml-2 h-12  w-1/3 cursor-pointer`}
                onClick={() => setActive("courses")}
              >
                Courses
              </div>
              <div
                className={`${
                  active === "bakery" ? "new-primary-bg text-white" : ""
                } flex items-center text-sm md:text-[14px] justify-center rounded-xl ml-2 h-12  w-1/3 cursor-pointer`}
                onClick={() => setActive("bakery")}
              >
                Bakery
              </div>
              <div
                className={`${
                  active === "essentials" ? "new-primary-bg text-white" : ""
                } flex items-center text-sm md:text-[14px] p-2 md:p-0 justify-center h-12 rounded-xl mr-2 w-1/3 cursor-pointer`}
                onClick={() => setActive("essentials")}
              >
                Baking Essentials
              </div>
            </div>
            {/* table */}
            <div className="overflow-x-auto pt-10">
              <table className="min-w-full divide-y-2 divide-gray-200">
                <thead className="ltr:text-left rtl:text-right">
                  <tr className="*:font-medium *:text-gray-900">
                    <th className="px-3 py-2 whitespace-nowrap">Date</th>
                    <th className="px-3 py-2 whitespace-nowrap">Order Id</th>
                    <th className="px-3 py-2 whitespace-nowrap">Course Name</th>
                    <th className="px-3 py-2 whitespace-nowrap">
                      Customer Name
                    </th>
                    <th className="px-3 py-2 whitespace-nowrap">Price</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="*:text-gray-900 *:first:font-medium"
                    >
                      <td className="px-3 py-2 whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-3 py-2 whitespace-nowrap">
                        {order.products[0]?.productId?._id}
                      </td>

                      <td className="px-3 py-2 whitespace-nowrap">
                        {order.products[0]?.productId?.name}
                      </td>

                      <td className="px-3 py-2 whitespace-nowrap">
                        {order.customerName}
                      </td>

                      <td className="px-3 py-2 whitespace-nowrap">
                        ₹ {order.totalPrice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersAdmin;
