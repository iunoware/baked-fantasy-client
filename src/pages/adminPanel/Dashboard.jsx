/* eslint-disable no-unused-vars */
import axios from "axios";
import AdminLogin from "../../components/adminPanel/AdminLogin.jsx";
import {
  ShoppingCart,
  IndianRupee,
  ChartNoAxesCombined,
  BadgeIndianRupee,
  ChefHat,
} from "lucide-react";
import { useEffect, useState } from "react";

const url = "http://localhost:5000/";

function Dashboard() {
  const [orders, setOrders] = useState([]);

  async function fetchOrders() {
    try {
      const response = await axios.get(`${url}/orders/today`);
      setOrders(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div classnameName="bg-butterscothch">
      <div className="bg-white min-h-screen">
        <div className="lg:pl-28 pl-20 pt-10 pr-10">
          <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between">
            <div>
              <h1 className="text-3xl lora new-primary-text font-semibold">Dashboard</h1>
              <p className="text-md pt-1">Welcome Back Admin</p>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 my-10 gap-5">
            {/* 1 */}
            <div className="bg-gray-50 space-y-2 shadow-xl rounded-2xl">
              <h1 className="pt-3 pl-4 text-xl font-bold">Orders Today</h1>
              <div className="flex px-5 pt-3 justify-between">
                <p className="text-2xl font-bold">24</p>
                <div className="bg-red-100 text-xl rounded-xl p-2">
                  <ShoppingCart className="text-blue" />
                </div>
              </div>
              <p className="flex gap-4 pl-5 pb-5">
                <ChartNoAxesCombined className="text-green-500" />
                <span className="text-lg">+12% vs last month</span>
              </p>
            </div>

            {/* 2 */}
            <div className="bg-gray-50 space-y-2 shadow-xl rounded-2xl">
              <h1 className="pt-3 pl-4 text-xl font-bold">Revenue</h1>
              <div className="flex px-5 pt-2 justify-between">
                <div className="flex gap-1 items-center">
                  <IndianRupee className="text-green-500" size={20} />
                  <p className="text-2xl font-bold">2204</p>
                </div>
                <div className="bg-red-100 text-xl rounded-xl p-2">
                  <BadgeIndianRupee className="text-green-400" />
                </div>
              </div>
              <p className="flex gap-4 pl-5">
                <ChartNoAxesCombined className="text-green-500" />
                <span className="text-lg">+18% vs last month</span>
              </p>
            </div>

            {/* 3 */}
            <div className="bg-gray-50 space-y-2 shadow-xl rounded-2xl">
              <h1 className="pt-3 pl-4 text-xl font-bold">Courses Sales</h1>
              <div className="flex px-5 pt-3 justify-between">
                <p className="text-2xl font-bold">32</p>
                <div className="bg-red-100 text-xl rounded-xl p-2">
                  <ChefHat className="text-blue" />
                </div>
              </div>
              <p className="flex gap-4 pl-5">
                <ChartNoAxesCombined className="text-green-500" />
                <span className="text-lg">+20% vs last month</span>
              </p>
            </div>
          </div>
          {/* <div className="graph md:w-[90vw] md:h-[100vh] flex items-center justify-center">
            <img src="/images/graph.jpg" alt="graph" />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
