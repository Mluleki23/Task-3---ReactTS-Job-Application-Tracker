// src/pages/Home.tsx
import React from "react";
import JobForm from "../components/JobForm";
import type { Job } from "../types";

export default function Home() {
  const handleSubmit = (job: Job) => {
    console.log("Submit job:", job);
    // You can call createJob(job) here if API is ready
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Jobs You Applied For</h1>
      <JobForm onSubmit={handleSubmit} />
    </main>
  );
}
