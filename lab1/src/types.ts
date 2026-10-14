import type { Worker } from "./interfaces.js";

export type WorkerInfo = Pick<Worker, "name" | "surname" | "salary" | "available">;

export type IdGenerator = (name: string, id: number) => string;
