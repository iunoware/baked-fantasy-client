import { useState } from "react";
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

export function DeliveryPage({
  selectedAddress,
  setSelectedAddress,
  deliveryInstructions,
  setDeliveryInstructions,
  orderSummary,
  onNext,
  onPrevious,
}) {
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: "",
    address: "",
    landmark: "",
  });

  const addNewAddress = () => {
    if (!newAddress.type || !newAddress.address) return;
    setAddresses([...addresses, { id: Date.now().toString(), ...newAddress }]);
    setIsAddingAddress(false);
    setNewAddress({ type: "", address: "", landmark: "" });
  };

  const getAddressIcon = (type) => {
    return type.toLowerCase() === "home" ? Home : Building;
  };
  const [addresses, setAddresses] = useState([
    {
      id: "1",
      type: "Home",
      address: "123 Main Street, Apartment 4B, Downtown Area",
      landmark: "Near Central Park",
    },
    {
      id: "2",
      type: "Work",
      address: "456 Business District, Office Tower 2, Floor 15",
      landmark: "Opposite Metro Station",
    },
  ]);

  // function newAddress() {}

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
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
                        <Label htmlFor="address">Complete Address</Label>
                        <Textarea
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
                        onClick={addNewAddress}
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
                {addresses.map((address) => {
                  const IconComponent = getAddressIcon(address.type);
                  return (
                    <div
                      key={address.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedAddress?.id === address.id
                          ? "border-pink-500 bg-pink-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedAddress(address)}
                    >
                      <div className="flex items-start gap-3">
                        <IconComponent className="h-5 w-5 text-pink-400 mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{address.type}</span>
                            {selectedAddress?.id === address.id && (
                              <span className="text-xs bg-pink-400 text-white px-2 py-1 rounded">
                                Selected
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm">
                            {address.address}
                          </p>
                          {address.landmark && (
                            <p className="text-gray-500 text-xs mt-1">
                              {address.landmark}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
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
