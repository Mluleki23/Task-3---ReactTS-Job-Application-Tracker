import { useContext, useEffect, useState } from "react";
import JobForm from "../components/JobForm";
import type { JobFormInput } from "../components/JobForm";
import JobCard from "../components/JobCard";
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

  return (
    <div className="main-content w-full max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Apply for a Job</h2>
      <JobForm onSubmit={handleAddOrUpdate} initial={editingJob || undefined} />
      <h3 className="text-xl font-semibold mt-8">Jobs You Have Applied For</h3>
      <div className="mt-2 space-y-4">
        {jobs.length === 0 && (
          <div className="text-gray-500">No jobs found.</div>
        )}
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onDelete={handleDelete}
            onEdit={setEditingJob}
          />
        ))}
      </div>

      {/* Modal removed: now handled by JobDetails page */}
    </div>
  );
};

export { JobPage };
