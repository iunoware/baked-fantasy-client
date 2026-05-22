import React, { useState, useEffect } from "react";
import { X, MapPin, Home, Building, ArrowRight, Loader2 } from "lucide-react";
// import AddressAutocomplete from "../components/AddressAutoComplete";
import AddressAutocomplete from "./AddressAutoComplete";
import api from "../api";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext.jsx";

const CompleteProfileModal = ({ isOpen, onClose }) => {
  const { onProfileSaved, user: currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: "Home",
    building: "",
    address: "",
    landmark: "",
    lat: null,
    lng: null,
  });

  useEffect(() => {
    if (isOpen && currentUser) {
      setNewAddress((prev) => ({
        ...prev,
        building: currentUser.address1 || prev.building,
        address: currentUser.fullAddress || prev.address,
        landmark: currentUser.landmark || prev.landmark,
      }));
    }
  }, [isOpen, currentUser]);

  const isFormValid = () => {
    return !!(newAddress.address && newAddress.building);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      toast.error("Please fill in the required fields");
      return;
    }

    setIsLoading(true);
    try {
      // 1. Save address to backend (Auth managed via cookies)
      const res = await api.post("/address", {
        label: newAddress.type || "Home",
        fullAddress: newAddress.address,
        landmark: newAddress.landmark,
        lat: newAddress.lat,
        lng: newAddress.lng,
        building: newAddress.building,
        isDefault: true,
      });

      // 2. Construct updated user object for the architected state system
      const updatedUser = {
        ...currentUser,
        profileCompleted: true,
        address1: newAddress.building,
        fullAddress: newAddress.address,
        landmark: newAddress.landmark,
        city: "Madurai",
        pincode: "625001",
      };

      // 3. Delegate to Context to handle resume action and state updates
      onProfileSaved(updatedUser);
      toast.success("Profile details saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save address. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" />

      {/* Modal - Theme matching DeliveryPage Dialog */}
      <div className="relative w-full max-w-[500px] bg-white rounded-[2.5rem] shadow-3xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        {/* Header - Matching DeliveryPage style */}
        <div className="bg-pbrown p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute right-6 top-6 h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-95 z-20"
          >
            <X size={18} className="text-white" />
          </button>
          <div className="relative text-left">
            <h2 className="text-2xl font-black tracking-tighter">
              Enter Delivery Details
            </h2>
            <p className="text-pink-100/70 font-bold uppercase text-[10px] tracking-widest mt-1">
              Complete your profile to continue shopping
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8 overflow-y-auto max-h-[80vh] hide-scrollbar">
          {/* Location Type Selector */}
          <div>
            <label className="text-[10px] font-black uppercase text-gray-800 tracking-widest block mb-4">
              Location Type
            </label>
            <div className="flex gap-3">
              {[
                { id: "Home", icon: <Home size={16} /> },
                { id: "Work", icon: <Building size={16} /> },
                { id: "Other", icon: <MapPin size={16} /> },
              ].map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() =>
                    setNewAddress({ ...newAddress, type: type.id })
                  }
                  className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all active:scale-95 ${
                    newAddress.type === type.id
                      ? "bg-[#fff4d9] border-pbrown text-pbrown shadow-sm"
                      : "bg-white border-gray-100 text-gray-400 hover:border-gray-200"
                  }`}
                >
                  {type.icon}
                  <span className="text-[10px] font-black uppercase tracking-wider">
                    {type.id}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* Google Address Search */}
            <div>
              <label className="text-[10px] font-black uppercase text-gray-800 tracking-widest block mb-2">
                Google Address Search
              </label>
              <AddressAutocomplete
                setLocation={(location) =>
                  setNewAddress({
                    ...newAddress,
                    address: location.address,
                    lat: location.lat,
                    lng: location.lng,
                  })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Building / Flat */}
              <div className="col-span-1">
                <label className="text-[10px] font-black uppercase text-gray-800 tracking-widest block mb-2">
                  Building / Flat
                </label>
                <input
                  type="text"
                  placeholder="e.g. 23/A, Green Apt."
                  value={newAddress.building}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, building: e.target.value })
                  }
                  className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-[#870D32]/10 focus:border-[#870D32]/20 font-bold text-sm outline-none transition-all"
                  required
                />
              </div>

              {/* Landmark */}
              <div className="col-span-1">
                <label className="text-[10px] font-black uppercase text-gray-800 tracking-widest block mb-2">
                  Landmark
                </label>
                <input
                  type="text"
                  placeholder="e.g. Near Park"
                  value={newAddress.landmark}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, landmark: e.target.value })
                  }
                  className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-[#870D32]/10 focus:border-[#870D32]/20 font-bold text-sm outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!isFormValid() || isLoading}
            className="w-full h-14 rounded-2xl bg-sbrown hover:bg-pbrown text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-red-100 transition-all active:scale-[0.98] group flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Save & Continue
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

        {/* Footer Note */}
        <div className="p-4 bg-gray-50 text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Trusted by 10,000+ happy customers
          </p>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default CompleteProfileModal;
