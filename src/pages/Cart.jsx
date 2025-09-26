import { useState } from "react";
import { CartPage } from "../components/CartPage.jsx";
import { DeliveryPage } from "../components/DeliveryPage.jsx";
import { PaymentPage } from "../components/PaymentPage.jsx";
import { ConfirmationPage } from "../components/ConfirmationPage.jsx";

export default function App() {
  const [currentStep, setCurrentStep] = useState("cart");
  const [orderNumber, setOrderNumber] = useState("");

  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Chicken Biryani",
      image:
        "https://images.unsplash.com/photo-1734770931927-6410f9a64832?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBpbmRpYW4lMjBmb29kJTIwYmlyeWFuaXxlbnwxfHx8fDE3NTg4Nzk1NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      price: 299,
      quantity: 2,
      description:
        "Aromatic basmati rice with tender chicken pieces and traditional spices",
    },
    {
      id: "2",
      name: "Chicken Tikka Masala",
      image:
        "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwdGlra2ElMjBtYXNhbGElMjBjdXJyeXxlbnwxfHx8fDE3NTg4Nzk1NjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      price: 249,
      quantity: 1,
      description: "Grilled chicken in rich tomato-based curry sauce",
    },
    {
      id: "3",
      name: "Samosa (2 pcs)",
      image:
        "https://images.unsplash.com/photo-1748765968997-ba9bae9cfd7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlzcHklMjBzYW1vc2ElMjBzbmFja3xlbnwxfHx8fDE3NTg4Nzk1NjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      price: 59,
      quantity: 1,
      description: "Crispy golden pastries filled with spiced potatoes",
    },
    {
      id: "4",
      name: "Garlic Naan",
      image:
        "https://images.unsplash.com/photo-1697155406014-04dc649b0953?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJsaWMlMjBuYWFuJTIwYnJlYWR8ZW58MXx8fHwxNzU4NzgzNDc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      price: 89,
      quantity: 2,
      description: "Fresh baked bread with garlic and herbs",
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [deliveryInstructions, setDeliveryInstructions] = useState("");

  const addresses = [
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
  ];

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
          addresses={addresses}
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
