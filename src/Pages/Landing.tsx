import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main className="main-content text-center flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-4" style={{ color: "#2563eb" }}>
        Welcome to JobTracker
      </h1>
      <p className="text-lg text-gray-500 mb-6 max-w-xl">
        Effortlessly track your job applications, manage your opportunities, and
        stay organized on your career journey.
        <br />
        <span className="font-semibold">Built with React & TypeScript.</span>
      </p>
      <div className="flex gap-4 justify-center">
        <Link to="/register">
          <button
            className="btn"
            style={{
              background: "#22c55e",
              fontWeight: 600,
              fontSize: "1.1rem",
            }}
          >
            Get Started
          </button>
        </Link>
        <Link to="/login">
          <button
            className="btn"
            style={{
              background: "#2563eb",
              fontWeight: 600,
              fontSize: "1.1rem",
            }}
          >
            Login
          </button>
        </Link>
      </div>
      {/* Copyright removed, now only in footer */}
    </main>
  );
}
