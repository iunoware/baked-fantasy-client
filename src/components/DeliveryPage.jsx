import { useState, useRef, useEffect } from "react";
import AddressAutocomplete from "./AddressAutocomplete";
import {
  MapPin,
  Plus,
  Clock,
  ArrowRight,
  ArrowLeft,
  Home,
  Building,
  Download,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { data } from "react-router-dom";
import api from "../api";

export function DeliveryPage({
  selectedAddress,
  setSelectedAddress,
  deliveryInstructions,
  setDeliveryInstructions,
  orderSummary,
  setOrderSummary,
  onNext,
  onPrevious,
}) {
  const inputRef = useRef(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [activeAddress, setActiveAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    type: "",
    building: "",
    address: "",
    landmark: "",
    lat: null,
    lng: null,
  });

  const addAddress = async () => {
    try {
      if (!newAddress.address) {
        alert(
          "Please select a complete address from the autocomplete suggestions.",
        );
        return;
      }

      const token = localStorage.getItem("token");
      console.log(
        "🚨 [Frontend] POST /address - Token from localStorage:",
        token,
      );

      if (!token || token === "null") {
        alert("Please login to save your address.");
        return;
      }

      const res = await api.post("/address", {
        label: newAddress.type || "Home",
        fullAddress: newAddress.address,
        landmark: newAddress.landmark,
        lat: newAddress.lat,
        lng: newAddress.lng,
        building: newAddress.building,
        isDefault: true, // Mark as default so backend removes other defaults
      });

      const savedDoc = res.data;
      setAddresses((prev) =>
        Array.isArray(prev)
          ? prev
              .map((a) => ({ ...a, isDefault: false }))
              .concat({ ...savedDoc, isDefault: true })
          : [savedDoc],
      );
      setSelectedAddress({ ...savedDoc, isDefault: true }); // Auto-select to instantly calculate delivery fee!
      setIsAddingAddress(false); // Close the modal
      setNewAddress({
        type: "",
        building: "",
        address: "",
        landmark: "",
        lat: null,
        lng: null,
      }); // Reset form
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to save address. Please try again.");
    }
  };

  const handleSelectAddress = async (address) => {
    setSelectedAddress(address); // Optmistic UI change immediately

    try {
      const token = localStorage.getItem("token");
      if (!token || token === "null") return;

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
          lat: 9.922198052373819, // 🔥 YOUR SHOP LOCATION
          lng: 78.08955095041708,
        },
        destination: {
          lat: parseFloat(lat),
          lng: parseFloat(lng),
        },
      });

      return res.data; // ✅ axios gives data directly
    } catch (error) {
      console.error(
        "Frontend distance error:",
        error.response?.data || error.message,
      );
      // Return a safe fallback rather than crashing
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
          let distanceMeters = 3000; // Default 3km if failed
          if (!data || !data.success || data.distance === undefined) {
            console.error(
              "Could not calculate distance gracefully. Using default distance (3km).",
            );
          } else {
            distanceMeters = data.distance;
          }

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

  // fetching address from DB
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(
          "🚨 [Frontend] GET /address - Token from localStorage:",
          token,
        );

        if (!token || token === "null") {
          console.warn("User is not logged in, skipping address fetch.");
          return;
        }

        const res = await api.get("/address");
        const fetchedAddresses = res.data;
        if (Array.isArray(fetchedAddresses)) {
          setAddresses(fetchedAddresses);

          // Auto-select Default if parent prop is currently null
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
    return Math.round(10 * km); // ₹10 per km, rounded cleanly
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8 pt-12 md:pt-0">
        <div className="flex items-center gap-3 mb-2">
          <MapPin className="h-8 w-8 text-pink-500" />
          <h1 className="text-3xl font-bold">Delivery Details</h1>
        </div>
        <p className="text-gray-600">
          Choose your delivery address and preferences
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Delivery Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4 ">
                <h3 className="font-semibold text-lg">Delivery Address</h3>
                <Dialog
                  open={isAddingAddress}
                  onOpenChange={setIsAddingAddress}
                >
                  {/* <DialogTrigger asChild> */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => {
                      setIsAddingAddress(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                  </Button>
                  {/* </DialogTrigger> */}
                  <DialogContent className="bg-pink-50">
                    <DialogHeader>
                      <DialogTitle>Add New Address</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="type">Address Type</Label>
                        <Input
                          ref={inputRef}
                          id="type"
                          placeholder="Home, Work, etc."
                          value={newAddress.type}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              type: e.target.value,
                            })
                          }
                          className="focus:ring-1 focus:ring-black/70 focus:border-none mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="type">Building / Floor</Label>
                        <Input
                          ref={inputRef}
                          id="floor"
                          placeholder="23/ A"
                          value={newAddress.building}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              building: e.target.value,
                            })
                          }
                          className="focus:ring-1 focus:ring-black/70 focus:border-none mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Complete Address</Label>
                        {/* <Textarea
                          id="address"
                          placeholder="Enter your complete address"
                          className="mt-2"
                          value={newAddress.address}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              address: e.target.value,
                            })
                          }
                        /> */}
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
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="landmark">Landmark (Optional)</Label>
                        <Input
                          id="landmark"
                          placeholder="Near landmark"
                          value={newAddress.landmark}
                          className="focus:ring-1 focus:ring-black/70 focus:border-none mt-2"
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              landmark: e.target.value,
                            })
                          }
                        />
                      </div>
                      <button
                        onClick={addAddress}
                        className="group relative w-full cursor-pointer justify-center mt-6 inline-flex items-center overflow-hidden rounded-sm bg-cyan-500 px-8 py-3 text-white focus:ring-3 focus:outline-hidden mr-3"
                      >
                        <span className="absolute -start-full transition-all group-hover:start-4">
                          <Download size="15" />
                        </span>

                        <span className="text-sm font-medium text-center transition-all group-hover:ms-4">
                          Save Address
                        </span>
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-3">
                {addresses.length > 0 ? (
                  addresses.map((address) => {
                    const displayType = address.label || address.type || "";
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
                        key={address._id || address.id} // 🔥 use _id from Mongo
                        className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? "border-pink-600 bg-pink-50 ring-1 ring-pink-500 shadow-sm"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleSelectAddress(address)}
                        // onClick={() => setActiveAddress(address.id)}
                      >
                        <div className="flex items-start gap-3">
                          <IconComponent className="h-5 w-5 text-pink-400 mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-lg">
                                {displayType}
                              </span>
                              {isSelected && (
                                <span className="text-xs bg-pink-500 text-white px-2.5 py-1 rounded-full font-semibold shadow-sm">
                                  Deliver Here
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm mt-1">
                              {displayAddress}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h2>No Address added</h2>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Delivery Time */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-5 w-5 text-pink-500" />
                <h3 className="font-semibold">Estimated Delivery Time</h3>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-medium text-green-800">25-30 minutes</p>
                <p className="text-green-600 text-sm">
                  Your order will be delivered by 8:45 PM
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Instructions */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">
                Delivery Instructions (Optional)
              </h3>
              <Textarea
                placeholder="Add any specific instructions for the delivery person..."
                value={deliveryInstructions}
                onChange={(e) => setDeliveryInstructions(e.target.value)}
                rows={3}
              />
            </CardContent>
          </Card>
        </div>

        {/* Order Summary - Sticky */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{orderSummary.subtotal.toLocaleString()}</span>
                  </div>

                  {orderSummary.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{orderSummary.discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span>₹{orderSummary.taxes.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span
                      className={
                        orderSummary.deliveryFee === 0 ? "text-green-600" : ""
                      }
                    >
                      {orderSummary.deliveryFee === 0
                        ? "FREE"
                        : `₹${orderSummary.deliveryFee}`}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-blue-600">
                      ₹{orderSummary.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 mt-6">
                  <button
                    onClick={onNext}
                    disabled={!selectedAddress}
                    className="group relative w-full justify-center mt-6 inline-flex items-center overflow-hidden rounded-sm bg-cyan-500 px-8 py-3 text-white focus:ring-3 focus:outline-hidden mr-3"
                  >
                    <span className="absolute -start-full transition-all group-hover:start-4">
                      <ArrowRight size={15} />
                    </span>

                    <span className="text-sm font-medium text-center transition-all group-hover:ms-4">
                      Proceed to Payment
                    </span>
                  </button>

                  <button
                    onClick={onPrevious}
                    className="group relative w-full justify-center mt-2 inline-flex items-center overflow-hidden rounded-sm border-1 border-sky-500 px-8 py-3 text-sky-500 focus:ring-3 focus:outline-hidden mr-3"
                  >
                    <span className="absolute -start-full transition-all group-hover:start-4">
                      <ArrowLeft size={15} />
                    </span>

                    <span className="text-sm font-medium text-center transition-all group-hover:ms-4">
                      Back to Cart
                    </span>
                  </button>
                </div>

                {!selectedAddress && (
                  <p className="text-sm text-red-500 text-center mt-2">
                    Please select a delivery address to continue
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
