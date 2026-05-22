import { useEffect, useState } from "react";
import { CartPage } from "../components/CartPage.jsx";
import { DeliveryPage } from "../components/DeliveryPage.jsx";
import { PaymentPage } from "../components/PaymentPage.jsx";
import { ConfirmationPage } from "../components/ConfirmationPage.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function App() {
  const [currentStep, setCurrentStep] = useState("cart");
  const [orderNumber, setOrderNumber] = useState("");
  const [checkoutType, setCheckoutType] = useState(null); // 'bakery' or 'essential' or null
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  // const [selectedPayment, setSelectedPayment] = useState(null);
  const [deliveryInstructions, setDeliveryInstructions] = useState("");

  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    taxes: 0,
    deliveryFee: 0,
    discount: 0,
    total: 0,
  });

  useEffect(() => {
    const activeItems = checkoutType
      ? cartItems.filter((item) => {
          if (checkoutType === "essential") return item.type === "essential";
          // For bakery items, they can be local, pickup, or state
          const itemDeliveryType = item.deliveryType || "local";
          return itemDeliveryType === checkoutType;
        })
      : cartItems;

    const subtotal = activeItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const discount = promoCode === "SAVE20" ? subtotal * 0.2 : 0;
    const taxes = (subtotal - discount) * 0.18; // 18% GST

    // Delivery fee logic based on the specific checkout type
    let deliveryFee = 0;
    if (checkoutType === "local") deliveryFee = subtotal > 500 ? 0 : 35;
    else if (checkoutType === "pickup") deliveryFee = 0;
    else if (checkoutType === "state") deliveryFee = subtotal > 1000 ? 0 : 60;
    else if (checkoutType === "essential")
      deliveryFee = subtotal > 1500 ? 0 : 80;

    setOrderSummary((prev) => ({
      ...prev,
      subtotal,
      taxes,
      discount,
      total: subtotal - discount + taxes + deliveryFee,
      deliveryFee,
    }));
  }, [cartItems, promoCode, checkoutType]);

  // const paymentMethods = [
  //   {
  //     id: "1",
  //     type: "card",
  //     label: "Credit/Debit Card",
  //     details: "**** **** **** 1234",
  //   },
  //   { id: "2", type: "upi", label: "UPI", details: "user@paytm" },
  //   {
  //     id: "3",
  //     type: "wallet",
  //     label: "Paytm Wallet",
  //     details: "₹2,450 available",
  //   },
  //   { id: "4", type: "cod", label: "Cash on Delivery" },
  // ];

  const handleNextStep = (type) => {
    if (currentStep === "cart") {
      setCheckoutType(type);
      setCurrentStep("delivery");
    } else if (currentStep === "delivery") {
      setCurrentStep("payment");
    } else if (currentStep === "payment") {
      const orderNum = "OD" + Date.now().toString().slice(-6);
      setOrderNumber(orderNum);
      setCurrentStep("confirmation");
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === "delivery") {
      setCheckoutType(null);
      setCurrentStep("cart");
    } else if (currentStep === "payment") {
      setCurrentStep("delivery");
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentStep]);

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
          cartItems={cartItems}
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
      {/* {currentStep === "payment" && (
        <PaymentPage
          paymentMethods={paymentMethods}
          selectedPayment={selectedPayment}
          setSelectedPayment={setSelectedPayment}
          orderSummary={orderSummary}
          onNext={handleNextStep}
          onPrevious={handlePreviousStep}
        />
      )} */}
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
