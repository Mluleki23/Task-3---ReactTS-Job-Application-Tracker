import { useContext, useEffect, useState } from "react";
import JobForm from "../components/JobForm";
import type { JobFormInput } from "../components/JobForm";
import { AuthContext } from "../contexts/AuthContext";
import { fetchJobs, createJob } from "../api";
import type { Job } from "../types";

// ...existing code...

const JobPage = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  // Removed viewJob state, no longer needed

  // Fetch jobs for the logged-in user
  useEffect(() => {
    if (!user) return;
    fetchJobs().then((data) => {
      setJobs(data.filter((j) => j.userId === user.id));
    });
  }, [user]);

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
        const jobToSave = { ...job, userId: user.id };
        const saved = await createJob(jobToSave);
        setJobs((jobs) => [...jobs, saved]);
        alert("Job saved!");
      } catch (err) {
        alert("Failed to save job");
      }
    }
  };

  const handleDelete = (id: number) => {
    setJobs((jobs) => jobs.filter((j) => j.id !== id));
    alert("Job deleted!");
  };

  const getStatusColor = (status: string) => {
    if (status === "Interviewed") return "green";
    if (status === "Rejected") return "red";
    if (status === "Applied") return "blue";
    return "gray";
  };

  return (
    <div className="main-content w-full max-w-5xl mx-auto mt-8 mb-16 pb-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Job Application Tracker</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{editingJob ? "Edit Job" : "Add Job"}</h2>
        <JobForm 
          onSubmit={handleAddOrUpdate} 
          initial={editingJob || undefined}
          onCancel={() => setEditingJob(null)}
        />
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 bg-white">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Company</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Role</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Status</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Date applied</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={5} className="border border-gray-300 px-4 py-8 text-center text-gray-500">
                  No jobs found.
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">{job.company}</td>
                  <td className="border border-gray-300 px-4 py-3">{job.role}</td>
                  <td className="border border-gray-300 px-4 py-3">
                    <span style={{ color: getStatusColor(job.status), fontWeight: "600" }}>
                      {job.status}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-3">{job.dateApplied}</td>
                  <td className="border border-gray-300 px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingJob(job)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => window.location.href = `/jobs/${job.id}`}
                        className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                      >
                        View Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { JobPage };
