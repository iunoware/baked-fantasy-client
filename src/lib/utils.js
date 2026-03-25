import { jwtDecode } from "jwt-decode";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getTokenExpiry = (token) => {
  if (!token) return null;

  const decoded = jwtDecode(token);
  return decoded.exp * 1000;
};
