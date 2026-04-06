import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import api from "../api";
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
  const [cartItems, setCartItems] = useState([]);
  // const [bakeryItems, setBakeryItems] = useState([]);
  // const [essentialItems, setEssentialItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper to get active user info
  const getUser = useCallback(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
      return null;
    }
  }, []);

  const getGuestCart = useCallback(() => {
    try {
      const savedCart = localStorage.getItem("guest_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error parsing guest cart", error);
      return [];
    }
  }, []);

  // Fetch Cart from Backend
  const fetchBackendCart = useCallback(async (userId) => {
    try {
      const response = await api.get(`/cart/${userId}`);
      if (response.data && response.data.items) {
        // Transform backend structure to frontend structure if necessary
        // Backend: { items: [ { productId: { _id, title, discountedPrice... }, quantity } ] }
        // Frontend expectations: [ { id, title, price, quantity, images... } ]
        const transformedItems = response.data.items
          .filter((item) => item.productId) // Security check for null products
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
            type: item.productId.itemType || "bakery", // Try to read from backend or default
          }));
        return transformedItems;
      }
      return [];
    } catch (error) {
      if (error.response?.status === 404) return []; // Cart not found is empty cart
      console.error("Failed to fetch backend cart:", error);
      // toast.error("Could not load your saved cart.");
      return [];
    }
  }, []);

  // Sync / Merge Logic
  const syncAndLoadCart = useCallback(async () => {
    setLoading(true);
    const user = getUser();
    const guestCart = getGuestCart();

    if (user && user._id) {
      try {
        if (guestCart.length > 0) {
          // Merge guest cart with backend
          const syncData = {
            userId: user._id,
            items: guestCart.map((item) => ({
              productId: item.id,
              quantity: item.quantity,
            })),
          };
          const response = await api.post("/cart/sync", syncData);

          // Clear guest cart after successful sync
          localStorage.removeItem("guest_cart");
          localStorage.removeItem("cart"); // Clear old legacy cart key too

          // Transform synced cart
          const transformedItems = response.data.cart.items
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
              type: item.productId.itemType || "bakery",
            }));
          setCartItems(transformedItems);
        } else {
          // Just fetch backend cart
          const items = await fetchBackendCart(user._id);
          setCartItems(items);
        }
      } catch (error) {
        console.error("Error during cart sync:", error);
        toast.error("Failed to sync cart with server");
      }
    } else {
      // GUEST FLOW
      setCartItems(guestCart);
    }
    setLoading(false);
  }, [getUser, getGuestCart, fetchBackendCart]);

  // Initial load
  useEffect(() => {
    syncAndLoadCart();
  }, []); // Run once on mount

  // Watch for login/logout (primitive approach since no AuthContext)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "token" || e.key === "user") {
        syncAndLoadCart();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    // Custom event for same-tab updates
    window.addEventListener("loginStateChange", syncAndLoadCart);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("loginStateChange", syncAndLoadCart);
    };
  }, [syncAndLoadCart]);

  // DB Sync Helper for single operations
  const updateBackend = async (productId, quantity, action = "update") => {
    const user = getUser();
    if (!user || !user._id) return true; // Pretend success for guests, handled locally

    try {
      if (action === "delete") {
        await api.delete("/cart", { data: { userId: user._id, productId } });
      } else {
        await api.put("/cart", {
          userId: user._id,
          productId,
          quantity,
        });
      }
      return true;
    } catch (error) {
      console.error(`Failed to sync cart ${action}:`, error);
      toast.error(
        error.response?.data?.msg || `Failed to update cart on server`,
      );
      return false;
    }
  };

  const addToCart = async (product) => {
    const user = getUser();
    const existingItem = cartItems.find(
      (item) => item.id === (product.id || product._id),
    );
    const newQty = existingItem ? existingItem.quantity + 1 : 1;
    const productId = product.id || product._id;

    if (user && user._id) {
      // Backend first
      const success = await updateBackend(productId, newQty);
      if (success) {
        setCartItems((prev) => {
          if (existingItem) {
            return prev.map((i) =>
              i.id === productId ? { ...i, quantity: newQty } : i,
            );
          } else {
            return [
              ...prev,
              {
                id: productId,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image,
                description: product.description || product.subject,
                category: product.category,
                type: product.type || "bakery",
              },
            ];
          }
        });
      }
    } else {
      // Guest local storage
      setCartItems((prev) => {
        let updated;
        if (existingItem) {
          updated = prev.map((i) =>
            i.id === productId ? { ...i, quantity: newQty } : i,
          );
        } else {
          updated = [
            ...prev,
            {
              id: productId,
              name: product.name,
              price: product.price,
              quantity: 1,
              image: product.image,
              description: product.description || product.subject,
              category: product.category,
              type: product.type || "bakery",
            },
          ];
        }
        localStorage.setItem("guest_cart", JSON.stringify(updated));
        return updated;
      });
      toast.success("Added to cart");
    }
  };

  const removeFromCart = async (productId) => {
    const user = getUser();
    if (user && user._id) {
      const success = await updateBackend(productId, 0, "delete");
      if (success) {
        setCartItems((prev) => prev.filter((i) => i.id !== productId));
      }
    } else {
      setCartItems((prev) => {
        const updated = prev.filter((i) => i.id !== productId);
        localStorage.setItem("guest_cart", JSON.stringify(updated));
        return updated;
      });
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) {
      return removeFromCart(productId);
    }

    const user = getUser();
    if (user && user._id) {
      const success = await updateBackend(productId, quantity);
      if (success) {
        setCartItems((prev) =>
          prev.map((i) => (i.id === productId ? { ...i, quantity } : i)),
        );
      }
    } else {
      setCartItems((prev) => {
        const updated = prev.map((i) =>
          i.id === productId ? { ...i, quantity } : i,
        );
        localStorage.setItem("guest_cart", JSON.stringify(updated));
        return updated;
      });
    }
  };

  const increaseQuantity = (productId) => {
    const item = cartItems.find((i) => i.id === productId);
    if (item) updateQuantity(productId, item.quantity + 1);
  };

  const decreaseQuantity = (productId) => {
    const item = cartItems.find((i) => i.id === productId);
    if (item) {
      if (item.quantity > 1) {
        updateQuantity(productId, item.quantity - 1);
      } else {
        removeFromCart(productId);
      }
    }
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("guest_cart");
    // If logged in, we should ideally have a clear-all backend route.
    // For now, we'll just leave the backend cart as is or implement it if needed.
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
        loading,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        refreshCart: syncAndLoadCart, // Expose for manual triggers
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
