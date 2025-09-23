import React, { useContext, useEffect, useState } from "react";
import JobForm from "../components/JobForm";
import type { JobFormInput } from "../components/JobForm";
import JobCard from "../components/JobCard";
import { AuthContext } from "../contexts/AuthContext";
import { fetchJobs, createJob } from "../api";
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
      // Update job (not implemented in API, just update local for now)
      setJobs((jobs) =>
        jobs.map((j) =>
          j.id === editingJob.id
            ? { ...job, userId: user.id, id: editingJob.id }
            : j
        )
      );
      setEditingJob(null);
      alert("Job updated!");
    } else {
      try {
        const saved = await createJob({ ...job, userId: user.id });
        setJobs((jobs) => [...jobs, saved]);
        alert("Job saved!");
      } catch {
        alert("Failed to save job");
      }
    }
  };

  const handleDelete = (id: number) => {
    // TODO: Call deleteJob API
    setJobs((jobs) => jobs.filter((j) => j.id !== id));
    alert("Job deleted!");
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
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Jobs You Applied For</h1>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by company or role"
          value={search}
          onChange={handleSearch}
          className="border p-2 rounded w-full sm:w-1/3"
        />
        <select
          value={status}
          onChange={handleStatus}
          className="border p-2 rounded"
        >
          <option value="">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interviewed">Interviewed</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select
          value={sort}
          onChange={handleSort}
          className="border p-2 rounded"
        >
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
        </select>
      </div>
      <JobForm onSubmit={handleAddOrUpdate} initial={editingJob || undefined} />
      <div className="mt-6 space-y-4">
        {filtered.length === 0 && (
          <div className="text-gray-500">No jobs found.</div>
        )}
        {filtered.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onDelete={handleDelete}
            onEdit={setEditingJob}
          />
        ))}
      </div>
    </main>
  );
}
