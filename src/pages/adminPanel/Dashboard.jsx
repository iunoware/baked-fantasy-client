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
import RecentOrders from "./components/RecentOrders";

const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
  // custom date filter
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [dateRangeSales, setDateRangeSales] = useState({
    essentialSales: 0,
    cakeSales: 0,
    courseSales: 0,
  });
  const [dateRangeRevenue, setDateRangeRevenue] = useState(0);
  // custom date filter

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

  const [chartFilter, setChartFilter] = useState("overall");

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
      // numbers: revenue.today,
      numbers:
        chartFilter === "today"
          ? revenue.today
          : chartFilter === "7days"
            ? revenue.week
            : chartFilter === "30days"
              ? revenue.month
              : chartFilter === "dateRange"
                ? dateRangeRevenue
                : revenue.overall,
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
      data: [
        todaySales.essentialSales,
        todaySales.cakeSales,
        todaySales.courseSales,
      ],
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

  const seriesDateRange = [
    {
      name: "Sales",
      data: [
        dateRangeSales.essentialSales,
        dateRangeSales.cakeSales,
        dateRangeSales.courseSales,
      ],
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

  const seriesPieDateRange = [
    dateRangeSales.essentialSales,
    dateRangeSales.cakeSales,
    dateRangeSales.courseSales,
  ];

  const seriesPie = [
    overall.essentialSales,
    overall.cakeSales,
    overall.courseSales,
  ];
  // pie chart data

  // custom date filter
  async function dateRangeSalesFunc() {
    if (!dateRange.from || !dateRange.to) return;
    try {
      const response = await axios.get(`${API_URL}/orders/dateRange`, {
        params: { from: dateRange.from, to: dateRange.to },
      });
      setDateRangeSales(response.data);
      setDateRangeRevenue(response.data.revenue);
      setCardFilter(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  // sales for today
  async function todaySalesFunc() {
    try {
      const response = await axios.get(`${API_URL}/orders/today`);
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
      const response = await axios.get(`${API_URL}/orders/thisWeek`);
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
      const response = await axios.get(`${API_URL}/orders/thisMonth`);
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
      const response = await axios.get(`${API_URL}/orders/overall`);
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
      const response = await axios.get(`${API_URL}/orders/todayRevenue`);
      // setCardFilter(response.data);
      // setTodayRevenue(response.data.totalRevenue);
      setRevenue((prev) => ({
        ...prev,
        today: response.data.revenue[0]?.totalRevenue || 0,
      }));
    } catch (error) {
      console.error(error.message);
    }
  }

  // this week revenue
  async function thisWeekRevenue() {
    try {
      const response = await axios.get(`${API_URL}/orders/thisWeekRevenue`);
      // setCardFilter(response.data.totalRevenue);
      // setWeekRevenue(response.data.totalRevenue);
      setRevenue((prev) => ({
        ...prev,
        week: response.data.revenue[0]?.totalRevenue || 0,
      }));
    } catch (error) {
      console.error(error.message);
    }
  }

  // this month revenue
  async function thisMonthRevenue() {
    try {
      const response = await axios.get(`${API_URL}/orders/thisMonthRevenue`);
      // setCardFilter(response.data.totalRevenue);
      // setMonthRevenue(response.data.totalRevenue);
      setRevenue((prev) => ({
        ...prev,
        month: response.data.revenue[0]?.totalRevenue || 0,
      }));
    } catch (error) {
      console.error(error.message);
    }
  }

  // grand total revenue
  async function revenueFunc() {
    try {
      const response = await axios.get(`${API_URL}/orders/revenue`);
      // setTotalRevenue(response.data.totalRevenue);
      setRevenue((prev) => ({
        ...prev,
        overall: response.data.totalRevenue,
      }));
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
    // fetchOrders();
  }, []);

  return (
    <div className="">
      <div className="bg-cream">
        <div className="lg:pl-28 pl-20 pt-10 pr-10">
          <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between">
            <div>
              <h1 className="text-3xl lora new-primary-text font-semibold">
                Dashboard
              </h1>
              <p className="text-md pt-1">Welcome Back Admin</p>
            </div>
          </div>

          {/* filter button */}
          {/* <div className="flex text-sm md:text-md gap-2 my-10 bg-white w-fit rounded-xl p-1 shadow-sm">
            <div
              onClick={() => {
                setChartFilter("today");
                setCardFilter(todaySales);
                // setRevenue(revenue.today);
              }}
              className={`${chartFilter === "today" ? "new-primary-bg text-white hover:new-primary-bg/90" : "hover:bg-gray-200"} p-2 cursor-pointer rounded-lg`}
            >
              Today
            </div>
            <div
              onClick={() => {
                setChartFilter("7days");
                setCardFilter(thisWeekSales);
                // setRevenue(revenue.week);
              }}
              className={`${chartFilter === "7days" ? "new-primary-bg text-white hover:new-primary-bg/90" : "hover:bg-gray-200"} p-2 cursor-pointer rounded-lg`}
            >
              Week
            </div>
            <div
              onClick={() => {
                setChartFilter("30days");
                setCardFilter(thisMonthSales);
                // setRevenue(revenue.month);
              }}
              className={`${chartFilter === "30days" ? "new-primary-bg text-white hover:new-primary-bg/90" : "hover:bg-gray-200"} p-2 cursor-pointer rounded-lg`}
            >
              Month
            </div>
            <div
              onClick={() => {
                setChartFilter("overall");
                setCardFilter(overall);
                // setRevenue(revenue.overall);
              }}
              className={`${chartFilter === "overall" ? "new-primary-bg text-white hover:new-primary-bg/90" : "hover:bg-gray-200"} p-2 cursor-pointer rounded-lg`}
            >
              Overall
            </div>
          </div> */}
          <div className="flex flex-wrap items-center text-sm md:text-md gap-2 my-10">
            {/* existing time filter pills */}
            <div className="flex bg-white w-fit rounded-xl p-1 shadow-sm">
              <div
                onClick={() => {
                  setChartFilter("today");
                  setCardFilter(todaySales);
                }}
                className={`${chartFilter === "today" ? "new-primary-bg text-white" : "hover:bg-gray-200"} p-2 cursor-pointer rounded-lg`}
              >
                Today
              </div>
              <div
                onClick={() => {
                  setChartFilter("7days");
                  setCardFilter(thisWeekSales);
                }}
                className={`${chartFilter === "7days" ? "new-primary-bg text-white" : "hover:bg-gray-200"} p-2 cursor-pointer rounded-lg`}
              >
                Week
              </div>
              <div
                onClick={() => {
                  setChartFilter("30days");
                  setCardFilter(thisMonthSales);
                }}
                className={`${chartFilter === "30days" ? "new-primary-bg text-white" : "hover:bg-gray-200"} p-2 cursor-pointer rounded-lg`}
              >
                Month
              </div>
              <div
                onClick={() => {
                  setChartFilter("overall");
                  setCardFilter(overall);
                }}
                className={`${chartFilter === "overall" ? "new-primary-bg text-white" : "hover:bg-gray-200"} p-2 cursor-pointer rounded-lg`}
              >
                Overall
              </div>
            </div>

            {/* date range picker */}
            {/* <div className="flex md:flex-row flex-col items-center gap-2 bg-white rounded-xl p-2 shadow-sm">
              <input
                type="date"
                value={dateRange.from}
                max={dateRange.to || undefined}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, from: e.target.value }))
                }
                className="border border-gray-200 rounded-lg p-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-pink-300"
              />
              <span className="text-gray-400 text-xs">to</span>
              <input
                type="date"
                value={dateRange.to}
                min={dateRange.from || undefined}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, to: e.target.value }))
                }
                className="border border-gray-200 rounded-lg p-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-pink-300"
              />
              <button
                onClick={() => {
                  if (dateRange.from && dateRange.to) {
                    setChartFilter("dateRange");
                    dateRangeSalesFunc();
                  }
                }}
                disabled={!dateRange.from || !dateRange.to}
                className="bg-pbrown hover:opacity-95 text-white px-3 py-1.5 rounded-lg text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Apply
              </button>
            </div> */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white rounded-xl p-2 shadow-sm w-fit">
              {/* dates row — always side by side even on mobile */}
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={dateRange.from}
                  max={dateRange.to || undefined}
                  onChange={(e) =>
                    setDateRange((prev) => ({ ...prev, from: e.target.value }))
                  }
                  className="border border-gray-200 rounded-lg p-1.5 text-sm focus:outline-none focus:ring-1 w-32 focus:ring-amber-700 "
                />
                <span className="text-gray-400 text-xs shrink-0">to</span>
                <input
                  type="date"
                  value={dateRange.to}
                  min={dateRange.from || undefined}
                  onChange={(e) =>
                    setDateRange((prev) => ({ ...prev, to: e.target.value }))
                  }
                  className="border border-gray-200 rounded-lg p-1.5 text-sm focus:outline-none focus:ring-1 w-32 focus:ring-amber-700 "
                />
              </div>

              {/* apply button — full width on mobile, auto on larger */}
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    if (dateRange.from && dateRange.to) {
                      setChartFilter("dateRange");
                      dateRangeSalesFunc();
                    }
                  }}
                  disabled={!dateRange.from || !dateRange.to}
                  className="bg-pbrown hover:opacity-95 text-white px-3 py-1.5 rounded-lg text-sm disabled:opacity-40 disabled:cursor-not-allowed w-fit sm:w-auto"
                >
                  Apply
                </button>
              </div>
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
                  <div className={`${card.color} w-fit p-3 rounded-lg`}>
                    {card.icon}
                  </div>

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
                <div
                  className={`${chartFilter === "today" ? "block" : "hidden"}`}
                >
                  <Chart
                    options={options}
                    series={seriesToday}
                    type="bar"
                    height={350}
                  />
                </div>

                <div
                  className={`${chartFilter === "7days" ? "block" : "hidden"}`}
                >
                  <Chart
                    options={options}
                    series={seriesThisWeek}
                    type="bar"
                    height={350}
                  />
                </div>

                <div
                  className={`${chartFilter === "30days" ? "block" : "hidden"}`}
                >
                  <Chart
                    options={options}
                    series={seriesThisMonth}
                    type="bar"
                    height={350}
                  />
                </div>

                <div
                  className={`${chartFilter === "overall" ? "block" : "hidden"}`}
                >
                  <Chart
                    options={options}
                    series={series}
                    type="bar"
                    height={350}
                  />
                </div>

                {/* for date filter */}
                <div
                  className={`${chartFilter === "dateRange" ? "block" : "hidden"}`}
                >
                  <Chart
                    options={options}
                    series={seriesDateRange}
                    type="bar"
                    height={350}
                  />
                </div>
              </div>

              {/* pie chart */}
              <div className="lg:col-span-1">
                <div
                  className={`${chartFilter === "today" ? "block" : "hidden"}`}
                >
                  <Chart
                    options={optionsPie}
                    series={seriesPieToday}
                    type="pie"
                    height={350}
                  />
                </div>

                <div
                  className={`${chartFilter === "7days" ? "block" : "hidden"}`}
                >
                  <Chart
                    options={optionsPie}
                    series={seriesPieWeek}
                    type="pie"
                    height={350}
                  />
                </div>

                <div
                  className={`${chartFilter === "30days" ? "block" : "hidden"}`}
                >
                  <Chart
                    options={optionsPie}
                    series={seriesPieMonth}
                    type="pie"
                    height={350}
                  />
                </div>

                <div
                  className={`${chartFilter === "overall" ? "block" : "hidden"}`}
                >
                  <Chart
                    options={optionsPie}
                    series={seriesPie}
                    type="pie"
                    height={350}
                  />
                </div>

                {/* for date filter */}
                <div
                  className={`${chartFilter === "dateRange" ? "block" : "hidden"}`}
                >
                  <Chart
                    options={optionsPie}
                    series={seriesPieDateRange}
                    type="pie"
                    height={350}
                  />
                </div>
              </div>
            </div>
            {/* chart above */}
          </div>

          <RecentOrders />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
