import React from "react";
import type { Job } from "../types";

const statusColor = (s: string) =>
  s === "Rejected" ? "bg-red-200 text-red-800" :
  s === "Applied" ? "bg-yellow-200 text-yellow-800" : "bg-green-200 text-green-800";

export default function JobCard({
  job,
  onDelete,
  onEdit
}: {
  job: Job;
  onDelete: (id: number) => void;
  onEdit: (job: Job) => void;
}) {
  return (
    <div className="p-4 rounded shadow-sm bg-white flex flex-col sm:flex-row sm:justify-between">
      <div>
        <h3 className="text-lg font-semibold">{job.company} — {job.role}</h3>
        <p className="text-sm">Applied: {job.dateApplied}</p>
        <p className="text-sm">{job.details}</p>
      </div>
      <div className="flex items-center gap-2 mt-4 sm:mt-0">
        <span className={`px-2 py-1 rounded ${statusColor(job.status)}`}>{job.status}</span>
        <button onClick={() => onEdit(job)} className="px-2 py-1 rounded border">Edit</button>
        <button onClick={() => onDelete(job.id)} className="px-2 py-1 rounded border">Delete</button>
      </div>
    </div>
  );
}
