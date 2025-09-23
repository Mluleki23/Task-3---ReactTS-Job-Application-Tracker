import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import type { User } from "../types";

// Context type
interface AuthCtx {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Create context
export const AuthContext = createContext<AuthCtx>({} as AuthCtx);

// Axios instance
const API = axios.create({ baseURL: "http://localhost:5000" });

// Login function
const authLogin = async (
  username: string,
  password: string
): Promise<User | null> => {
  try {
    const res = await API.get<User[]>(
      `/users?username=${username}&password=${password}`
    );
    if (res.data.length > 0) {
      return res.data[0];
    }
    return null;
  } catch (err) {
    console.error("Login error:", err);
    return null;
  }
};

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem("jobtracker_user");
    const parsed = raw ? JSON.parse(raw) : null;
    console.log("[AuthProvider] Initial user from localStorage:", parsed);
    return parsed;
  });

  // Sync with localStorage
  useEffect(() => {
    console.log("[AuthProvider] user changed:", user);
    if (user) localStorage.setItem("jobtracker_user", JSON.stringify(user));
    else localStorage.removeItem("jobtracker_user");
  }, [user]);

  // Login method
  const login = async (username: string, password: string) => {
    const u = await authLogin(username, password);
    if (u) {
      setUser(u);
      return true;
    }
    return false;
  };

  // Logout method
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
