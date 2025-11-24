// src/lib/auth.jsx
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);
const API_BASE = "http://localhost:5000"; // 👈 important

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const handleAuthResponse = async (res, fallbackError) => {
    if (!res.ok) {
      let errData = {};
      try {
        errData = await res.json();
      } catch {
        // ignore
      }
      throw new Error(errData.error || fallbackError);
    }

    const data = await res.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    return data.user;
  };

  const login = async ({ email, password }) => {
    const res = await fetch(`${API_BASE}/api/login`, {   // 👈 changed
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return handleAuthResponse(res, "Login failed");
  };

  const signup = async ({ name, email, password }) => {
    const res = await fetch(`${API_BASE}/api/signup`, {  // 👈 changed
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    return handleAuthResponse(res, "Signup failed");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const value = { user, token, login, signup, logout, isAuthenticated: !!token };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
