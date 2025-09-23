import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  return (
    <header className="w-full bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">JobTracker</Link>
      <nav className="space-x-4">
        <Link to="/home" className="hover:underline">Home</Link>
        {user ? (
          <button onClick={() => { logout(); nav("/login"); }} className="px-3 py-1 rounded bg-red-50">Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
