import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UseAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const checkAuth = useCallback(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    checkAuth();
    window.addEventListener("loginStateChange", checkAuth);
    return () => window.removeEventListener("loginStateChange", checkAuth);
  }, [checkAuth]);

  const openLoginModal = useCallback(() => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  }, []);

  const closeLoginModal = useCallback(() => {
    setIsLoginModalOpen(false);
  }, []);

  const openRegisterModal = useCallback(() => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
  }, []);

  const closeRegisterModal = useCallback(() => {
    setIsRegisterModalOpen(false);
  }, []);

  const openLoginFromRegister = useCallback(() => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  }, []);

  const openRegisterFromLogin = useCallback(() => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  }, []);

  const handleLoginSuccess = useCallback(() => {
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
    window.dispatchEvent(new Event("loginStateChange"));
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("loginStateChange"));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        isRegisterModalOpen,
        openRegisterModal,
        closeRegisterModal,
        isLoggedIn,
        openLoginFromRegister,
        openRegisterFromLogin,
        handleLoginSuccess,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
