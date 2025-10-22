import { useEffect, useState } from "react";
import { CartPage } from "../components/CartPage.jsx";
import { DeliveryPage } from "../components/DeliveryPage.jsx";
import { PaymentPage } from "../components/PaymentPage.jsx";
import { ConfirmationPage } from "../components/ConfirmationPage.jsx";
import axios from "axios";

export default function App() {
  const [currentStep, setCurrentStep] = useState("cart");
  const [orderNumber, setOrderNumber] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const userId = "670e2f1cf9a0b3142b12b70c";

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/cart/${userId}`);
        const cartData = res.data;
        console.log(cartData);

        const formattedItems = cartData.items.map((item) => ({
          id: item.productId._id,
          name: item.productId.title,
          image: `http://localhost:5000${item.productId.images?.[0]}`,
          price: item.productId.price,
          quantity: item.quantity,
          description: item.productId.subject || "No description available",
        }));
        setCartItems(formattedItems);
      } catch (err) {
        console.error("Error Fetching Cart", err);
      }
    };
    fetchCart();
  }, [userId]);

  const [promoCode, setPromoCode] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [deliveryInstructions, setDeliveryInstructions] = useState("");

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

  const updateCartItem = (id, quantity) => {
    if (quantity === 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const removeCartItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const calculateOrderSummary = () => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const discount = promoCode === "SAVE20" ? subtotal * 0.2 : 0;
    const taxes = (subtotal - discount) * 0.18; // 18% GST
    const deliveryFee = subtotal > 500 ? 0 : 49;
    const total = subtotal - discount + taxes + deliveryFee;

    return {
      subtotal,
      taxes,
      deliveryFee,
      discount,
      total,
    };
  };

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

  const orderSummary = calculateOrderSummary();

  return (
    <div className="min-h-screen bg">
      <div className="pt-20"></div>
      {currentStep === "cart" && (
        <CartPage
          cartItems={cartItems}
          updateCartItem={updateCartItem}
          removeCartItem={removeCartItem}
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
