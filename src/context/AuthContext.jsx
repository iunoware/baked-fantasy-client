import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const BASE_URL = "http://localhost:5000";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Modal States
  const [activeModal, setActiveModal] = useState(null); // 'login', 'register', 'profile' or null

  const pendingActionRef = useRef(null);

  // 1. Single Source of Truth: Fetch User from Backend
  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setIsLoggedIn(false);
      setIsLoadingUser(false);
      return null;
    }

    try {
      setIsLoadingUser(true);
      const res = await axios.get(`${BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = res.data.user;
      setUser(userData);
      setIsLoggedIn(true);
      return userData;
    } catch (err) {
      console.error("Failed to fetch user:", err);
      if (err.response?.status === 401) handleLogout();
      return null;
    } finally {
      setIsLoadingUser(false);
    }
  }, []);

  // Initialize Auth on Mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchUser();
    } else {
      setIsLoadingUser(false);
    }
  }, [fetchUser]);

  // 2. THE PROTECTED ACTION SYSTEM (Built-in)
  const handleProtectedAction = useCallback(async (action) => {
    // 1. Check Auth
    if (!localStorage.getItem("token")) {
      pendingActionRef.current = action;
      setActiveModal("login");
      return;
    }

    // 2. Ensure user data is fetched
    let currentUser = user;
    if (!currentUser) {
      currentUser = await fetchUser();
    }

    if (!currentUser) {
      pendingActionRef.current = action;
      setActiveModal("login");
      return;
    }

    // 3. Check Address
    if (!currentUser.address1 || !currentUser.profileCompleted) {
      pendingActionRef.current = action;
      setActiveModal("profile");
      return;
    }

    // 4. All set -> Execute
    try {
      await action();
    } catch (err) {
      console.error("Action error:", err);
    }
  }, [user, fetchUser]);

  // 4. Async Flow Handlers
  const handleLoginSuccess = useCallback(async (token, userData) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    
    // STRICT SEQUENCE: await fetch → await address check → execute
    const freshUser = await fetchUser();
    
    if (pendingActionRef.current) {
      if (freshUser?.address1 && freshUser?.profileCompleted) {
        const action = pendingActionRef.current;
        pendingActionRef.current = null; // Clear before execute
        await action();
        setActiveModal(null);
      } else {
        // Switch to profile modal without overlap
        setActiveModal("profile");
      }
    } else {
      setActiveModal(null);
    }
    
    window.dispatchEvent(new Event("loginStateChange"));
  }, [fetchUser]);

  const onProfileSaved = useCallback(async (updatedUser) => {
    setUser(updatedUser);
    setActiveModal(null);
    
    if (pendingActionRef.current) {
      const action = pendingActionRef.current;
      pendingActionRef.current = null; // Clear before execute
      await action();
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    setActiveModal(null);
    pendingActionRef.current = null;
    window.dispatchEvent(new Event("loginStateChange"));
  }, []);

  // Modal Shortcuts
  const openLoginModal = useCallback(() => setActiveModal("login"), []);
  const openRegisterModal = useCallback(() => setActiveModal("register"), []);
  const closeModals = useCallback(() => {
    setActiveModal(null);
    pendingActionRef.current = null;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoadingUser,
        activeModal,
        isLoginModalOpen: activeModal === "login",
        isRegisterModalOpen: activeModal === "register",
        showProfileModal: activeModal === "profile",
        openLoginModal,
        openRegisterModal,
        closeLoginModal: closeModals,
        closeRegisterModal: closeModals,
        setShowProfileModal: (val) => setActiveModal(val ? "profile" : null),
        handleLoginSuccess,
        handleLogout,
        onProfileSaved,
        fetchUser,
        handleProtectedAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};



