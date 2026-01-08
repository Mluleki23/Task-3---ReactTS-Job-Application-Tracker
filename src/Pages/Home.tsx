import React, { useContext, useEffect, useState } from "react";
import JobForm from "../components/JobForm";
import type { JobFormInput } from "../components/JobForm";
import JobCard from "../components/JobCard";
import { AuthContext } from "../contexts/AuthContext";
import { fetchJobs, createJob, updateJob, deleteJob } from "../api";
import type { Job } from "../types";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Fetch jobs for the logged-in user
  useEffect(() => {
    if (!user) return;
    fetchJobs().then((data) => {
      setJobs(data.filter((j) => j.userId === user.id));
    });
  }, [user]);

  // Search, filter, sort helpers
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const sort = searchParams.get("sort") || "desc";

  let filtered = jobs.filter(
    (j) =>
      (j.company.toLowerCase().includes(search.toLowerCase()) ||
        j.role.toLowerCase().includes(search.toLowerCase())) &&
      (status ? j.status === status : true)
  );
  filtered = filtered.sort((a, b) =>
    sort === "asc"
      ? a.dateApplied.localeCompare(b.dateApplied)
      : b.dateApplied.localeCompare(a.dateApplied)
  );

  // CRUD handlers
  const handleAddOrUpdate = async (job: JobFormInput) => {
    if (!user) {
      alert("You must be logged in to add a job.");
      return;
    }
      if (editingJob) {
      try {
        const updatedJob = { ...job, userId: user.id, id: editingJob.id } as Job;
        const saved = await updateJob(updatedJob);
        setJobs((jobs) => jobs.map((j) => (j.id === saved.id ? saved : j)));
        setEditingJob(null);
        alert("Job updated!");
      } catch (err) {
        console.error("[ERROR] Failed to update job", err);
        alert(
          "Failed to update job: " +
            (err instanceof Error ? err.message : String(err))
        );
      }
    } else {
      try {
        const jobToSave = { ...job, userId: user.id };
        console.log("[DEBUG] Saving job:", jobToSave);
        const saved = await createJob(jobToSave);
        setJobs((jobs) => [...jobs, saved]);
        alert("Job saved!");
      } catch (err) {
        console.error("[ERROR] Failed to save job", err);
        alert(
          "Failed to save job: " +
            (err instanceof Error ? err.message : String(err))
        );
      }
    }
  };

  const handleDelete = async (id: number | string) => {
    console.log(`[DEBUG] Attempting delete for id: ${id} (type: ${typeof id})`);
    try {
      const status = await deleteJob(id);
      console.log(`[DEBUG] deleteJob status: ${status}`);
      if (status === 200 || status === 204) {
        // Re-fetch to ensure we are in sync with the server
        const all = await fetchJobs();
        setJobs(all.filter((j) => j.userId === user!.id));
        alert("Job deleted!");
      } else {
        alert(`Failed to delete job: server responded with status ${status}`);
      }
    } catch (err: any) {
      console.error("[ERROR] Failed to delete job", err);
      // If it's a 404 diagnostic message, surface actionable guidance
      if (err && err.message && err.message.includes("not found")) {
        alert(
          `Delete failed: the job was not found on the server. Please refresh the page and try again. Check that the job exists in db.json and that the server is running on port 5000.`
        );
      } else {
        alert(
          "Failed to delete job: " +
            (err instanceof Error ? err.message : String(err))
        );
      }
    }
  };

  // UI Handlers for search/filter/sort
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      search: e.target.value,
    });
  };
  const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      status: e.target.value,
    });
  };
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      sort: e.target.value,
    });
  };

  return (
    <main className="main-content text-center flex flex-col items-center justify-center p-6 min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-4" style={{ color: "#2563eb" }}>
        Welcome to JobTracker
      </h1>
      <p className="text-lg text-gray-500 mb-6 max-w-xl">
        Effortlessly track your job applications, manage your opportunities, and
        stay organized on your career journey.
        <br />
        <span className="font-semibold">Built with React & TypeScript.</span>
      </p>
      <div className="flex gap-4 justify-center mb-8">
        <button
          className="btn"
          style={{ background: "#22c55e", fontWeight: 600, fontSize: "1.1rem" }}
        >
          Get Started
        </button>
        <button
          className="btn"
          style={{ background: "#2563eb", fontWeight: 600, fontSize: "1.1rem" }}
        >
          Login
        </button>
      </div>
      {/* Copyright removed, now only in footer */}
    </main>
  );
}
