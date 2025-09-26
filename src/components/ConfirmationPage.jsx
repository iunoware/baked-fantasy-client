import {
  CheckCircle,
  Clock,
  MapPin,
  Package,
  Utensils,
  Import,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";

export function ConfirmationPage({
  orderNumber,
  orderSummary,
  selectedAddress,
}) {
  const estimatedDeliveryTime = new Date();
  estimatedDeliveryTime.setMinutes(estimatedDeliveryTime.getMinutes() + 30);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 text-lg">
          Thank you for your order. We're preparing your delicious meal!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Details */}
        <div className="space-y-6">
          {/* Order Info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Package className="h-6 w-6 text-pink-400" />
                <h3 className="font-semibold text-lg">Order Details</h3>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Number</span>
                  <span className="font-mono font-semibold">{orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Time</span>
                  <span>{new Date().toLocaleTimeString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Status</span>
                  <span className="text-green-600 font-medium">Confirmed</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-6 w-6 text-pink-400" />
                <h3 className="font-semibold text-lg">Delivery Address</h3>
              </div>

              {selectedAddress && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium mb-1">{selectedAddress.type}</p>
                  <p className="text-gray-600">{selectedAddress.address}</p>
                  {selectedAddress.landmark && (
                    <p className="text-gray-500 text-sm mt-1">
                      {selectedAddress.landmark}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Delivery Time */}
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="h-6 w-6 text-pink-400" />
                <h3 className="font-semibold text-lg text-pink-500">
                  Estimated Delivery
                </h3>
              </div>

              <div className="text-center">
                <p className="text-2xl font-bold text-orange-800 mb-1">
                  {estimatedDeliveryTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p className="text-orange-600">25-30 minutes from now</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          {/* Bill Details */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Bill Details</h3>

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

                <div className="flex justify-between font-bold text-lg">
                  <span>Total Paid</span>
                  <span className="text-sky-500">
                    ₹{orderSummary.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Tracking */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Order Status</h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Order Confirmed</p>
                    <p className="text-sm text-gray-500">Just now</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="font-medium">Preparing Your Food</p>
                    <p className="text-sm text-gray-500">5-10 minutes</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className="text-gray-500">Out for Delivery</p>
                    <p className="text-sm text-gray-400">15-20 minutes</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className="text-gray-500">Delivered</p>
                    <p className="text-sm text-gray-400">25-30 minutes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* <Button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              size="lg"
            >
              <Utensils className="mr-2 h-4 w-4" />
              Track Your Order
            </Button>

            <Button variant="outline" className="w-full">
              Download Invoice
            </Button> */}
            <button className="group relative w-full justify-center mt-6 inline-flex items-center overflow-hidden rounded-sm bg-cyan-500 px-8 py-3 text-white focus:ring-3 focus:outline-hidden mr-3">
              <span className="absolute -start-full transition-all group-hover:start-4">
                <Utensils size={15} />
              </span>

              <span className="text-sm font-medium text-center transition-all group-hover:ms-4">
                Track Your Order
              </span>
            </button>

            <button className="group relative w-full justify-center mt-2 inline-flex items-center overflow-hidden rounded-sm border-1 border-sky-500 px-8 py-3 text-sky-500 focus:ring-3 focus:outline-hidden mr-3">
              <span className="absolute -start-full transition-all group-hover:start-4">
                <Import size="15" />
              </span>

              <span className="text-sm font-medium text-center transition-all group-hover:ms-4">
                Download Invoice
              </span>
            </button>
          </div>

          {/* Help */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h4 className="font-medium text-blue-800 mb-2">Need Help?</h4>
              <p className="text-blue-600 text-sm mb-3">
                Having issues with your order? Our support team is here to help.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="text-blue-600 border-blue-300"
              >
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Thank You Message */}
      <div className="text-center mt-12 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
        <h3 className="font-semibold text-lg mb-2">
          Thank you for choosing us!
        </h3>
        <p className="text-gray-600">
          We appreciate your order and hope you enjoy your delicious meal. Don't
          forget to rate your experience!
        </p>
      </div>
    </div>
  );
}
