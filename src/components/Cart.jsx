import { useState } from "react";

function Cart({ onNavigate }) {
  // Dummy products
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Eco Tote Bag",
      price: 499,
      quantity: 1,
      image: "/images/cake-1.jpg",
    },
    {
      id: 2,
      name: "Reusable Coffee Cup",
      price: 299,
      quantity: 2,
      image: "/images/cake-2.jpg",
    },
    {
      id: 3,
      name: "Bamboo Toothbrush",
      price: 99,
      quantity: 3,
      image: "/images/cake-3.jpg",
    },
  ]);

  // Update item quantity
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Calculate total
  const getTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFF5E1] flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          Your Cart is Empty 🛒
        </h2>
        <p className="text-muted-foreground mb-6">
          Looks like you haven’t added anything yet.
        </p>
        <button
          onClick={() => onNavigate("products")}
          className="bg-[#00BCD4] hover:bg-[#00ACC1] text-white px-6 py-3 rounded-lg"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#FFF5E1] py-12 page-transition">
        <div className="pb-15"></div>
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
            Your Shopping Cart
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 flex items-center justify-between bg-white rounded-xl shadow-md"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h2 className="font-semibold text-lg">{item.name}</h2>
                      <p className="text-sm text-gray-500">
                        ₹{item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-10">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-1 text-pink-500 hover:font-bold"
                      >
                        -
                      </button>
                      <span className="px-4 text-xl">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 text-pink-500 hover:font-bold"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-semibold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl shadow-md p-6 h-fit">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹{getTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{getTotal().toFixed(2)}</span>
              </div>
              <button
                onClick={() => onNavigate("checkout")}
                className="w-full mt-6 bg-[#00BCD4] hover:bg-[#00ACC1] text-white py-3 rounded-lg"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
