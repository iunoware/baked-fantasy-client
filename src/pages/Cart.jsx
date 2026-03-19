import { useEffect, useState } from "react";
import { CartPage } from "../components/CartPage.jsx";
import { DeliveryPage } from "../components/DeliveryPage.jsx";
import { PaymentPage } from "../components/PaymentPage.jsx";
import { ConfirmationPage } from "../components/ConfirmationPage.jsx";
import axios from "axios";

import { useCart } from "../context/CartContext.jsx";

export default function App() {
  const [currentStep, setCurrentStep] = useState("cart");
  const [orderNumber, setOrderNumber] = useState("");
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [deliveryInstructions, setDeliveryInstructions] = useState("");

  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    taxes: 0,
    deliveryFee: 0,
    discount: 0,
    total: 0
  });

  useEffect(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const discount = promoCode === "SAVE20" ? subtotal * 0.2 : 0;
    const taxes = (subtotal - discount) * 0.18; // 18% GST
    
    setOrderSummary(prev => ({
      ...prev,
      subtotal,
      taxes,
      discount,
      total: subtotal - discount + taxes + prev.deliveryFee,
    }));
  }, [cartItems, promoCode]);

  const paymentMethods = [
    {
      id: "1",
      type: "card",
      label: "Credit/Debit Card",
      details: "**** **** **** 1234",
    },
    { id: "2", type: "upi", label: "UPI", details: "user@paytm" },
    {
      id: "3",
      type: "wallet",
      label: "Paytm Wallet",
      details: "₹2,450 available",
    },
    { id: "4", type: "cod", label: "Cash on Delivery" },
  ];

  const handleNextStep = () => {
    if (currentStep === "cart") {
      setCurrentStep("delivery");
    } else if (currentStep === "delivery") {
      setCurrentStep("payment");
    } else if (currentStep === "payment") {
      // Generate order number
      const orderNum = "OD" + Date.now().toString().slice(-6);
      setOrderNumber(orderNum);
      setCurrentStep("confirmation");
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === "delivery") {
      setCurrentStep("cart");
    } else if (currentStep === "payment") {
      setCurrentStep("delivery");
    }
  };

  return (
    <div className="min-h-screen bg">
      <div className="pt-20"></div>
      {currentStep === "cart" && (
        <CartPage
          cartItems={cartItems}
          updateCartItem={updateQuantity}
          removeCartItem={removeFromCart}
          promoCode={promoCode}
          setPromoCode={setPromoCode}
          orderSummary={orderSummary}
          onNext={handleNextStep}
        />
      )}
      {currentStep === "delivery" && (
        <DeliveryPage
          // addresses={addresses}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          deliveryInstructions={deliveryInstructions}
          setDeliveryInstructions={setDeliveryInstructions}
          orderSummary={orderSummary}
          setOrderSummary={setOrderSummary}
          onNext={handleNextStep}
          onPrevious={handlePreviousStep}
        />
      )}
      {currentStep === "payment" && (
        <PaymentPage
          paymentMethods={paymentMethods}
          selectedPayment={selectedPayment}
          setSelectedPayment={setSelectedPayment}
          orderSummary={orderSummary}
          onNext={handleNextStep}
          onPrevious={handlePreviousStep}
        />
      )}
      {currentStep === "confirmation" && (
        <ConfirmationPage
          orderNumber={orderNumber}
          orderSummary={orderSummary}
          selectedAddress={selectedAddress}
        />
      )}
    </div>
  );
}
