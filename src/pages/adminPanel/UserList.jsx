import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import {
  Search,
  User,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  ShoppingBag,
  ChevronRight,
  X,
  Calendar,
  ShieldCheck,
  CreditCard,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for cleaner tailwind classes
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
        setUsers(res.data.users);
      } catch (err) {
        console.error("Error fetching users", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [users, searchTerm]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium animate-pulse">
          Initializing Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCF8F3] text-[#40200d] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-[#40200d] tracking-tight">
              Active Users
            </h1>
            <p className="text-[#8B5E3C] mt-1">
              Manage and monitor customer activity and purchases.
            </p>
          </div>

          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c08552] group-focus-within:text-[#ec4174] transition-colors" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="pl-10 pr-4 py-2.5 bg-white border border-[#F6E9D9] rounded-xl w-full md:w-80 shadow-sm focus:ring-2 focus:ring-[#ec4174]/20 focus:border-[#ec4174] outline-none transition-all text-[#40200d]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white border border-[#F6E9D9] rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F6E9D9]/30 border-b border-[#F6E9D9]">
                  <th className="px-6 py-4 text-xs font-semibold text-[#8B5E3C] uppercase tracking-wider">
                    User Profile
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#8B5E3C] uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#8B5E3C] uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#8B5E3C] uppercase tracking-wider text-center">
                    Courses
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#8B5E3C] uppercase tracking-wider text-center">
                    Orders
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#8B5E3C] uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F6E9D9]/50">
                {filteredUsers.map((user) => (
                  <motion.tr
                    layout
                    key={user._id}
                    onClick={() => setSelectedUser(user)}
                    className="hover:bg-[#FCF8F3] cursor-pointer transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#40200d] to-[#6d3d21] flex items-center justify-center text-[#F6E9D9] font-bold shadow-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-[#40200d] group-hover:text-[#ec4174] transition-colors">
                            {user.name}
                          </p>
                          <p className="text-xs text-[#c08552]">
                            ID: {user._id.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-[#40200d]/80">
                          <Mail className="w-3.5 h-3.5 text-[#c08552]" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#40200d]/80">
                          <Phone className="w-3.5 h-3.5 text-[#c08552]" />
                          {user.mobileNumber || "Not Linked"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border",
                          user.role === "admin"
                            ? "bg-amber-50 text-amber-700 border-amber-100"
                            : "bg-[#F6E9D9] text-[#40200d] border-[#F6E9D9]",
                        )}
                      >
                        {user.role || "User"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-[#FCF8F3] text-[#40200d] px-2 py-1 rounded-md text-xs font-bold font-mono border border-[#F6E9D9]">
                        {user.purchasedCourses?.length || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-[#FCF8F3] text-[#40200d] px-2 py-1 rounded-md text-xs font-bold font-mono border border-[#F6E9D9]">
                        {user.orders?.length || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ChevronRight className="w-5 h-5 text-[#c08552] group-hover:text-[#ec4174] transition-all transform group-hover:translate-x-1" />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 px-4">
              <div className="bg-[#FCF8F3] p-4 rounded-full mb-4">
                <Search className="w-8 h-8 text-[#c08552]" />
              </div>
              <p className="text-[#8B5E3C] font-medium">
                No users found matching "{searchTerm}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* User Detail Side Panel */}
      <AnimatePresence>
        {selectedUser && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedUser(null)}
              className="fixed inset-0 bg-[#40200d]/40 backdrop-blur-sm z-40"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-screen w-full max-w-lg bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                {/* Panel Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#40200d] flex items-center justify-center text-[#F6E9D9] text-xl font-bold">
                      {selectedUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[#40200d]">
                        {selectedUser.name}
                      </h2>
                      <p className="text-sm text-[#8B5E3C] flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Joined{" "}
                        {new Date(selectedUser.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="p-2 hover:bg-[#F6E9D9] rounded-xl text-[#c08552] hover:text-[#40200d] transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Content Sections */}
                <div className="space-y-8">
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#FCF8F3] border border-[#F6E9D9] p-3 rounded-2xl text-center">
                      <p className="text-[10px] text-[#8B5E3C] uppercase font-bold tracking-wider mb-1">
                        Orders
                      </p>
                      <p className="text-xl font-black text-[#ec4174]">
                        {selectedUser.orders?.length || 0}
                      </p>
                    </div>
                    <div className="bg-[#FCF8F3] border border-[#F6E9D9] p-3 rounded-2xl text-center">
                      <p className="text-[10px] text-[#8B5E3C] uppercase font-bold tracking-wider mb-1">
                        Courses
                      </p>
                      <p className="text-xl font-black text-[#40200d]">
                        {selectedUser.purchasedCourses?.length || 0}
                      </p>
                    </div>
                    <div className="bg-[#FCF8F3] border border-[#F6E9D9] p-3 rounded-2xl text-center">
                      <p className="text-[10px] text-[#8B5E3C] uppercase font-bold tracking-wider mb-1">
                        Addresses
                      </p>
                      <p className="text-xl font-black text-[#c08552]">
                        {selectedUser.addresses?.length || 0}
                      </p>
                    </div>
                  </div>

                  {/* Courses Section */}
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-[#40200d] mb-4 px-1">
                      <BookOpen className="w-4 h-4 text-[#ec4174]" /> Purchased
                      Courses
                    </h3>
                    <div className="space-y-3">
                      {selectedUser.purchasedCourses?.map((courseItem) => (
                        <div
                          key={courseItem._id}
                          className="p-3 bg-white border border-[#F6E9D9] rounded-xl shadow-sm flex items-center justify-between hover:border-[#ec4174]/30 transition-all"
                        >
                          <div>
                            <p className="font-bold text-[#40200d] text-sm">
                              {courseItem.courseId?.title}
                            </p>
                            <p className="text-[10px] text-[#8B5E3C] uppercase font-semibold">
                              Enrolled:{" "}
                              {new Date(
                                courseItem.purchasedAt,
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="p-2 bg-[#F6E9D9]/30 rounded-lg">
                            <ExternalLink className="w-4 h-4 text-[#40200d]" />
                          </div>
                        </div>
                      ))}
                      {!selectedUser.purchasedCourses?.length && (
                        <p className="text-sm text-[#8B5E3C] italic text-center py-4 bg-[#FCF8F3] rounded-xl border border-dashed border-[#F6E9D9]">
                          No active enrollments
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Orders Section */}
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-[#40200d] mb-4 px-1">
                      <ShoppingBag className="w-4 h-4 text-[#40200d]" /> Order
                      History
                    </h3>
                    <div className="space-y-3">
                      {selectedUser.orders?.map((order) => (
                        <div
                          key={order._id}
                          className="p-4 bg-[#FCF8F3] border border-[#F6E9D9] rounded-2xl group hover:bg-white transition-all"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="text-xs font-mono font-bold text-[#c08552]">
                                #ORD-{order._id.slice(-6)}
                              </p>
                              <p className="text-lg font-black text-[#40200d]">
                                ₹{order.totalPrice}
                              </p>
                            </div>
                            <span
                              className={cn(
                                "px-2 py-0.5 rounded text-[10px] uppercase font-bold",
                                order.paymentStatus === "paid"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-amber-100 text-amber-700",
                              )}
                            >
                              {order.paymentStatus}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#F6E9D9]">
                            <div className="w-2 h-2 rounded-full bg-[#ec4174] animate-pulse"></div>
                            <p className="text-xs font-bold text-[#8B5E3C] capitalize">
                              {order.orderStatus.replace(/_/g, " ")}
                            </p>
                          </div>
                        </div>
                      ))}
                      {!selectedUser.orders?.length && (
                        <p className="text-sm text-[#8B5E3C] italic text-center py-4 bg-[#FCF8F3] rounded-xl border border-dashed border-[#F6E9D9]">
                          No order history found
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Addresses Section */}
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-[#40200d] mb-4 px-1">
                      <MapPin className="w-4 h-4 text-[#ec4174]" /> Saved
                      Addresses
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {selectedUser.addresses?.map((addr) => (
                        <div
                          key={addr._id}
                          className={cn(
                            "p-4 rounded-2xl border transition-all",
                            addr.isDefault
                              ? "bg-[#F6E9D9]/30 border-[#ec4174]/30"
                              : "bg-white border-[#F6E9D9] shadow-sm",
                          )}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#40200d]">
                              {addr.label}
                            </span>
                            {addr.isDefault && (
                              <ShieldCheck className="w-4 h-4 text-[#ec4174]" />
                            )}
                          </div>
                          <p className="text-sm text-[#8B5E3C] leading-relaxed font-medium">
                            {addr.fullAddress}
                          </p>
                        </div>
                      ))}
                      {!selectedUser.addresses?.length && (
                        <p className="text-sm text-[#8B5E3C] italic text-center py-4 bg-[#FCF8F3] rounded-xl border border-dashed border-[#F6E9D9]">
                          No addresses provided
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserList;
