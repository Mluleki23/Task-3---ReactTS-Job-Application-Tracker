import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import type { User } from "../types";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // restore saved user on first load
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = async (username: string, password: string) => {
    const res = await axios.get<User[]>(
      `http://localhost:5000/users?username=${username}&password=${password}`
    );
    if (res.data.length > 0) {
      setUser(res.data[0]);
      localStorage.setItem("user", JSON.stringify(res.data[0]));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
