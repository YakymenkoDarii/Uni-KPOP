import { Category } from "./enum.js";
import type { Worker } from "./interfaces.js";
import type { WorkerInfo } from "./types.js";

export function getAllWorkers(): Worker[] {
  return [
    { id: 1, name: "Danylo", surname: "Romanovych", available: false, salary: 1000, category: Category.Developer },
    { id: 2, name: "Pavlo", surname: "Melnyk", available: true, salary: 1500, category: Category.Designer },
    { id: 3, name: "Mykola", surname: "Mikhnovskyi", available: false, salary: 1600, category: Category.QA },
    { id: 4, name: "Jarema", surname: "Vyshnevetskyi", available: true, salary: 1300, category: Category.Developer },
  ];
}

export function logFirstAvailable(workers: readonly Worker[] = getAllWorkers()): void {
  console.log(`Кількість робітників: ${workers.length}`);

  for (const worker of workers) {
    if (worker.available) {
      console.log(`Перший доступний: ${worker.name} ${worker.surname}`);
      return;
    }
  }

  console.log("Доступних робітників немає");
}

function getWorkersByCategory(category: Category): Worker[] {
  return getAllWorkers().filter((worker: Worker): boolean => worker.category === category);
}

export function getWorkersSurnamesByCategory(category: Category = Category.Designer): Array<string> {
  return getWorkersByCategory(category).map((worker: Worker): string => worker.surname);
}

export function logWorkersNames(names: string[]): void {
  console.log(names);
}

export function logWorkersByCategory(category: Category): void {
  getWorkersByCategory(category).forEach((worker: Worker): void => {
    console.log(`${worker.name} ${worker.surname}`);
  });
}

export function getWorkerByID(id: number): WorkerInfo | undefined {
  const worker: Worker | undefined = getAllWorkers().find((worker: Worker): boolean => worker.id === id);
  if (!worker) return undefined;

  const { name, surname, salary, available }: WorkerInfo = worker;
  return { name, surname, salary, available };
}

export function checkoutWorkers(customer: string, ...workerIDs: number[]): string[] {
  console.log(`Замовник: ${customer}`);

  const result: string[] = [];
  for (const id of new Set<number>(workerIDs)) {
    const worker: WorkerInfo | undefined = getWorkerByID(id);
    if (worker?.available) {
      result.push(`${worker.name} ${worker.surname}`);
    }
  }
  return result;
}
