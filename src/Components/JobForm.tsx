import React, { useState, useEffect } from "react";
import type { Job, JobStatus } from "../types";

export type JobFormInput = Omit<Job, "userId">;

export default function JobForm({
  onSubmit,
  initial,
  onCancel,
}: {
  onSubmit: (job: JobFormInput) => void;
  initial?: Partial<Job>;
  onCancel?: () => void;
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

  // Update form fields when initial prop changes
  useEffect(() => {
    if (initial) {
      setCompany(initial.company || "");
      setRole(initial.role || "");
      setStatus((initial.status as JobStatus) || "Applied");
      setDateApplied(initial.dateApplied || new Date().toISOString().slice(0, 10));
      setDetails(initial.details || "");
    } else {
      setCompany("");
      setRole("");
      setStatus("Applied");
      setDateApplied(new Date().toISOString().slice(0, 10));
      setDetails("");
    }
  }, [initial]);

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
    <form onSubmit={submit} className="space-y-4 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-base font-normal mb-1">Company name</label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-base font-normal mb-1">Role</label>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-base font-normal mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as JobStatus)}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option>Applied</option>
            <option>Interviewed</option>
            <option>Rejected</option>
          </select>
        </div>
        <div>
          <label className="block text-base font-normal mb-1">Date applied</label>
          <input
            type="date"
            value={dateApplied}
            onChange={(e) => setDateApplied(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="MM/DD/YYYY"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-base font-normal mb-1">Extra details</label>
        <input
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>
      
      <div className="flex gap-2">
        <button
          type="submit"
          className="btn-green"
        >
          {initial ? "Update" : "Save"}
        </button>
        {initial && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
