// ...existing code...
import { useNavigate } from "react-router-dom";
import type { Job } from "../types";

const statusColor = (s: string) =>
  s === "Rejected"
    ? "bg-red-500 text-white"
    : s === "Applied"
    ? "bg-blue-500 text-white"
    : "bg-green-500 text-white";

type JobCardProps = {
  job: Job;
  onDelete: (id: number) => void;
  onEdit: (job: Job) => void;
};

export default function JobCard({ job, onDelete, onEdit }: JobCardProps) {
  const navigate = useNavigate();
  return (
    <div className="p-5 rounded-lg shadow-md bg-white border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        {/* Job Info Section */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {job.company} — {job.role}
          </h3>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold">Applied:</span> {job.dateApplied}
          </p>
          <p className="text-sm text-gray-700 mt-2">{job.details}</p>
          
          {/* Status Badge */}
          <div className="mt-3">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusColor(job.status)}`}>
              {job.status}
            </span>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="flex flex-row sm:flex-col gap-2 sm:min-w-[120px]">
          <button
            onClick={() => navigate(`/jobs/${job.id}`)}
            className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            View Details
          </button>
          <button
            onClick={() => onEdit(job)}
            className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(job.id)}
            className="px-4 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
