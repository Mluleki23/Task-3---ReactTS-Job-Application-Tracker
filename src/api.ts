import axios from "axios";
import type { Job } from "./types";

const API = axios.create({ baseURL: "http://localhost:5001" });

export const createJob = async (job: Job) => {
  const res = await API.post("/jobs", job);
  return res.data as Job;
};

export const fetchJobs = async () => {
  const res = await API.get("/jobs");
  return res.data as Job[];
};

export const deleteJob = async (id: number) => {
  await API.delete(`/jobs/${id}`);
};

export const updateJob = async (job: Job) => {
  const res = await API.put(`/jobs/${job.id}`, job);
  return res.data as Job;
};
