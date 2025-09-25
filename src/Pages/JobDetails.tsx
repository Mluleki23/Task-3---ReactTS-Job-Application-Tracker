import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import type { Job } from "../types";
import { fetchJobs } from "../api";

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useContext(AuthContext);
  const [job, setJob] = useState<Job | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    fetchJobs().then((jobs) => {
      const found = jobs.find(
        (j) => j.id === Number(id) && j.userId === user.id
      );
      setJob(found || null);
    });
  }, [id, user]);

  if (!user) {
    return (
      <div className="p-4">You must be logged in to view job details.</div>
    );
  }

  if (!job) {
    return (
      <div className="p-4">
        <div>Job not found.</div>
        <button
          className="mt-2 text-blue-600 underline"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="main-content w-full max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-2">Job Details</h2>
      <div className="mb-2">
        <b>Company:</b> {job.company}
      </div>
      <div className="mb-2">
        <b>Role:</b> {job.role}
      </div>
      <div className="mb-2">
        <b>Status:</b> {job.status}
      </div>
      <div className="mb-2">
        <b>Date Applied:</b> {job.dateApplied}
      </div>
      <div className="mb-2">
        <b>Details:</b> {job.details}
      </div>
      <button
        className="mt-4 text-blue-600 underline"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
};

export default JobDetails;
