import {
  CreditCard,
  Smartphone,
  Wallet,
  Banknote,
  ArrowRight,
  ArrowLeft,
  Shield,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export function PaymentPage({
  paymentMethods,
  selectedPayment,
  setSelectedPayment,
  orderSummary,
  onNext,
  onPrevious,
}) {
  const getPaymentIcon = (type) => {
    switch (type) {
      case "card":
        return CreditCard;
      case "upi":
        return Smartphone;
      case "wallet":
        return Wallet;
      case "cod":
        return Banknote;
      default:
        return CreditCard;
    }
  };

  const getPaymentColor = (type) => {
    switch (type) {
      case "card":
        return "text-blue-500";
      case "upi":
        return "text-purple-500";
      case "wallet":
        return "text-green-500";
      case "cod":
        return "text-orange-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <CreditCard className="h-8 w-8 text-pink-500" />
          <h1 className="text-3xl font-bold">Payment</h1>
        </div>
        <p className="text-gray-600">Choose your preferred payment method</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Payment Methods */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment Options */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">
                Select Payment Method
              </h3>

              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const IconComponent = getPaymentIcon(method.type);
                  const iconColor = getPaymentColor(method.type);

                  return (
                    <div
                      key={method.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedPayment?.id === method.id
                          ? "border-pink-500 bg-pink-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedPayment(method)}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className={`h-6 w-6 ${iconColor}`} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{method.label}</span>
                            {selectedPayment?.id === method.id && (
                              <span className="text-xs bg-pink-500 text-white px-2 py-1 rounded">
                                Selected
                              </span>
                            )}
                          </div>
                          {method.details && (
                            <p className="text-gray-500 text-sm mt-1">
                              {method.details}
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

          {/* Card Details Form (shown only when card is selected) */}
          {selectedPayment?.type === "card" && (
            <Card className="mt-5">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Card Details</h3>
                <div className="space-y-5">
                  <div>
                    <Label htmlFor="cardNumber" className="pb-1">
                      Card Number
                    </Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="mt-1 focus:ring-1 focus:ring-black/70 focus:border-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry" className="pb-1">
                        Expiry Date
                      </Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        className="mt-1 focus:ring-1 focus:ring-black/70 focus:border-none"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        className="mt-1 focus:ring-1 focus:ring-black/70 focus:border-none"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardName" className="pb-1">
                      Cardholder Name
                    </Label>
                    <Input
                      id="cardName focus:ring-1 focus:ring-black/70 focus:border-none"
                      placeholder="John Doe"
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* UPI ID Form (shown only when UPI is selected) */}
          {selectedPayment?.type === "upi" && (
            <Card className="mt-5">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">UPI Details</h3>
                <div>
                  <Label htmlFor="upiId" className="pb-1 ">
                    UPI ID
                  </Label>
                  <Input
                    id="upiId"
                    placeholder="yourname@paytm"
                    className="mt-1 focus:ring-1 focus:ring-black/70 focus:border-none"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Info */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">Secure Payment</p>
                  <p className="text-green-600 text-sm">
                    Your payment information is encrypted and secure
                  </p>
                </div>
              </div>
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
                    <span>Total Amount</span>
                    <span className="text-sky-500">
                      ₹{orderSummary.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 mt-6">
                  <button
                    onClick={onNext}
                    disabled={!selectedPayment}
                    className="group relative w-full justify-center mt-6 inline-flex items-center overflow-hidden rounded-sm bg-cyan-500 px-8 py-3 text-white focus:ring-3 focus:outline-hidden mr-3"
                  >
                    <span className="absolute -start-full transition-all group-hover:start-4">
                      <ArrowRight size={15} />
                    </span>

                    <span className="text-sm font-medium text-center transition-all group-hover:ms-4">
                      Place Order ₹{orderSummary.total.toLocaleString()}
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
                      Back to Delivery
                    </span>
                  </button>
                </div>

                {!selectedPayment && (
                  <p className="text-sm text-red-500 text-center mt-2">
                    Please select a payment method to continue
                  </p>
                )}

                {/* Payment Benefits */}
                <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">
                    Payment Benefits:
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• 100% secure transactions</li>
                    <li>• Instant payment confirmation</li>
                    <li>• Easy refunds & cancellations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
