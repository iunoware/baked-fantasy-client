import {
  CreditCard,
  Smartphone,
  Wallet,
  Banknote,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "./ui/badge";

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
        return "text-emerald-500";
      case "cod":
        return "text-amber-500";
      default:
        return "text-gray-500";
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
                Secure Checkout
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter mb-4 flex items-center gap-6">
              Payment
            </h1>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest max-w-md leading-relaxed">
              Choose your preferred payment method. All transactions are encrypted and 100% secure.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* Payment Methods Section */}
            <div>
              <h3 className="font-black text-xl text-gray-900 tracking-tight flex items-center gap-3 mb-6 px-2">
                <CreditCard className="text-sbrown" size={24} />
                Select Payment Method
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => {
                  const IconComponent = getPaymentIcon(method.type);
                  const iconColor = getPaymentColor(method.type);
                  const isSelected = selectedPayment?.id === method.id;

                  return (
                    <div
                      key={method.id}
                      className={`group p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer flex items-center gap-4 relative overflow-hidden ${
                        isSelected
                          ? "bg-white border-sbrown shadow-lg scale-[1.02]"
                          : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-md"
                      }`}
                      onClick={() => setSelectedPayment(method)}
                    >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${isSelected ? "bg-sbrown text-white" : "bg-gray-50 " + iconColor} shadow-sm border border-gray-50`}>
                        <IconComponent size={28} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-black text-gray-900 uppercase text-xs tracking-wider">
                            {method.label}
                          </span>
                          {isSelected && (
                            <Badge className="bg-green-50 text-green-600 border-green-100 text-[8px] h-4 px-1.5 font-black uppercase tracking-widest">
                              Active
                            </Badge>
                          )}
                        </div>
                        {method.details && (
                          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider leading-tight">
                            {method.details}
                          </p>
                        )}
                      </div>
                      {isSelected && (
                        <div className="absolute top-0 right-0 w-12 h-12 bg-sbrown/5 rounded-bl-full -mr-6 -mt-6 pointer-events-none"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Conditional Sub-forms */}
            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
              {/* Card Details Form */}
              {selectedPayment?.type === "card" && (
                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                      <Lock size={20} />
                    </div>
                    <h3 className="font-black text-xl text-gray-900 tracking-tight">Card Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2">
                      <Label className="text-[10px] font-black uppercase text-gray-800 tracking-widest block mb-2">Card Number</Label>
                      <Input
                        placeholder="0000 0000 0000 0000"
                        className="h-14 rounded-2xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-sbrown/10 focus:border-sbrown/20 font-black text-lg tracking-[0.2em] placeholder:tracking-normal placeholder:text-gray-300"
                      />
                    </div>
                    <div>
                      <Label className="text-[10px] font-black uppercase text-gray-800 tracking-widest block mb-2">Expiry Date</Label>
                      <Input
                        placeholder="MM / YY"
                        className="h-14 rounded-2xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-sbrown/10 focus:border-sbrown/20 font-black text-sm uppercase tracking-widest"
                      />
                    </div>
                    <div>
                      <Label className="text-[10px] font-black uppercase text-gray-800 tracking-widest block mb-2">CVV</Label>
                      <Input
                        placeholder="123"
                        type="password"
                        className="h-14 rounded-2xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-sbrown/10 focus:border-sbrown/20 font-black text-sm uppercase tracking-widest"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-[10px] font-black uppercase text-gray-800 tracking-widest block mb-2">Cardholder Name</Label>
                      <Input
                        placeholder="ENTER FULL NAME"
                        className="h-14 rounded-2xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-sbrown/10 focus:border-sbrown/20 font-black text-sm uppercase tracking-widest"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* UPI Form */}
              {selectedPayment?.type === "upi" && (
                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500">
                      <Smartphone size={20} />
                    </div>
                    <h3 className="font-black text-xl text-gray-900 tracking-tight">UPI Verification</h3>
                  </div>
                  <div>
                    <Label className="text-[10px] font-black uppercase text-gray-800 tracking-widest block mb-2">UPI ID</Label>
                    <Input
                      placeholder="username@bank"
                      className="h-14 rounded-2xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-sbrown/10 focus:border-sbrown/20 font-black text-lg text-pbrown placeholder:text-gray-300 tracking-tight"
                    />
                    <p className="mt-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                      Enter your VPA ID and you will receive a payment request on your mobile app.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Trust & Security Info */}
            <div className="bg-emerald-50 rounded-[2rem] border border-emerald-100 p-6 flex gap-4 items-center">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-50">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-xs font-black text-emerald-900 uppercase tracking-widest">Enterprise Security</p>
                <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider leading-relaxed">
                  Your payment information is processed securely with 256-bit SSL encryption.
                </p>
              </div>
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
                  <Badge variant="secondary" className="bg-gray-50 text-gray-400 font-black text-[10px] uppercase tracking-widest px-3">
                    Final Step
                  </Badge>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Subtotal</span>
                    <span className="font-black text-gray-900">₹{orderSummary.subtotal.toLocaleString()}</span>
                  </div>

                  {orderSummary.discount > 0 && (
                    <div className="flex justify-between items-center text-green-600 font-black">
                      <span className="text-[10px] uppercase tracking-widest">Discount</span>
                      <span>-₹{orderSummary.discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Taxes & Fees</span>
                    <span className="font-black text-gray-900">₹{orderSummary.taxes.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest transition-colors">Delivery Fee</span>
                    <span className={`font-black ${orderSummary.deliveryFee === 0 ? "text-green-600" : "text-gray-900"}`}>
                      {orderSummary.deliveryFee === 0 ? "FREE" : `₹${orderSummary.deliveryFee.toLocaleString()}`}
                    </span>
                  </div>

                  <Separator className="bg-gray-100" />

                  <div className="flex justify-between items-end mb-8 mt-10">
                    <span className="text-base md:text-lg font-bold text-gray-900 tracking-tighter">Total Amount</span>
                    <span className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tighter tabular-nums leading-none">
                      ₹ {orderSummary.total.toLocaleString()}
                    </span>
                  </div>

                  <Button
                    disabled={!selectedPayment}
                    onClick={onNext}
                    className="w-full h-14 md:h-16 rounded-2xl bg-sbrown hover:bg-pbrown text-white font-black uppercase tracking-[0.15em] text-[10px] md:text-xs transition-all hover:-translate-y-1 active:scale-[0.98] disabled:opacity-30 flex items-center justify-center gap-3 shadow-xl shadow-brown/10"
                  >
                    Place Order
                    <ArrowRight size={18} />
                  </Button>

                  <button
                    onClick={onPrevious}
                    className="w-full h-12 rounded-xl border-2 border-gray-100 text-gray-400 font-black uppercase tracking-widest text-[9px] hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                  >
                    <ArrowLeft size={14} strokeWidth={3} />
                    Back to Delivery
                  </button>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 mt-6 border border-gray-100">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">Payment Benefits</p>
                  <ul className="space-y-2">
                    {["100% Secure Checkout", "Instant Confirmation", "Buyer Protection"].map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                        <div className="w-1 h-1 rounded-full bg-sbrown"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
            {!selectedPayment && (
              <p className="text-[10px] font-black text-red-500 uppercase tracking-widest text-center mt-4">
                Please select a payment method to continue
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
