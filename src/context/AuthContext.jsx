import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import axios from "axios";
import api from "../api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Modal States
  const [activeModal, setActiveModal] = useState(null); // 'login', 'register', 'profile' or null

  const pendingActionRef = useRef(null);

  // 1. Single Source of Truth: Fetch User from Backend
  const fetchUser = useCallback(async (showLoading = true) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setIsLoggedIn(false);
      setIsLoadingUser(false);
      return null;
    }

    try {
      if (showLoading) setIsLoadingUser(true);
      const res = await api.get(`/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = res.data.user;
      setUser(userData);
      // ✅ No localStorage write — state is the only source of truth
      setIsLoggedIn(true);
      return userData;
    } catch (err) {
      console.error("Failed to fetch user:", err);
      if (err.response?.status === 401) handleLogout();
      return null;
    } finally {
      if (showLoading) setIsLoadingUser(false);
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
  const handleProtectedAction = useCallback(
    async (action) => {
      if (!localStorage.getItem("token")) {
        pendingActionRef.current = action;
        setActiveModal("login");
        return;
      }

      const freshUser = await fetchUser(false);
      console.log("freshUser fields:", freshUser);

      if (!freshUser) {
        pendingActionRef.current = action;
        setActiveModal("login");
        return;
      }

      if (!freshUser.address1 || !freshUser.profileCompleted) {
        pendingActionRef.current = action;
        setActiveModal("profile");
        return;
      }

      try {
        await action();
      } catch (err) {
        console.error("Action error:", err);
      }
    },
    [fetchUser],
  );

  // 3. Async Flow Handlers
  const handleLoginSuccess = useCallback(
    async (token, userData) => {
      localStorage.setItem("token", token);
      // ✅ No localStorage write for user
      setIsLoggedIn(true);

      const freshUser = await fetchUser();

      if (pendingActionRef.current) {
        if (freshUser?.address1 && freshUser?.profileCompleted) {
          const action = pendingActionRef.current;
          pendingActionRef.current = null;
          await action();
          setActiveModal(null);
        } else {
          setActiveModal("profile");
        }
      } else {
        setActiveModal(null);
      }

      window.dispatchEvent(new Event("loginStateChange"));
    },
    [fetchUser],
  );

  const onProfileSaved = useCallback(async (updatedUser) => {
    setUser(updatedUser);
    // ✅ No localStorage write for user
    setActiveModal(null);

    if (pendingActionRef.current) {
      const action = pendingActionRef.current;
      pendingActionRef.current = null;
      await action();
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    // ✅ No localStorage.removeItem("user") needed anymore
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
