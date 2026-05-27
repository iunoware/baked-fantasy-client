/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import api from "../api";

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

  const clearAuthState = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
    setActiveModal(null);
    pendingActionRef.current = null;
  }, []);

  const fetchUser = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) setIsLoadingUser(true);

      let userRes;
      try {
        userRes = await api.get("/me");
      } catch (err) {
        if (err.response?.status === 401) {
          clearAuthState();
          return null;
        }
        throw err;
      }

      let hasAddress = false;
      try {
        const addressRes = await api.get("/has-address");
        hasAddress = addressRes.data?.hasAddress || false;
      } catch (err) {
        if (err.response?.status === 401) {
          clearAuthState();
          return null;
        }
        console.warn("Failed to check address status:", err);
      }

      const userData = {
        ...userRes.data.user,
        hasAddress,
      };

      setUser(userData);
      setIsLoggedIn(true);
      return userData;
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error("Failed to fetch user:", err);
      }
      clearAuthState();
      return null;
    } finally {
      if (showLoading) setIsLoadingUser(false);
    }
  }, [clearAuthState]);

  // Initialize Auth on Mount
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // 2. THE PROTECTED ACTION SYSTEM (Built-in)
  const handleProtectedAction = useCallback(
    async (action) => {
      if (!isLoggedIn) {
        pendingActionRef.current = action;
        setActiveModal("login");
        return;
      }

      const freshUser = await fetchUser(false);
      // console.log("hasAddress value:", freshUser?.hasAddress);
      // console.log("addressRes raw:", freshUser);

      if (!freshUser) {
        pendingActionRef.current = action;
        setActiveModal("login");
        return;
      }

      if (!freshUser.hasAddress) {
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
    [fetchUser, isLoggedIn],
  );

  // 3. Async Flow Handlers
  const handleLoginSuccess = useCallback(async () => {
    setIsLoggedIn(true);

    const freshUser = await fetchUser();

    if (pendingActionRef.current) {
      if (freshUser?.hasAddress) {
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
  }, [fetchUser]);

  const onProfileSaved = useCallback(async () => {
    // const freshUser = await fetchUser(); // re-fetch so hasAddress is updated
    setActiveModal(null);

    if (pendingActionRef.current) {
      const action = pendingActionRef.current;
      pendingActionRef.current = null;
      await action();
    }
  }, [fetchUser]);

  const handleLogout = useCallback(async () => {
    try {
      // ✅ Call backend logout to clear cookie
      await api.post("/logout");
    } catch (err) {
      console.error("Logout error:", err);
    }
    clearAuthState();
    window.dispatchEvent(new Event("loginStateChange"));
  }, [clearAuthState]);

  // Modal Shortcuts
  const openLoginModal = useCallback(() => setActiveModal("login"), []);
  const openRegisterModal = useCallback(() => setActiveModal("register"), []);

  const openRegisterFromLogin = useCallback(() => setActiveModal("register"), []);
  const openLoginFromRegister = useCallback(() => setActiveModal("login"), []);

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
        openLoginFromRegister,
        openRegisterFromLogin,
        closeLoginModal: closeModals,
        closeRegisterModal: closeModals,
        setShowProfileModal: (val) => setActiveModal(val ? "profile" : null),
        handleLoginSuccess,
        handleLogout,
        clearAuthState,
        onProfileSaved,
        fetchUser,
        handleProtectedAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
