import {
  CreditCard,
  Shield,
  Smartphone,
  Wallet,
  Banknote,
  Proportions,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
// import OnlineCourse, { getCoursePrices } from "./OnlineCourse";

function CoursePaymentPage() {
  const location = useLocation();
  const { price, courseId } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState();

  return (
    <div className="bg pt-20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="">
          <div className="flex items-center gap-3 mb-2">
            <CreditCard className="h-8 w-8 text-pink-500" />
            <h1 className="text-3xl font-bold">Payment</h1>
          </div>
          <p className="text-gray-600">Choose your preferred payment method</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-10">
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-5 px-6">
              <h3 className="font-semibold text-lg mb-4">Select Payment Method</h3>

              <div
                tabIndex={0}
                onClick={() => setPaymentMethod("card")}
                className={cn(
                  "hover:shadow-md border border-gray-300 hover:scale-102 transition-all duration-200 h-20 rounded-xl flex justify-start items-center",
                  paymentMethod === "card" ? " border-pink-500 bg-pink-50" : "bg"
                )}
              >
                <CreditCard size={22} color="#0ea5e9" className="ml-4" />
                <div className="ml-3">
                  <h5 className="font-semibold">Credit/Debit Card</h5>
                  <p className="text-xs text-gray-700">**** **** **** 1234</p>
                </div>
              </div>

              <div
                tabIndex={0}
                onClick={() => setPaymentMethod("upi")}
                className={cn(
                  "hover:shadow-md border border-gray-300 hover:scale-102 transition-all duration-200 h-20 rounded-xl flex justify-start items-center",
                  paymentMethod === "upi" ? " border-pink-500 bg-pink-50" : "bg"
                )}
              >
                <Smartphone color="#AD46FF" className="ml-4" />
                <div className="ml-3">
                  <h5 className="font-semibold">UPI</h5>
                </div>
              </div>

              <div
                tabIndex={0}
                onClick={() => setPaymentMethod("cash")}
                className={cn(
                  "hover:shadow-md border border-gray-300 hover:scale-102 transition-all duration-200 h-20 rounded-xl flex justify-start items-center",
                  paymentMethod === "cash" ? " border-pink-500 bg-pink-50" : "bg"
                )}
              >
                <Banknote color="#FF6900" className="ml-4" />
                <div className="ml-3">
                  <h5 className="font-semibold">Cash on Delivery</h5>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="px-10">
              <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
              <div className="space-y-5">
                <div className="flex justify-between">
                  <p>Course Id</p>
                  <p>{courseId}</p>
                </div>

                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>{price}</p>
                  {/* <p>{getCoursePrices()}</p> */}
                </div>

                <div className="flex justify-between">
                  <p>Taxes & Fees</p>
                  <p>₹195.12</p>
                </div>

                <div className="flex justify-between">
                  <p>Delivery Fee</p>
                  <p className="text-green-600">FREE</p>
                </div>

                <div className="flex justify-between">
                  <h5 className="font-semibold text-lg mb-4">Total Amount</h5>
                  <p className="font-semibold text-lg text-sky-500">₹1,279.12</p>
                </div>
              </div>
            </div>

            <div className="px-10 w-full text-center space-y-5">
              <button className="bg-sky-400 hover:bg-sky-500 transition-all duration-200 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 text-white px-5 py-3 w-full rounded-lg hover:cursor-pointer">
                Place Order <span className="font-bold text-lg">₹1,279.12</span>
              </button>
              <Link to="/courses/online-course" className="">
                <button className="border border-sky-500 hover:cursor-pointer text-sky-500 px-5 py-3 w-full rounded-lg">
                  Back to Courses
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursePaymentPage;
