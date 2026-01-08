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
        const updatedJob = {
          ...job,
          userId: user.id,
          id: editingJob.id,
        } as Job;
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
    <main className="main-content w-full max-w-7xl mx-auto mt-8 mb-16 pb-8 px-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome to JobTracker</h1>
      <p className="text-lg text-gray-500 mb-6 max-w-xl mx-auto text-center">
        Effortlessly track your job applications, manage your opportunities, and
        stay organized on your career journey.
        <br />
        <span className="font-semibold">Built with React & TypeScript.</span>
      </p>

      {/* Add/Edit Job Form */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{editingJob ? "Edit Job" : "Add Job"}</h2>
        <JobForm
          onSubmit={handleAddOrUpdate}
          initial={editingJob || undefined}
          onCancel={() => setEditingJob(null)}
        />
      </div>

      {/* Search / Filter / Sort Controls */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Search</label>
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={handleSearch}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Status</label>
            <select
              value={status}
              onChange={handleStatus}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Interviewed">Interviewed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Sort By</label>
            <select
              value={sort}
              onChange={handleSort}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>

          <div className="flex items-end justify-end">
            <button
              className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
              onClick={() => setSearchParams({})}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Job List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.length === 0 ? (
          <div className="p-6 bg-white rounded shadow">No jobs found. Add a job to get started.</div>
        ) : filtered.length === 0 ? (
          <div className="p-6 bg-white rounded shadow">No jobs match your search or filters. Try clearing filters.</div>
        ) : (
          filtered.map((job) => (
            <JobCard key={job.id} job={job} onDelete={handleDelete} onEdit={(j) => setEditingJob(j)} />
          ))
        )}
      </div>
    </main>
  );
}
