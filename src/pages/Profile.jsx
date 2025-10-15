import { useState } from "react";
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

export default function App() {
  const [activeTab, setActiveTab] = useState("orders");

  const userData = {
    name: "Emma Richardson",
    email: "emma.richardson@example.com",
    avatar:
      "https://images.unsplash.com/photo-1551929175-f82f676827b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwd29tYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA0MTM3NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    membershipLevel: "Gold Member",
    joinedDate: "January 2024",
  };

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
            <ProfileCard {...userData} />
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
