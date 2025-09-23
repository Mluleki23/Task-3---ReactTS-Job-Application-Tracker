// src/components/JobForm.tsx
import React, { useState } from "react";
import type{ Job, JobStatus } from "../types";

export default function JobForm({
  onSubmit,
  initial,
}: {
  onSubmit: (j: Job) => void;
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
      userId: initial?.userId || 1,
      createdAt: new Date().toISOString(),
      id: initial?.id || Date.now(),
    });
  };

  return (
    <form onSubmit={submit} className="space-y-2 p-4 bg-white rounded shadow">
      <div>
        <label className="block text-sm">Company</label>
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm">Role</label>
        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as JobStatus)}
            className="w-full border p-2 rounded"
          >
            <option>Applied</option>
            <option>Interviewed</option>
            <option>Rejected</option>
          </select>
        </div>
        <div>
          <label className="block text-sm">Date Applied</label>
          <input
            type="date"
            value={dateApplied}
            onChange={(e) => setDateApplied(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm">Details</label>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <button className="px-4 py-2 rounded bg-sky-600 text-white">
          Save
        </button>
      </div>
    </form>
  );
}
