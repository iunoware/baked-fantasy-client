import axios from "axios";
// import AdminLogin from "../../components/adminPanel/AdminLogin.jsx";
import Chart from "react-apexcharts";
import {
  Handbag,
  Banknote,
  CakeSlice,
  GraduationCap,
  Clock,
  MapPin,
  Phone,
  Package,
} from "lucide-react";
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
  const [cardFilter, setCardFilter] = useState({
    essentialSales: 0,
    cakeSales: 0,
    courseSales: 0,
  });

  // const [todayRevenue, setTodayRevenue] = useState(0);
  // const [weekRevenue, setWeekRevenue] = useState(0);
  // const [monthRevenue, setMonthRevenue] = useState(0);
  // const [totalRevenue, setTotalRevenue] = useState(0);

  const [revenue, setRevenue] = useState({
    today: 0,
    week: 0,
    month: 0,
    overall: 0,
  });

  const [chartFiler, setChartFilter] = useState("overall");
  const [orders, setOrders] = useState([]);

  let cards = [
    {
      icon: <Handbag className="text-pink-600" />,
      color: "bg-pink-100",
      difference: 12.5,
      type: "Essentials sold",
      // numbers: thisMonthSales.essentialSales,
      numbers: cardFilter.essentialSales,
    },
    {
      icon: <Banknote className="text-orange-600" />,
      color: "bg-orange-100",
      difference: 12.5,
      type: "Total Revenue",
      numbers: revenue,
      // numbers: cardFilter.totalRevenue,
    },
    {
      icon: <CakeSlice className="text-blue-600" />,
      color: "bg-blue-100",
      difference: 12.5,
      type: "Cakes Sold",
      // numbers: thisMonthSales.cakeSales,
      numbers: cardFilter.cakeSales,
    },
    {
      icon: <GraduationCap className="text-purple-600" />,
      color: "bg-purple-100",
      difference: 12.5,
      type: "Courses Sold",
      // numbers: thisMonthSales.courseSales,
      numbers: cardFilter.courseSales,
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
      // setCardFilter(response.data);
      setCardFilter((prev) => ({
        ...prev,
        ...response.data,
      }));
    } catch (error) {
      console.error(error.message);
    }
  }

  // sales for the week
  async function weekSalesFunc() {
    try {
      const response = await axios.get(`${url}/orders/thisWeek`);
      setThisWeekSales(response.data);
      // setCardFilter(response.data);
      setCardFilter((prev) => ({
        ...prev,
        ...response.data,
      }));
    } catch (error) {
      console.error(error.message);
    }
  }

  // sales for current month
  async function thisMonthSalesFunc() {
    try {
      const response = await axios.get(`${url}/orders/thisMonth`);
      setThisMonthSales(response.data);
      // setCardFilter(response.data);
      setCardFilter((prev) => ({
        ...prev,
        ...response.data,
      }));
    } catch (error) {
      console.error(error.message);
    }
  }

  // overall sales
  async function overAllSalesFunc() {
    try {
      const response = await axios.get(`${url}/orders/overall`);
      setOverall(response.data);
      setCardFilter((prev) => ({
        ...prev,
        ...response.data,
      }));
    } catch (error) {
      console.error(error.message);
    }
  }

  // today revenue
  async function todayRevenueFunc() {
    try {
      const response = await axios.get(`${url}/orders/todayRevenue`);
      // setCardFilter(response.data);
      // setTodayRevenue(response.data.totalRevenue);
      setRevenue((prev) => ({
        ...prev,
        today: response.data.totalRevenue,
      }));
    } catch (error) {
      console.error(error.message);
    }
  }

  // this week revenue
  async function thisWeekRevenue() {
    try {
      const response = await axios.get(`${url}/orders/thisWeekRevenue`);
      // setCardFilter(response.data.totalRevenue);
      // setWeekRevenue(response.data.totalRevenue);
      setRevenue((prev) => ({
        ...prev,
        week: response.data.totalRevenue,
      }));
    } catch (error) {
      console.error(error.message);
    }
  }

  // this month revenue
  async function thisMonthRevenue() {
    try {
      const response = await axios.get(`${url}/orders/thisMonthRevenue`);
      // setCardFilter(response.data.totalRevenue);
      // setMonthRevenue(response.data.totalRevenue);
      setRevenue((prev) => ({
        ...prev,
        month: response.data.totalRevenue,
      }));
    } catch (error) {
      console.error(error.message);
    }
  }

  // grand total revenue
  async function revenueFunc() {
    try {
      const response = await axios.get(`${url}/orders/revenue`);
      // setTotalRevenue(response.data.totalRevenue);
      setRevenue((prev) => ({
        ...prev,
        overall: response.data.totalRevenue,
      }));
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
    todayRevenueFunc();
    thisWeekRevenue();
    thisMonthRevenue();
    revenueFunc();
    todaySalesFunc();
    weekSalesFunc();
    thisMonthSalesFunc();
    overAllSalesFunc();
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

          {/* filter button */}
          <div className="flex gap-2 my-10 bg-white w-fit rounded-xl p-1 shadow-sm">
            <div
              onClick={() => {
                setChartFilter("today");
                setCardFilter(todaySales);
                setRevenue(revenue.today);
              }}
              className={`${chartFiler === "today" ? "new-primary-bg text-white hover:new-primary-bg/90" : "hover:bg-gray-100"} p-2 cursor-pointer rounded-lg`}
            >
              Today
            </div>
            <div
              onClick={() => {
                setChartFilter("7days");
                setCardFilter(thisWeekSales);
                setRevenue(revenue.week);
              }}
              className={`${chartFiler === "7days" ? "new-primary-bg text-white hover:new-primary-bg/90" : "hover:bg-gray-100"} p-2 cursor-pointer rounded-lg`}
            >
              7 Days
            </div>
            <div
              onClick={() => {
                setChartFilter("30days");
                setCardFilter(thisMonthSales);
                setRevenue(revenue.month);
              }}
              className={`${chartFiler === "30days" ? "new-primary-bg text-white hover:new-primary-bg/90" : "hover:bg-gray-100"} p-2 cursor-pointer rounded-lg`}
            >
              30 Days
            </div>
            <div
              onClick={() => {
                setChartFilter("overall");
                setCardFilter(overall);
                setRevenue(revenue.overall);
              }}
              className={`${chartFiler === "overall" ? "new-primary-bg text-white hover:new-primary-bg/90" : "hover:bg-gray-100"} p-2 cursor-pointer rounded-lg`}
            >
              Overall
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
            <h2 className="text-3xl lora new-primary-text font-semibold mb-20">
              Recent Orders
            </h2>
            {orders.length > 0 ? (
              // <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 place-items-center space-y-10">
              <div className="flex flex-wrap gap-10  lg:justify-start items-center">
                {orders.map((order, index) => (
                  <div
                    key={index}
                    className="min-w-80 h-110 flex flex-col justify-between bg-white p-4 rounded-xl shadow-lg"
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
                          <Phone size={13} className="text-[#870D32]/60 shrink-0" />
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
                          {/* <span className="bg-white/80 px-2 py-0.5 rounded text-[9px] font-bold text-[#870D32]">
                          {order.products.length} Items
                        </span> */}
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

                        {/* <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold text-gray-800">
                          <span className="truncate pr-4">
                            • {order.products[0].productType}
                          </span>
                          <span className="shrink-0 text-[#870D32] font-black tracking-tighter">
                            × {order.products[0].quantity}
                          </span>
                        </div>
                      </div> */}

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
                      className="new-primary-bg-dark hover:new-primary-bg text-white w-full text-center block p-3 rounded-lg"
                    >
                      View Details
                    </Link>
                  </div>

                  // <div
                  //   key={index}
                  //   className="text-xl bg-white my-10 shadow-lg p-3 rounded-xl"
                  // >
                  //   <div className="space-y-4">
                  //     <p className="">Order ID: {order._id}</p>
                  //     <p>{order.name}</p>
                  //     <p>Mobile: {order.number || "unavailable"}</p>
                  //     <p>Address: {order.billingAddress}</p>
                  //     <hr />
                  //     <div className="flex items-center gap-2">
                  //       <p>Items ({order.products.length}):</p>
                  //       {order.products.map((product) => (
                  //         // <p key={product._id}>{product.price}</p>
                  //         // product name
                  //         <p key={product._id}>{product.name}</p>
                  //       ))}
                  //     </div>
                  //     <p>Status: {order.orderStatus}</p>
                  //     <hr />
                  //     <Link
                  //       to="/admin/orders"
                  //       className="text-white block cursor-pointer hover:new-primary-bg new-primary-bg-dark rounded-lg p-3 w-full"
                  //     >
                  //       View details
                  //     </Link>
                  //   </div>
                  // </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center">
                <img
                  src="/images/no-orders-found.png"
                  alt="No orders found"
                  className="h-150 grayscale-75"
                />
                <h3 className="text-2xl font-bold new-primary-text">No Orders found</h3>
              </div>
            )}
            {/* </div> */}
          </div>

          {/* <div className="text-3xl">This is the orders table</div> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
