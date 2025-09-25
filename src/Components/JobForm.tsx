import React, { useState } from "react";
import type { Job, JobStatus } from "../types";

export type JobFormInput = Omit<Job, "userId">;

export default function JobForm({
  onSubmit,
  initial,
}: {
  onSubmit: (job: JobFormInput) => void;
  initial?: Partial<Job>;
}) {
  const [company, setCompany] = useState(initial?.company || "");
  const [role, setRole] = useState(initial?.role || "");
  const [status, setStatus] = useState<JobStatus>(
    (initial?.status as JobStatus) || "Applied"
  );
  const [dateApplied, setDateApplied] = useState(
    initial?.dateApplied || new Date().toISOString().slice(0, 10)
  );
  const [details, setDetails] = useState(initial?.details || "");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !role) return alert("Please provide company and role");
    onSubmit({
      company,
      role,
      status,
      dateApplied,
      details,
      createdAt: initial?.createdAt || new Date().toISOString(),
      id: initial?.id || Date.now(),
    });
    // Reset form after adding new job
    if (!initial) {
      setCompany("");
      setRole("");
      setStatus("Applied");
      setDateApplied(new Date().toISOString().slice(0, 10));
      setDetails("");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-5 p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto border border-sky-100"
    >
      <h2 className="text-xl font-bold text-sky-700 mb-2 text-center">
        {initial ? "Edit Job" : "Add New Job"}
      </h2>
      <div>
        <label className="block text-sm font-medium text-sky-700 mb-1">
          Company
        </label>
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full border border-sky-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
          placeholder="e.g. Google"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-sky-700 mb-1">
          Role
        </label>
        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border border-sky-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
          placeholder="e.g. Frontend Developer"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-sky-700 mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as JobStatus)}
            className="w-full border border-sky-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
          >
            <option>Applied</option>
            <option>Interviewed</option>
            <option>Rejected</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-sky-700 mb-1">
            Date Applied
          </label>
          <input
            type="date"
            value={dateApplied}
            onChange={(e) => setDateApplied(e.target.value)}
            className="w-full border border-sky-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-sky-700 mb-1">
          Details
        </label>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="w-full border border-sky-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-sky-400 transition min-h-[60px]"
          placeholder="Notes, interview feedback, etc."
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="px-6 py-2 rounded-lg font-semibold shadow transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-green-400"
          style={{ background: initial ? "#2563eb" : "#22c55e", color: "#fff" }}
        >
          {initial ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
}
