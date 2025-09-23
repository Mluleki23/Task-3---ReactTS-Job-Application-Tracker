// src/types.ts

export interface User {
  id: number;
  username: string;
  password: string;
}

export type JobStatus = "Applied" | "Interviewed" | "Rejected";

export interface Job {
  id: number;
  company: string;
  role: string;
  status: JobStatus;
  dateApplied: string;
  details: string;
  userId: number;
  createdAt: string;
}
