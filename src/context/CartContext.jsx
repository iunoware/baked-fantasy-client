import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Helper to get userId
  const getUserId = () => {
    const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
    return savedUser._id || "670e2f1cf9a0b3142b12b70c"; // Default test ID if not logged in
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // DB Sync Helper
  const syncToDatabase = async (productId, quantity, action = "update") => {
    const userId = getUserId();
    try {
      if (action === "delete") {
        await axios.delete("http://localhost:5000/cart", {
          data: { userId, productId },
        });
      } else {
        await axios.put("http://localhost:5000/cart", {
          userId,
          productId,
          quantity,
        });
      }
    } catch (error) {
      console.error(`Failed to sync cart ${action}:`, error);
      const errorMsg =
        error.response?.data?.msg || `Failed to sync cart with server`;
      toast.error(errorMsg);
    }
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      let updatedItems;
      if (existingItem) {
        const newQty = existingItem.quantity + 1;
        updatedItems = prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: newQty } : item,
        );
        syncToDatabase(product.id, newQty);
      } else {
        updatedItems = [...prevItems, { ...product, quantity: 1 }];
        syncToDatabase(product.id, 1);
      }
      return updatedItems;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== productId);
      syncToDatabase(productId, 0, "delete");
      return updatedItems;
    });
  };

  const increaseQuantity = (productId) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((i) => i.id === productId);
      if (item) {
        const newQty = item.quantity + 1;
        syncToDatabase(productId, newQty);
        return prevItems.map((i) =>
          i.id === productId ? { ...i, quantity: newQty } : i,
        );
      }
      return prevItems;
    });
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((i) => i.id === productId);
      if (item && item.quantity > 1) {
        const newQty = item.quantity - 1;
        syncToDatabase(productId, newQty);
        return prevItems.map((i) =>
          i.id === productId ? { ...i, quantity: newQty } : i,
        );
      }
      return prevItems;
    });
  };

  const updateQuantity = (productId, quantity) => {
    const newQty = Math.max(1, quantity);
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQty } : item,
      ),
    );
    syncToDatabase(productId, newQty);
  };

  const clearCart = () => {
    setCartItems([]);
    // Optionally clear DB cart too?
    // Backend doesn't have a clear all route yet, so we'd loop or just leave it.
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
