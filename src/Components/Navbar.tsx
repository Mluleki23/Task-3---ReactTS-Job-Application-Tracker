import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <nav
      className="shadow mb-4"
      style={{
        background: "#2563eb",
        color: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center px-4 py-3">
        <div className="flex flex-col flex-row flex w-full justify-center gap-4 text-center">
          <Link
            to="/"
            className="font-bold text-lg btn"
            style={{
              background: "transparent",
              color: "#fff",
              boxShadow: "none",
              letterSpacing: "0.04em",
              margin: "0 1.5rem",
            }}
          >
            JobTracker
          </Link>
          <Link
            to="/jobs"
            className="font-bold text-lg btn"
            style={{
              background: "transparent",
              color: "#fff",
              boxShadow: "none",
            }}
          >
            Jobs
          </Link>
          {user && (
            <Link
              to="/jobs/1"
              className="font-bold text-lg btn"
              style={{
                background: "transparent",
                color: "#fff",
                boxShadow: "none",
              }}
            >
              Job Details
            </Link>
          )}
          {user ? (
            <>
              <span className="text-base" style={{ marginRight: "0.5rem" }}>
                Hello, <span className="font-bold">{user.username}</span>
              </span>
              <button
                onClick={handleLogout}
                className="btn"
                style={{
                  background: "#fff",
                  color: "#2563eb",
                  fontWeight: 600,
                  marginLeft: "0.5rem",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="font-bold text-lg btn"
                style={{
                  background: "transparent",
                  color: "#fff",
                  boxShadow: "none",
                }}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="font-bold text-lg btn"
                style={{
                  background: "transparent",
                  color: "#fff",
                  boxShadow: "none",
                }}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
