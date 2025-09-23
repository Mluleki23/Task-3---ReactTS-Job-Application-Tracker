// src/pages/JobPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchJob } from "../api";
import type { Job } from "../types";

export default function JobPage() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (id) {
      fetchJob(Number(id)).then(setJob).catch(console.error);
    }
  }, [id]);

  if (!job) return <p>Loading...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {job.company} — {job.role}
      </h1>
      <p>Status: {job.status}</p>
      <p>Date Applied: {job.dateApplied}</p>
      <p>Details: {job.details}</p>
    </main>
  );
}
