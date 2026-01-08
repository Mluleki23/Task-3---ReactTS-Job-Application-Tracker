import axios from "axios";
import type { Job } from "./types";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const createJob = async (job: Job) => {
  const res = await API.post("/jobs", job);
  const data = res.data as Job;
  // Normalize id and userId to strings
  return { ...data, id: String(data.id), userId: String((data as any).userId) } as Job;
};

export const fetchJobs = async () => {
  const res = await API.get("/jobs");
  // Normalize ids to strings so client/server types match
  return (res.data as any[]).map((j) => ({ ...j, id: String(j.id), userId: String(j.userId) })) as Job[];
};
export const deleteJob = async (id: number | string) => {
  try {
    const res = await API.delete(`/jobs/${id}`);
    return res.status;
  } catch (err: any) {
    console.error("API deleteJob error:", err);
    // If resource not found, fetch all jobs for diagnostics
    if (err && err.response && err.response.status === 404) {
      try {
        const all = await API.get("/jobs");
        console.error("API deleteJob diagnostic - all jobs from server:", all.data);
      } catch (fetchErr) {
        console.error("Failed to fetch jobs for diagnostics:", fetchErr);
      }
      throw new Error(`Job with id ${id} not found on server (404).`);
    }
    throw err;
  }
};

export const updateJob = async (job: Job) => {
  const res = await API.put(`/jobs/${job.id}`, job);
  const data = res.data as Job;
  return { ...data, id: String(data.id), userId: String((data as any).userId) } as Job;
};
