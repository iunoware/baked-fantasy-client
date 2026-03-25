import React, { useEffect } from "react";
import { getTokenExpiry } from "../lib/utils";

const autoLogout = (token, logout) => {
  useEffect(() => {
    if (!token) return;

    const expiryTime = getTokenExpiry(token);
    const currentTime = Date.now();

    const timeout = expiryTime - currentTime;

    if (timeout <= 0) {
      logout();
      return;
    }

    const timer = setTimeout(() => {
      logout();
    }, timeout);

    return () => clearTimeout(timer);
  }, [token]);
};

export default autoLogout;
