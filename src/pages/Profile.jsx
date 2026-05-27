import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "../components/profile/Sidebar";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { AddressSection } from "../components/profile/AddressSection";
import { OrdersTab } from "../components/profileCard/OrdersTab";
import { CoursesTab } from "../components/profileCard/CourseTab";
import { useAuth } from "@/context/AuthContext";
import {
  ShoppingBag,
  GraduationCap,
  CreditCard,
  MapPin,
  Settings,
} from "lucide-react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("orders");

  const { user, isLoadingUser, fetchUser } = useAuth();

  const handleProfileUpdate = () => {
    fetchUser();
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!isLoadingUser && !user) {
      window.location.href = "/";
    }
  }, [isLoadingUser, user]);

  if (isLoadingUser || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfdfc]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  const TABS = [
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "courses", label: "My Courses", icon: GraduationCap },
    // { id: "payments", label: "Payments", icon: CreditCard },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Recent Orders
            </h2>
            <OrdersTab />
          </div>
        );
      case "courses":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">My Courses</h2>
            <CoursesTab />
          </div>
        );
      case "addresses":
        return <AddressSection />;
      // case "payments":
      //   return (
      //     <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center text-gray-500 min-h-[400px]">
      //       <CreditCard className="w-12 h-12 text-gray-200 mb-4" />
      //       <h3 className="text-xl font-semibold text-gray-900 mb-2">
      //         Payment Methods
      //       </h3>
      //       <p>No saved payment methods found.</p>
      //     </div>
      //   );
      case "settings":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center text-gray-500 min-h-[400px]">
            <Settings className="w-12 h-12 text-gray-200 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Account Settings
            </h3>
            <p>Manage your preferences and notification settings here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-20 pb-12">
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Sidebar Area */}
          <div className="w-full lg:w-[280px] flex-shrink-0 sticky top-24">
            <Sidebar
              tabs={TABS}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-grow w-full min-w-0">
            <ProfileHeader
              name={user?.name}
              email={user?.email}
              mobileNumber={user?.mobileNumber}
              address={user?.address}
              onUpdate={handleProfileUpdate}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
