import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { loadingManager } from "../utils/loadingManager";

const LoadingContext = createContext();

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
};

export const LoadingProvider = ({ children }) => {
    const [activeRequests, setActiveRequests] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const timerRef = useRef(null);
    const minShowTimeRef = useRef(null);

    const startLoading = () => {
        setActiveRequests((prev) => prev + 1);
    };

    const stopLoading = () => {
        setActiveRequests((prev) => Math.max(0, prev - 1));
    };

    useEffect(() => {
        loadingManager.register(startLoading, stopLoading);
    }, [activeRequests]); // Re-register with current state closure if needed, though state is managed via functional updates so it might be fine without it. Let's keep it simple.

    useEffect(() => {
        if (activeRequests > 0) {
            // Delay showing the loader to prevent flickering on fast requests
            if (!timerRef.current) {
                timerRef.current = setTimeout(() => {
                    setIsLoading(true);
                    minShowTimeRef.current = Date.now();
                }, 300); // 300ms delay
            }
        } else {
            // All requests finished
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }

            const now = Date.now();
            const timeShown = now - (minShowTimeRef.current || now);
            const remainingMinTime = Math.max(0, 500 - timeShown);

            // Ensure loader stays for at least 500ms if it was shown
            setTimeout(() => {
                setIsLoading(false);
                minShowTimeRef.current = null;
            }, remainingMinTime);
        }
    }, [activeRequests]);

    return (
        <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};
