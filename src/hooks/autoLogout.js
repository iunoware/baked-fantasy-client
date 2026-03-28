import React, { useEffect } from "react";
import { getTokenExpiry } from "../lib/utils";

const autoLogout = (token, logout) => {
  useEffect(() => {
    if (!token || token === "null" || token === "undefined") return;

    const expiryTime = getTokenExpiry(token);
    
    // If the token was invalid and couldn't be decoded, force logout
    if (!expiryTime) {
      logout();
      return;
    }

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
  }, [token, logout]);
};

export default autoLogout;
