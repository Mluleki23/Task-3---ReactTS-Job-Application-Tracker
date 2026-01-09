// src/types.ts

export interface User {
  id: string;
  username: string;
  password: string;
}

export type JobStatus = "Applied" | "Interviewed" | "Rejected";

export interface Job {
  id: string;
  company: string;
  role: string;
  status: JobStatus;
  dateApplied: string;
  details: string;
  userId: string;
  createdAt: string;
}
