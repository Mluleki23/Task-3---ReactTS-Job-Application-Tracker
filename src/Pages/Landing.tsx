import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white text-center px-6">
      <section className="max-w-2xl">
        {/* Title */}
        <h1 className="text-5xl font-extrabold mb-4 text-blue-600">
          Welcome to <span className="text-green-500">JobTracker</span>
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Simplify your job search journey. Track your applications, manage
          interviews, and stay on top of every opportunity — all in one place.
          <br />
          <span className="font-semibold text-gray-700">
            Built with React & TypeScript.
          </span>
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register">
            <button className="px-6 py-3 bg-green-500 text-white rounded-lg text-lg font-semibold shadow-md hover:bg-green-600 transition duration-300">
              Get Started
            </button>
          </Link>
          <Link to="/login">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300">
              Login
            </button>
          </Link>
        </div>
      </section>

      {/* Decorative footer text */}
      <footer className="mt-16 text-gray-400 text-sm">
        © {new Date().getFullYear()} JobTracker. All rights reserved.
      </footer>
    </main>
  );
}
