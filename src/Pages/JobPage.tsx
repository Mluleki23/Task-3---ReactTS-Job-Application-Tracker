import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobForm from "../components/JobForm";
import type { JobFormInput } from "../components/JobForm";
import { AuthContext } from "../contexts/AuthContext";
import { fetchJobs, createJob, deleteJob, updateJob } from "../api";
import type { Job } from "../types";

// ...existing code...

const JobPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("dateApplied");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
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
      try {
        const updatedJob = { ...job, userId: user.id, id: editingJob.id };
        const saved = await updateJob(updatedJob);
        setJobs((jobs) =>
          jobs.map((j) => (j.id === editingJob.id ? saved : j))
        );
        setEditingJob(null);
        alert("Job updated successfully!");
      } catch (err) {
        alert("Failed to update job");
      }
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

  const handleDelete = async (id: number | string) => {
    console.log(`[DEBUG] Attempting delete for id: ${id} (type: ${typeof id})`);
    try {
      const status = await deleteJob(id);
      console.log(`[DEBUG] deleteJob status: ${status}`);
      if (status === 200 || status === 204) {
        // Re-fetch to ensure we are in sync with the server
        const all = await fetchJobs();
        setJobs(all.filter((j) => j.userId === user!.id));
        alert("Job deleted successfully!");
      } else {
        alert(`Failed to delete job: server responded with status ${status}`);
      }
    } catch (err: any) {
      console.error("Failed to delete job", err);
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

  const getStatusColor = (status: string) => {
    if (status === "Interviewed") return "green";
    if (status === "Rejected") return "red";
    if (status === "Applied") return "blue";
    return "gray";
  };

  // Filter and sort jobs
  const filteredAndSortedJobs = jobs
    .filter((job) => {
      const matchesSearch =
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.details.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || job.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue: any = a[sortBy as keyof Job];
      let bValue: any = b[sortBy as keyof Job];

      if (sortBy === "dateApplied") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  return (
    <div className="main-content w-full max-w-7xl mx-auto mt-8 mb-16 pb-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Job Application Tracker
      </h1>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">
          {editingJob ? "Edit Job" : "Add Job"}
        </h2>
        <JobForm
          onSubmit={handleAddOrUpdate}
          initial={editingJob || undefined}
          onCancel={() => setEditingJob(null)}
        />
      </div>

      <div className="mb-6 bg-white p-4 rounded-lg shadow border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Search</label>
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Interviewed">Interviewed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="dateApplied">Date Applied</option>
              <option value="company">Company</option>
              <option value="role">Role</option>
              <option value="status">Status</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Order</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto -mx-4 px-4">
        <table className="min-w-full table-fixed border-collapse border border-gray-300 bg-white shadow-lg">
          <colgroup>
            <col style={{ width: "30%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
          </colgroup>
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold align-middle whitespace-nowrap">
                Company
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold align-middle whitespace-nowrap">
                Role
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold align-middle whitespace-nowrap">
                Status
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold align-middle whitespace-nowrap">
                Date applied
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold align-middle whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedJobs.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="border border-gray-300 px-4 py-8 text-center text-gray-500"
                >
                  {jobs.length === 0
                    ? "No jobs found. Add a job to get started."
                    : "No jobs match your search criteria. Try clearing filters or adjusting your search."}
                </td>
              </tr>
            ) : (
              filteredAndSortedJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 align-middle overflow-hidden truncate">
                    {job.company}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 align-middle overflow-hidden truncate">
                    {job.role}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 align-middle">
                    <span
                      className="inline-block align-middle"
                      style={{
                        color: getStatusColor(job.status),
                        fontWeight: "600",
                      }}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-3 align-middle whitespace-nowrap">
                    {job.dateApplied}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 align-middle whitespace-nowrap">
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() => setEditingJob(job)}
                        className="btn-green"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="btn-red"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => navigate(`/jobs/${job.id}`)}
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
