import axios from "axios";
// import AdminLogin from "../../components/adminPanel/AdminLogin.jsx";
import Chart from "react-apexcharts";
import { Handbag, Banknote, CakeSlice, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const url = "http://localhost:5000";

function Dashboard() {
  // const [ordersToday, setOrdersToday] = useState(0);
  const [todaySales, setTodaySales] = useState({
    essentialSales: 0,
    cakeSales: 0,
    courseSales: 0,
  });
  const [thisWeekSales, setThisWeekSales] = useState({
    essentialSales: 0,
    cakeSales: 0,
    courseSales: 0,
  });
  const [thisMonthSales, setThisMonthSales] = useState({
    essentialSales: 0,
    cakeSales: 0,
    courseSales: 0,
  });
  const [overall, setOverall] = useState({
    essentialSales: 0,
    cakeSales: 0,
    courseSales: 0,
  });
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [chartFiler, setChartFilter] = useState("overall");
  const [orders, setOrders] = useState([]);
  // const [orders, setOrders] = useState([]);

  let cards = [
    {
      icon: <Handbag className="text-pink-600" />,
      color: "bg-pink-100",
      difference: 12.5,
      type: "Essentials sold",
      numbers: thisMonthSales.essentialSales,
    },
    {
      icon: <Banknote className="text-orange-600" />,
      color: "bg-orange-100",
      difference: 12.5,
      type: "Total Revenue",
      numbers: totalRevenue,
    },
    {
      icon: <CakeSlice className="text-blue-600" />,
      color: "bg-blue-100",
      difference: 12.5,
      type: "Cakes Sold",
      numbers: thisMonthSales.cakeSales,
    },
    {
      icon: <GraduationCap className="text-purple-600" />,
      color: "bg-purple-100",
      difference: 12.5,
      type: "Courses Sold",
      numbers: thisMonthSales.courseSales,
    },
  ];

  // chart data
  const seriesToday = [
    {
      name: "Sales",
      data: [todaySales.essentialSales, todaySales.cakeSales, todaySales.courseSales],
      // data: [15, 80, 77],
    },
  ];

  const seriesThisWeek = [
    {
      name: "Sales",
      data: [
        thisWeekSales.essentialSales,
        thisWeekSales.cakeSales,
        thisWeekSales.courseSales,
      ],
      // data: [15, 80, 77],
    },
  ];

  const seriesThisMonth = [
    {
      name: "Sales",
      data: [
        thisMonthSales.essentialSales,
        thisMonthSales.cakeSales,
        thisMonthSales.courseSales,
      ],
      // data: [15, 80, 77],
    },
  ];

  const series = [
    {
      name: "Essentials",
      data: [overall.essentialSales, overall.cakeSales, overall.courseSales],
      // data: [15, 80, 77],
    },
  ];

  const options = {
    chart: {
      id: "sales-chart",
    },
    colors: ["#3b82f6", "#22c55e", "#f59e0b"],
    xaxis: {
      categories: ["Essentials", "Cakes", "Courses"],
    },
    plotOptions: {
      bar: {
        distributed: true,
      },
    },
  };
  // chart data

  // pie chart data
  const optionsPie = {
    labels: ["Essentials", "Cakes", "Courses"],
    colors: ["#3b82f6", "#22c55e", "#f59e0b"],
    legend: {
      position: "bottom",
    },
  };

  const seriesPieToday = [
    todaySales.essentialSales,
    todaySales.cakeSales,
    todaySales.courseSales,
  ];

  const seriesPieWeek = [
    thisWeekSales.essentialSales,
    thisWeekSales.cakeSales,
    thisWeekSales.courseSales,
  ];

  const seriesPieMonth = [
    thisMonthSales.essentialSales,
    thisMonthSales.cakeSales,
    thisMonthSales.courseSales,
  ];

  const seriesPie = [overall.essentialSales, overall.cakeSales, overall.courseSales];
  // pie chart data

  // sales for today
  async function todaySalesFunc() {
    try {
      const response = await axios.get(`${url}/orders/today`);
      setTodaySales(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  // sales for the week
  async function weekSalesFunc() {
    try {
      const response = await axios.get(`${url}/orders/thisWeek`);
      setThisWeekSales(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  // sales for current month
  async function thisMonthSalesFunc() {
    try {
      const response = await axios.get(`${url}/orders/thisMonth`);
      setThisMonthSales(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  // overall sales
  async function overAllSalesFunc() {
    try {
      const response = await axios.get(`${url}/orders/overall`);
      setOverall(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  // grand total revenue
  async function revenue() {
    try {
      const response = await axios.get(`${url}/orders/revenue`);
      setTotalRevenue(response.data.totalRevenue);
    } catch (error) {
      console.log(error.message);
    }
  }

  // to fetch the today's orders in detail
  async function fetchOrders() {
    try {
      const response = await axios.get(`${url}/orders/todayDetail`);
      setOrders(response.data.orders);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    revenue();
    todaySalesFunc();
    weekSalesFunc();
    thisMonthSalesFunc();
    overAllSalesFunc();
    fetchOrders();
  }, []);

  return (
    <div className="">
      <div className="bg-cream">
        <div className="lg:pl-28 pl-20 pt-10 pr-10">
          <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between">
            <div>
              <h1 className="text-3xl lora new-primary-text font-semibold">Dashboard</h1>
              <p className="text-md pt-1">Welcome Back Admin</p>
            </div>
          </div>

          {/* top 4 cards */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 my-8 gap-10">
            {cards.map((card, index) => (
              <div
                key={index}
                className="p-8 space-y-4 bg-white shadow-sm transition-shadow duration-300 rounded-xl"
              >
                <div className="flex justify-between">
                  {/* svg icon */}
                  <div className={`${card.color} w-fit p-3 rounded-lg`}>{card.icon}</div>

                  {/* percentage number */}
                  <p className="my-2 text-black text-xl">{card.type}</p>
                </div>

                {/* <div className="bg-green-100 text-green-600 rounded-full h-fit w-fit px-3">
                  +{card.difference}%
                </div> */}

                {/* value */}
                <p className="text-3xl font-semibold">
                  {index === 1 ? `₹${card.numbers}` : card.numbers}
                </p>
              </div>
            ))}
          </div>

          {/* chart below */}
          <div className="my-20">
            {/* filter button */}
            <div className="flex gap-2 my-10 bg-white w-fit rounded-xl p-1 shadow-sm">
              <div
                onClick={() => setChartFilter("today")}
                className={`${chartFiler === "today" ? "new-primary-bg text-white hover:new-primary-bg/90" : "hover:bg-gray-100"} p-2 cursor-pointer rounded-lg`}
              >
                Today
              </div>
              <div
                onClick={() => setChartFilter("7days")}
                className={`${chartFiler === "7days" ? "new-primary-bg text-white hover:new-primary-bg/90" : "hover:bg-gray-100"} p-2 cursor-pointer rounded-lg`}
              >
                7 Days
              </div>
              <div
                onClick={() => setChartFilter("30days")}
                className={`${chartFiler === "30days" ? "new-primary-bg text-white hover:new-primary-bg/90" : "hover:bg-gray-100"} p-2 cursor-pointer rounded-lg`}
              >
                30 Days
              </div>
              <div
                onClick={() => setChartFilter("overall")}
                className={`${chartFiler === "overall" ? "new-primary-bg text-white hover:new-primary-bg/90" : "hover:bg-gray-100"} p-2 cursor-pointer rounded-lg`}
              >
                Overall
              </div>
            </div>

            {/* this month chart */}
            <div className="grid lg:grid-cols-4 grid-cols-1">
              {/* line chart */}
              <div className="lg:col-span-3">
                <div className={`${chartFiler === "today" ? "block" : "hidden"}`}>
                  <Chart options={options} series={seriesToday} type="bar" height={350} />
                  {/* <Chart
                  options={options}
                  series={barSeries[chartFiler]}
                  type="bar"
                  height={350}
                /> */}
                </div>

                <div className={`${chartFiler === "7days" ? "block" : "hidden"}`}>
                  <Chart
                    options={options}
                    series={seriesThisWeek}
                    type="bar"
                    height={350}
                  />
                </div>

                <div className={`${chartFiler === "30days" ? "block" : "hidden"}`}>
                  <Chart
                    options={options}
                    series={seriesThisMonth}
                    type="bar"
                    height={350}
                  />
                </div>

                <div className={`${chartFiler === "overall" ? "block" : "hidden"}`}>
                  <Chart options={options} series={series} type="bar" height={350} />
                </div>
              </div>

              {/* pie chart */}
              <div className="lg:col-span-1">
                <div className={`${chartFiler === "today" ? "block" : "hidden"}`}>
                  <Chart
                    options={optionsPie}
                    series={seriesPieToday}
                    type="pie"
                    height={350}
                  />
                </div>

                <div className={`${chartFiler === "7days" ? "block" : "hidden"}`}>
                  <Chart
                    options={optionsPie}
                    series={seriesPieWeek}
                    type="pie"
                    height={350}
                  />
                </div>

                <div className={`${chartFiler === "30days" ? "block" : "hidden"}`}>
                  <Chart
                    options={optionsPie}
                    series={seriesPieMonth}
                    type="pie"
                    height={350}
                  />
                </div>

                <div className={`${chartFiler === "overall" ? "block" : "hidden"}`}>
                  <Chart
                    options={optionsPie}
                    series={seriesPie}
                    type="pie"
                    height={350}
                  />
                </div>
              </div>
            </div>
            {/* chart above */}
          </div>

          {/* orders overview section */}
          <div className="py-10">
            <h2 className="text-3xl lora new-primary-text font-semibold">
              Orders Overview
            </h2>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 place-items-center">
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <div
                    key={index}
                    className="text-xl bg-white my-10 shadow-lg p-3 rounded-xl"
                  >
                    <div className="space-y-4">
                      <p className="">Order ID: {order._id}</p>
                      <p>{order.name}</p>
                      <p>Mobile: {order.number || "unavailable"}</p>
                      <p>Address: {order.billingAddress}</p>
                      <hr />
                      <div className="flex items-center gap-2">
                        <p>Items ({order.products.length}):</p>
                        {order.products.map((product) => (
                          <p key={product._id}>{product.price}</p>
                          // product name
                          // <p key={product._id}>{product.name}</p>
                        ))}
                      </div>
                      <p>Status: {order.orderStatus}</p>
                      <hr />
                      <Link
                        to="/admin/orders"
                        className="text-white block cursor-pointer hover:new-primary-bg new-primary-bg-dark rounded-lg p-3 w-full"
                      >
                        View details
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="">
                  <img src="/images/no-orders-found.png" alt="No orders found" />
                </div>
              )}
            </div>
          </div>

          {/* <div className="text-3xl">This is the orders table</div> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
