import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Welcome to JobTracker</h1>
      <p className="mt-2">
        Track your job applications, filter, sort and manage opportunities.
        Built with React + TypeScript.
      </p>
      <Link to="/Register" > <button>Click me</button> </Link>
    </main>
  );
}
