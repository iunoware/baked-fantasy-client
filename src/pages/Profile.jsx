import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ProfileCard } from "../components/profileCard/ProfileCard.jsx";
import { OrdersTab } from "../components/profileCard/OrdersTab";
import { CoursesTab } from "../components/profileCard/CourseTab";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { LogOut, Settings, ShoppingBag, GraduationCap } from "lucide-react";
import api from "../api";

export default function App() {
  const [activeTab, setActiveTab] = useState("orders");
  const [userData, setUserData] = useState(null);
  const [address, setAddress] = useState([]);
  const d = new Date();
  const month = d.toLocaleString("default", { month: "long" });
  const year = d.getFullYear();

  useEffect(() => {
    try {
      const data = localStorage.getItem("user");
      if (data) {
        const parsedData = JSON.parse(data);
        setUserData({
          ...parsedData,
          name: parsedData.name || "User",
          email: parsedData.email || "user@example.com",
          mobileNumber:
            parsedData.mobileNumber ||
            "Add your Mobile Number using the Edit option",
          joinedDate: parsedData.joinedDate || `${month} ${year}`,
          // avatar: parsedData.avatar || "/images/defaultProfile.jpg"
        });
      } else {
        // If no user data, redirect to home (or show login)
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Error parsing user data:", err);
      window.location.href = "/";
    }
  }, [month, year]);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token || token === "null" || token === "undefined") {
          console.warn("[Profile] No valid token found, delaying /address fetch.");
          return;
        }
        
        const res = await api.get("/address");
        setAddress(res.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    // Only fetch when userData is confirmed to be fully loaded
    if (userData) {
      fetchAddress();
    }
  }, [userData]);

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDF9]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9]">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8 pt-15">
          <h1 className="font-bold text-3xl">My Profile</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account and view your activity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Panel - Profile Card */}
          <div className="lg:col-span-1">
            <ProfileCard {...userData} address={address} />
          </div>

          {/* Right Panel - Tabs Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-[20px] bg-white/60 backdrop-blur-md shadow-lg border border-white/40 p-6 md:p-8"
            >
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100/80 p-1 rounded-xl h-auto">
                  <TabsTrigger
                    value="orders"
                    className="rounded-lg py-3 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300 gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span className="hidden sm:inline">My Orders</span>
                    <span className="sm:hidden">Orders</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="courses"
                    className="rounded-lg py-3 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300 gap-2"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span className="hidden sm:inline">My Courses</span>
                    <span className="sm:hidden">Courses</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="orders" className="mt-0">
                  <motion.div
                    key="orders"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <OrdersTab />
                  </motion.div>
                </TabsContent>

                <TabsContent value="courses" className="mt-0">
                  <motion.div
                    key="courses"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CoursesTab />
                  </motion.div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 pb-8 flex items-center justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              className="rounded-xl gap-2 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => {
                sessionStorage.removeItem("token");
                // Also clear localStorage just in case it was used elsewhere
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/";
              }}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </motion.div>
        </motion.footer>
      </main>
    </div>
  );
}
