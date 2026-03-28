import { jwtDecode } from "jwt-decode";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getTokenExpiry = (token) => {
  if (!token || token === "null" || token === "undefined") return null;

  try {
    const actualToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
    const decoded = jwtDecode(actualToken);
    return decoded.exp ? decoded.exp * 1000 : null;
  } catch (error) {
    console.error("Invalid token specified, unable to decode:", error);
    return null;
  }
};
