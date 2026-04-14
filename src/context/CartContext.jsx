/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import api from "../api";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext.jsx";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user, isLoggedIn } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Single Source of Truth for Guest Cart (Internal helper)
  const getLocalGuestCart = useCallback(() => {
    try {
      const saved = localStorage.getItem("guest_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }, []);

  // Fetch Cart from Backend
  const fetchBackendCart = useCallback(async (userId) => {
    try {
      const response = await api.get(`/cart/${userId}`);
      if (response.data?.items) {
        return response.data.items
          .filter((item) => item.productId)
          .map((item) => ({
            id: item.productId._id,
            name: item.productId.title,
            price: item.productId.discountedPrice || item.productId.price,
            quantity: item.quantity,
            image: item.productId.images?.[0]
              ? `http://localhost:5000${item.productId.images[0]}`
              : "",
            description: item.productId.subject,
            category: item.productId.category,
            type:
              item.productId.productType === "Essential"
                ? "essential"
                : "bakery",
            deliveryType: item.productId.deliveryType || "local",
          }));
      }
      return [];
    } catch (error) {
      if (error.response?.status === 404) return [];
      console.error("Backend fetch error:", error);
      return [];
    }
  }, []);

  // Unified Sync Logic
  const syncAndLoadCart = useCallback(async () => {
    setLoading(true);
    const guestCart = getLocalGuestCart();

    if (isLoggedIn && user?._id) {
      try {
        if (guestCart.length > 0) {
          // Architect Choice: Direct Merge on Sync
          const syncData = {
            userId: user._id,
            items: guestCart.map((item) => ({
              productId: item.id,
              quantity: item.quantity,
              onModel: item.type === "essential" ? "Essentials" : "Product",
            })),
          };
          const response = await api.post("/cart/sync", syncData);
          localStorage.removeItem("guest_cart");

          const items = response.data.cart.items
            .filter((i) => i.productId)
            .map((i) => ({
              id: i.productId._id,
              name: i.productId.title,
              price: i.productId.discountedPrice || i.productId.price,
              quantity: i.quantity,
              image: i.productId.images?.[0]
                ? `http://localhost:5000${i.productId.images[0]}`
                : "",
              type:
                i.productId.productType === "Essential"
                  ? "essential"
                  : "bakery",
            }));
          setCartItems(items);
        } else {
          const items = await fetchBackendCart(user._id);
          setCartItems(items);
        }
      } catch {
        toast.error("Cloud failed to sync cart state.");
      }
    } else {
      setCartItems(guestCart);
    }
    setLoading(false);
  }, [isLoggedIn, user, fetchBackendCart, getLocalGuestCart]);

  useEffect(() => {
    syncAndLoadCart();
  }, [syncAndLoadCart]);

  // DB Sync with Retry Logic (Flipkart/Amazon style resilience)
  const updateBackendWithRetry = async (
    productId,
    quantity,
    action = "update",
    onModel = "Product",
    retries = 3,
  ) => {
    if (!isLoggedIn || !user?._id) return true;

    for (let i = 0; i < retries; i++) {
      try {
        if (action === "delete") {
          await api.delete("/cart", { data: { userId: user._id, productId } });
        } else {
          await api.put("/cart", {
            userId: user._id,
            productId,
            quantity,
            onModel,
          });
        }
        return true;
      } catch (error) {
        if (i === retries - 1) {
          console.error("Cart sync failed after retries:", error);
          return false;
        }
        await new Promise((r) => setTimeout(r, 1000 * (i + 1))); // Exponential-ish backoff
      }
    }
    return false;
  };

  const addToCart = async (product) => {
    // 4. ADDRESS VALIDATION LAYER: Architected Interception
    // if (isLoggedIn && user && !user.address1) {
    //   toast.error("Please complete your profile/address first.");
    //   return;
    // }

    const productId = product.id || product._id;
    const existingItem = cartItems.find((item) => item.id === productId);
    const newQty = existingItem ? existingItem.quantity + 1 : 1;
    const onModel = product.type === "essential" ? "Essentials" : "Product";

    const previousItems = [...cartItems];

    // 1. Optimistic Update (Immediate Feedback)
    setCartItems((prev) => {
      if (existingItem) {
        return prev.map((i) =>
          i.id === productId ? { ...i, quantity: newQty } : i,
        );
      } else {
        return [...prev, { ...product, id: productId, quantity: 1 }];
      }
    });

    if (isLoggedIn) {
      const success = await updateBackendWithRetry(
        productId,
        newQty,
        "update",
        onModel,
      );
      if (!success) {
        setCartItems(previousItems);
        toast.error("Sync failed. Local cart reverted.");
      }
    } else {
      const guestCart = getLocalGuestCart();
      const updated = existingItem
        ? guestCart.map((i) =>
            i.id === productId ? { ...i, quantity: newQty } : i,
          )
        : [...guestCart, { ...product, id: productId, quantity: 1 }];
      localStorage.setItem("guest_cart", JSON.stringify(updated));
    }
  };

  const removeFromCart = async (productId) => {
    const previousItems = [...cartItems];
    setCartItems((prev) => prev.filter((i) => i.id !== productId));

    if (isLoggedIn) {
      const success = await updateBackendWithRetry(productId, 0, "delete");
      if (!success) setCartItems(previousItems);
    } else {
      const updated = getLocalGuestCart().filter((i) => i.id !== productId);
      localStorage.setItem("guest_cart", JSON.stringify(updated));
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId);

    const previousItems = [...cartItems];
    setCartItems((prev) =>
      prev.map((i) => (i.id === productId ? { ...i, quantity } : i)),
    );

    if (isLoggedIn) {
      const match = previousItems.find((i) => i.id === productId);
      const onModel = match?.type === "essential" ? "Essentials" : "Product";
      const success = await updateBackendWithRetry(
        productId,
        quantity,
        "update",
        onModel,
      );
      if (!success) setCartItems(previousItems);
    } else {
      const updated = getLocalGuestCart().map((i) =>
        i.id === productId ? { ...i, quantity } : i,
      );
      localStorage.setItem("guest_cart", JSON.stringify(updated));
    }
  };

  const increaseQuantity = (productId) => {
    const item = cartItems.find((i) => i.id === productId);
    if (item) updateQuantity(productId, item.quantity + 1);
  };

  const decreaseQuantity = (productId) => {
    const item = cartItems.find((i) => i.id === productId);
    if (item && item.quantity > 1) updateQuantity(productId, item.quantity - 1);
    else removeFromCart(productId);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("guest_cart");
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 0),
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        refreshCart: syncAndLoadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
