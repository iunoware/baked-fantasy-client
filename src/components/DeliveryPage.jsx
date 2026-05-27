/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
// import AddressAutocomplete from "./AddressAutocomplete";
import AddressAutocomplete from "./AddressAutoComplete.jsx";
import {
  MapPin,
  Plus,
  Clock,
  ArrowRight,
  ArrowLeft,
  Home,
  Building,
  X,
  Info,
  ShieldCheck,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import api from "../api";
import toast from "react-hot-toast";

export function DeliveryPage({
  cartItems,
  user,
  selectedAddress,
  setSelectedAddress,
  deliveryInstructions,
  setDeliveryInstructions,
  orderSummary,
  setOrderSummary,
  onNext,
  onPrevious,
}) {
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [distanceKm, setDistanceKm] = useState(null);
  const [newAddress, setNewAddress] = useState({
    type: "",
    building: "",
    address: "",
    landmark: "",
    lat: null,
    lng: null,
  });
  const userDetails = {
    name: user?.name,
    email: user?.email,
    phone: user?.mobileNumber,
  };
  const API_URL = import.meta.env.VITE_API_URL;

  const filteredItems = cartItems.filter(
    (item) => item.type !== "essential" && item.deliveryType === "local",
  );
  const itemsText = filteredItems
    .map((item) => `${item.name} x${item.quantity}`)
    .join(", ");

  const message = `
Hi 
I want to place an order.

Address: ${selectedAddress?.fullAddress}

 Items: ${itemsText}

Please assist with delivery.
`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/916379240125?text=${encodedMessage}`;

  const addAddress = async () => {
    try {
      if (!newAddress.address) {
        alert(
          "Please select a complete address from the autocomplete suggestions.",
        );
        return;
      }

      const res = await api.post("/address", {
        label: newAddress.type || "Home",
        fullAddress: newAddress.address,
        landmark: newAddress.landmark,
        lat: newAddress.lat,
        lng: newAddress.lng,
        building: newAddress.building,
        isDefault: true,
      });

      const savedDoc = res.data;
      setAddresses((prev) =>
        Array.isArray(prev)
          ? prev
              .map((a) => ({ ...a, isDefault: false }))
              .concat({ ...savedDoc, isDefault: true })
          : [savedDoc],
      );
      setSelectedAddress({ ...savedDoc, isDefault: true });
      setIsAddingAddress(false);
      setNewAddress({
        type: "",
        building: "",
        address: "",
        landmark: "",
        lat: null,
        lng: null,
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to save address. Please try again.");
    }
  };

  const handleSelectAddress = async (address) => {
    setSelectedAddress(address);

    try {
      const addressId = address._id || address.id;
      if (!addressId) return;

      const res = await api.put(`/address/${addressId}/select`);

      if (Array.isArray(res.data)) {
        setAddresses(res.data);
      }
    } catch (error) {
      console.error(
        "Failed to select address on backend:",
        error.response?.data || error.message,
      );
    }
  };

  const getDistanceFromBackend = async (lat, lng) => {
    try {
      const res = await api.post("/distance", {
        origin: {
          lat: 9.922198052373819,
          lng: 78.08955095041708,
        },
        destination: {
          lat: parseFloat(lat),
          lng: parseFloat(lng),
        },
      });

      return res.data;
    } catch (error) {
      console.error(
        "Frontend distance error:",
        error.response?.data || error.message,
      );
      return { success: false, error: "Failed", distance: 5000 };
    }
  };

  const getAddressIcon = (type) => {
    if (!type || typeof type !== "string") return Home;
    return type.toLowerCase() === "home" ? Home : Building;
  };

  useEffect(() => {
    if (selectedAddress?.lat && selectedAddress?.lng) {
      getDistanceFromBackend(selectedAddress.lat, selectedAddress.lng).then(
        (data) => {
          let distanceMeters = 3000;
          if (!data || !data.success || data.distance === undefined) {
            console.error(
              "Could not calculate distance gracefully. Using default distance (3km).",
            );
          } else {
            distanceMeters = data.distance;
          }

          setDistanceKm(distanceMeters / 1000);

          const fee = calculateDeliveryFee(distanceMeters);

          setOrderSummary((prev) => ({
            ...prev,
            deliveryFee: fee,
            total: prev.subtotal - prev.discount + prev.taxes + fee,
          }));
        },
      );
    }
  }, [selectedAddress, setOrderSummary]);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await api.get("/address");
        const fetchedAddresses = res.data;
        if (Array.isArray(fetchedAddresses)) {
          setAddresses(fetchedAddresses);

          if (!selectedAddress && fetchedAddresses.length > 0) {
            const defaultAddr =
              fetchedAddresses.find((addr) => addr.isDefault) ||
              fetchedAddresses[0];
            setSelectedAddress(defaultAddr);
          }
        } else {
          setAddresses([]);
        }
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };
    fetchAddress();
  }, []);

  function calculateDeliveryFee(meters) {
    const km = meters / 1000;
    return Math.round(10 * km);
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    console.log("Order Summary:", orderSummary);
    console.log("Amount:", orderSummary.total * 100);

    try {
      setLoading(true);
      const res = await loadRazorpayScript();

      if (!res) {
        toast.error("Razorpay SDK failed to load. Are you online?");
        setLoading(false);
        return;
      }

      // Create order
      const response = await fetch(`${API_URL}/api/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: orderSummary.total * 100, // amount in paise
          currency: "INR",
          receipt: `receipt_${Date.now()}`,
          user: {
            userId: user?._id,
            name: userDetails.name || selectedAddress?.building || "Customer",
            email: userDetails.email || "customer@example.com",
            phone: userDetails.phone || "9999999999",
          },
          products: cartItems.map((item) => ({
            productId: item._id || item.id,
            title: item.name || item.title,
            price: item.price,
            productType:
              item.type === "cake"
                ? "Cake"
                : item.type === "course"
                  ? "Course"
                  : "Essential",
            quantity: item.quantity,
          })),
          shippingAddress: {
            name: userDetails.name || selectedAddress?.building || "Customer",
            phone: userDetails.phone || "9999999999",
            address: selectedAddress?.fullAddress || "",
            city: "Salem",
            pincode: selectedAddress?.pincode || "",
          },
          paymentMethod: "card",
        }),
      });

      if (!response.ok) {
        let errorMessage = "Failed to create order";
        try {
          const errData = await response.json();
          if (errData.error) errorMessage = errData.error;
        } catch (e) {
          // Ignore JSON parse errors
        }
        throw new Error(errorMessage);
      }

      const orderData = await response.json();
      console.log("ORDER DATA:", orderData);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "The Baked Fantasy",
        description: "Order Payment",
        order_id: orderData.order_id,
        handler: async function (response) {
          try {
            // Verify payment signature
            const verifyRes = await fetch(`${API_URL}/api/verify-payment`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (verifyRes.ok) {
              const result = await verifyRes.json();
              if (result.success) {
                sessionStorage.setItem("orderId", result.orderId);
                onNext(); // Proceed to ConfirmationPage
              }
            } else {
              alert("Payment verification failed. Please contact support.");
              setLoading(false);
            }
          } catch (error) {
            console.error("Verification error:", error);
            alert("Payment verification failed. Please contact support.");
            setLoading(false);
          }
        },
        prefill: {
          name: userDetails.name || "Customer",
          email: userDetails.email || "customer@example.com",
          contact: userDetails.phone || "9999999999",
        },
        notes: {
          subtotal: orderSummary.subtotal,
          taxes: orderSummary.taxes,
          deliveryFee: orderSummary.deliveryFee,
          // paymentMethod: selectedPayment.type,
        },
        theme: {
          color: "#8B4513",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      console.log("OPTIONS:", options);
      console.log("Razorpay Exists:", window.Razorpay);

      const paymentObject = new window.Razorpay(options);

      paymentObject.on("payment.failed", function (response) {
        console.error("Payment Failed", response.error);
        alert(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });

      paymentObject.open();
    } catch (error) {
      console.error("FULL PAYMENT ERROR:", error);

      if (error.response) {
        console.error("Response Data:", error.response.data);
        console.error("Response Status:", error.response.status);
      }

      alert(
        error?.message ||
          error?.response?.data?.error ||
          "Error initiating checkout.",
      );

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pb-24">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-[#FFF5E1] via-[#FAF9F6] to-[#fafafa] pointer-events-none -z-10"></div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between items-start gap-4 px-2">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-1.5 bg-sbrown rounded-full shadow-sm shadow-red-100"></span>
              <span className="text-[11px] font-black text-pbrown uppercase tracking-[0.25em]">
                Secure Shipping
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter mb-4 flex items-center gap-6">
              Delivery
            </h1>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest max-w-md leading-relaxed">
              Items are grouped based on delivery type. Please ensure your
              address is accurate for timely delivery.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* Contact Information Section */}
            {/* <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <h3 className="font-black text-xl text-gray-900 tracking-tight mb-6">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="contact-name"
                    className="text-[10px] font-black uppercase text-gray-800 tracking-widest block mb-2"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="contact-name"
                    placeholder="Enter your full name"
                    value={userDetails.name}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        name: e.target.value,
                      })
                    }
                    className="h-12 rounded-xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-sbrown/10 focus:border-sbrown/20 font-bold text-sm"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="contact-phone"
                    className="text-[10px] font-black uppercase text-gray-800 tracking-widest block mb-2"
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={userDetails.phone}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        phone: e.target.value,
                      })
                    }
                    className="h-12 rounded-xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-sbrown/10 focus:border-sbrown/20 font-bold text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label
                    htmlFor="contact-email"
                    className="text-[10px] font-black uppercase text-gray-800 tracking-widest block mb-2"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="Enter your email address"
                    value={userDetails.email}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        email: e.target.value,
                      })
                    }
                    className="h-12 rounded-xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-sbrown/10 focus:border-sbrown/20 font-bold text-sm"
                  />
                </div>
              </div>
            </div> */}

            {/* Address List Section */}
            <div>
              <div className="flex items-center justify-between mb-6 px-2">
                <h3 className="font-black text-xl text-gray-900 tracking-tight flex items-center gap-3">
                  <MapPin className="text-sbrown" size={24} />
                  Saved Addresses
                </h3>
                <Dialog
                  open={isAddingAddress}
                  onOpenChange={setIsAddingAddress}
                >
                  <Button
                    onClick={() => setIsAddingAddress(true)}
                    className="h-10 px-6 rounded-xl bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-md flex items-center gap-2"
                  >
                    <Plus size={14} strokeWidth={3} />
                    Add New
                  </Button>
                  <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-3xl bg-white rounded-[2.5rem]">
                    <div className="bg-pbrown p-6 text-white relative">
                      <button
                        onClick={() => setIsAddingAddress(false)}
                        className="absolute right-6 top-6 h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-95 z-20"
                      >
                        <X size={18} className="text-white" />
                      </button>
                      <DialogHeader className="relative text-left">
                        <DialogTitle className="text-2xl font-black tracking-tighter">
                          Add Address
                        </DialogTitle>
                        <DialogDescription className="text-pink-100/70 font-bold uppercase text-[10px] tracking-widest ">
                          Save a new delivery location
                        </DialogDescription>
                      </DialogHeader>
                    </div>

                    <div className="p-8 space-y-8">
                      <div>
                        <Label className="text-[10px] font-black uppercase text-gray-800 tracking-widest block mb-4">
                          Location Type
                        </Label>
                        <div className="flex gap-3">
                          {[
                            { id: "Home", icon: <Home size={16} /> },
                            { id: "Work", icon: <Building size={16} /> },
                            { id: "Other", icon: <MapPin size={16} /> },
                          ].map((type) => (
                            <button
                              key={type.id}
                              onClick={() =>
                                setNewAddress({ ...newAddress, type: type.id })
                              }
                              className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all active:scale-95 ${
                                newAddress.type === type.id
                                  ? "bg-white border-pbrown text-pbrown shadow-sm"
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
                        <div>
                          <Label className="text-[10px] font-black uppercase text-gray-800 tracking-widest block mb-2">
                            Google Address Search
                          </Label>
                          <AddressAutocomplete
                            setLocation={(location) =>
                              setNewAddress({
                                ...newAddress,
                                address: location.address,
                                place_id: location.place_id,
                                lat: location.lat,
                                lng: location.lng,
                              })
                            }
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-[10px] font-black uppercase text-gray-800 tracking-widest block mb-2">
                              Building / Flat
                            </Label>
                            <Input
                              placeholder="House No., Unit"
                              value={newAddress.building}
                              onChange={(e) =>
                                setNewAddress({
                                  ...newAddress,
                                  building: e.target.value,
                                })
                              }
                              className="h-12 rounded-xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-sbrown/10 focus:border-sbrown/20 font-bold text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-[10px] font-black uppercase text-gray-800 tracking-widest block mb-2">
                              Landmark
                            </Label>
                            <Input
                              placeholder="Nearby place"
                              value={newAddress.landmark}
                              onChange={(e) =>
                                setNewAddress({
                                  ...newAddress,
                                  landmark: e.target.value,
                                })
                              }
                              className="h-12 rounded-xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-sbrown/10 focus:border-sbrown/20 font-bold text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={addAddress}
                        className="w-full h-14 rounded-2xl bg-sbrown hover:bg-pbrown text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-red-100 transition-all active:scale-[0.98] group"
                      >
                        Save location
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                {addresses.length > 0 ? (
                  addresses.map((address) => {
                    const displayType = address.label || address.type || "Home";
                    const displayAddress = [
                      address.building,
                      address.fullAddress || address.address,
                    ]
                      .filter(Boolean)
                      .join(", ");
                    const IconComponent = getAddressIcon(displayType);
                    const isSelected =
                      String(selectedAddress?._id) === String(address._id);

                    return (
                      <div
                        key={address._id || address.id}
                        className={`group p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex flex-col gap-3 relative overflow-hidden ${
                          isSelected
                            ? "bg-white border-sbrown shadow-lg scale-[1.02]"
                            : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-md"
                        }`}
                        onClick={() => handleSelectAddress(address)}
                      >
                        <div className="flex items-start justify-between">
                          <div
                            className={`p-2 rounded-xl ${isSelected ? "bg-sbrown text-white" : "bg-gray-50 text-gray-400 group-hover:bg-gray-100"} transition-colors`}
                          >
                            <IconComponent size={20} />
                          </div>
                          {isSelected && (
                            <span className="text-[9px] font-black uppercase tracking-widest bg-green-50 text-green-600 px-2 py-1 rounded-md border border-green-100">
                              Selected
                            </span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-black text-gray-900 uppercase text-xs tracking-wider mb-1 text-left">
                            {displayType}
                          </h4>
                          <p className="text-gray-500 text-[11px] font-bold leading-relaxed line-clamp-2 text-left">
                            {displayAddress}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="absolute top-0 right-0 w-16 h-16 bg-sbrown/5 rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-1 md:col-span-2 py-12 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                    <MapPin
                      className="mx-auto text-gray-200 mb-4"
                      size={48}
                      strokeWidth={1}
                    />
                    <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                      No addresses found
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Estimated Delivery Highlight */}
            <div className="p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100 flex flex-col md:flex-row items-center gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-100 shrink-0">
                <Clock size={32} />
              </div>
              <div className="text-center md:text-left">
                <p className="text-xs font-black text-emerald-900 uppercase tracking-widest mb-1">
                  Estimated Delivery Time
                </p>
                <div className="flex items-baseline gap-2 justify-center md:justify-start">
                  <span className="text-2xl font-black text-emerald-600 tracking-tighter text-left">
                    25-30 Minutes
                  </span>
                  <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider text-left">
                    Arriving by 8:45 PM
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Instructions */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <h3 className="font-black text-xl text-gray-900 tracking-tight mb-6">
                Delivery Instructions{" "}
                <span className="text-gray-300 font-bold text-sm ml-2 uppercase tracking-widest leading-loose">
                  (Optional)
                </span>
              </h3>
              <Textarea
                placeholder="Ex: Ring the bell, Leave at the gate..."
                value={deliveryInstructions}
                onChange={(e) => setDeliveryInstructions(e.target.value)}
                className="min-h-[120px] rounded-2xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-sbrown/10 focus:border-sbrown/20 font-bold text-sm resize-none p-4"
              />
            </div>
          </div>

          {/* Sticky Summary Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-36 h-min">
            <Card className="border-none shadow-2xl rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-white border border-gray-100">
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-black text-xl text-gray-900 tracking-tight">
                    Order Summary
                  </h3>
                  <Badge
                    variant="secondary"
                    className="bg-gray-50 text-gray-400 font-black text-[10px] uppercase tracking-widest px-3"
                  >
                    Step 2/3
                  </Badge>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                      Subtotal
                    </span>
                    <span className="font-black text-gray-900">
                      ₹{orderSummary.subtotal.toLocaleString()}
                    </span>
                  </div>

                  {orderSummary.discount > 0 && (
                    <div className="flex justify-between items-center text-green-600 font-black">
                      <span className="text-[10px] uppercase tracking-widest">
                        Discount
                      </span>
                      <span>-₹{orderSummary.discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                      Taxes & Fees
                    </span>
                    <span className="font-black text-gray-900">
                      ₹{orderSummary.taxes.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest transition-colors">
                      Delivery Fee
                    </span>
                    <span
                      className={`font-black ${orderSummary.deliveryFee === 0 ? "text-green-600" : "text-gray-900"}`}
                    >
                      {orderSummary.deliveryFee === 0
                        ? "FREE"
                        : `₹${orderSummary.deliveryFee.toLocaleString()}`}
                    </span>
                  </div>

                  <Separator className="bg-gray-100" />

                  <div className="flex justify-between items-end mb-8 mt-10">
                    <span className="text-base md:text-lg font-bold text-gray-900 tracking-tighter">
                      Total Price
                    </span>
                    <span className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tighter tabular-nums leading-none">
                      ₹ {orderSummary.total.toLocaleString()}
                    </span>
                  </div>

                  {distanceKm !== null && distanceKm > 8 ? (
                    <div className="space-y-4">
                      <div className="bg-amber-50 rounded-2xl p-4 flex gap-3 border border-amber-100">
                        <Info size={18} className="text-amber-500 shrink-0" />
                        <p className="text-[10px] font-bold text-amber-700 uppercase leading-relaxed tracking-wider">
                          You're {distanceKm.toFixed(1)}km away. Contact us on
                          WhatsApp to arrange special delivery.
                        </p>
                      </div>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-14 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-black uppercase tracking-[0.15em] text-[10px] md:text-xs transition-all flex items-center justify-center shadow-lg shadow-green-100"
                      >
                        Contact on WhatsApp
                      </a>
                    </div>
                  ) : (
                    // <Button
                    //   disabled={!selectedAddress || distanceKm === null}
                    //   onClick={onNext}
                    //   className="w-full h-14 md:h-16 rounded-2xl bg-sbrown hover:bg-pbrown text-white font-black uppercase tracking-[0.15em] text-[10px] md:text-xs transition-all hover:-translate-y-1 active:scale-[0.98] disabled:opacity-30 flex items-center justify-center gap-3"
                    // >
                    //   {distanceKm === null && selectedAddress
                    //     ? "Calculating distance..."
                    //     : "Proceed to Payment"}
                    //   <ArrowRight size={18} />
                    // </Button>
                    <>
                      <Button
                        disabled={
                          !selectedAddress ||
                          distanceKm === null ||
                          !userDetails.name ||
                          !userDetails.email ||
                          !userDetails.phone ||
                          loading
                        }
                        onClick={handlePayment}
                        className="w-full h-14 md:h-16 rounded-2xl bg-sbrown hover:bg-pbrown text-white font-black uppercase tracking-[0.15em] text-[10px] md:text-xs transition-all hover:-translate-y-1 active:scale-[0.98] disabled:opacity-30 flex items-center justify-center gap-3 shadow-xl shadow-brown/10"
                      >
                        {loading ? "Processing Payment..." : "Place Order"}
                        {!loading && <ArrowRight size={18} />}
                      </Button>
                      {(!userDetails.name ||
                        !userDetails.email ||
                        !userDetails.phone) && (
                        <p className="text-[10px] font-black text-red-500 uppercase tracking-widest text-center mt-2">
                          Please fill in your contact information
                        </p>
                      )}
                    </>
                  )}

                  <button
                    onClick={onPrevious}
                    className="w-full h-12 rounded-xl border-2 border-gray-100 text-gray-400 font-black uppercase tracking-widest text-[9px] hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                  >
                    <ArrowLeft size={14} strokeWidth={3} />
                    Back to Cart
                  </button>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 flex gap-3 border border-gray-100 mt-6">
                  <ShieldCheck size={18} className="text-gray-400 shrink-0" />
                  <p className="text-[9px] font-bold text-gray-500 uppercase leading-relaxed tracking-wider">
                    Your location data is used only for calculating local
                    delivery availability.
                  </p>
                </div>
              </div>
            </Card>
            {!selectedAddress && (
              <p className="text-[10px] font-black text-red-500 uppercase tracking-widest text-center mt-4">
                Please select a delivery address to continue
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
