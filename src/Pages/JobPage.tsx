import React, { useState, useEffect } from "react";
import JobForm from "../components/JobForm";
import type { JobFormInput } from "../components/JobForm";
import type { Job } from "../types";
import { createJob, fetchJobs } from "../api";

export default function JobPage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  // Load saved jobs when the page loads
  useEffect(() => {
    fetchJobs().then(setJobs).catch(console.error);
  }, []);

  const handleAddJob = async (job: JobFormInput) => {
    try {
      // For demo, assign userId: 1 (or get from context if available)
      const saved = await createJob({ ...job, userId: 1 });
      setJobs((prev) => [...prev, saved]);
    } catch (err) {
      console.error("Failed to save job", err);
      alert("Could not save job");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add a Job</h1>
      <JobForm onSubmit={handleAddJob} />
      <h2 className="text-xl font-semibold mt-8">Jobs Added</h2>
      <ul className="mt-2 space-y-1">
        {jobs.map((j) => (
          <li key={j.id} className="border p-2 rounded">
            <strong>{j.company}</strong> — {j.role} ({j.status})
          </li>
        ))}
      </ul>
    </div>
  );
}
