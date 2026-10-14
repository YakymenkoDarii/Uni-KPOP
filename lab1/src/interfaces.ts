import type { Category } from "./enum.js";

export interface Worker {
  id: number;
  name: string;
  surname: string;
  available: boolean;
  salary: number;
  category: Category;
}
