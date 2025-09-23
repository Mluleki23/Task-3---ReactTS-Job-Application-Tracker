import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import type { User } from "../types";
import { Link } from "react-router-dom";

export default function Register() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return alert("Enter username and password");

    try {
      // Check if username already exists
      const existing = await axios.get<User[]>(
        `http://localhost:5000/users?username=${username}`
      );
      if (existing.data.length > 0) {
        return alert("Username already exists");
      }

      // Create new user
      const res = await axios.post<User>("http://localhost:5000/users", {
        username,
        password,
      });

      // Auto-login the user
      await login(username, password);

      // Redirect to home
      nav("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1">Username</label>
          <input
            className="w-full border p-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Link to="/login">
          {" "}
          <button
            type="submit"
            className="px-4 py-2 bg-sky-600 text-white rounded"
          >
            Register
          </button>
        </Link>
      </form>
    </main>
  );
}
