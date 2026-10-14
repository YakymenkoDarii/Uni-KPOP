import { createCustomer, createCustomerID } from "./customer.js";
import { Category } from "./enum.js";
import type { Worker } from "./interfaces.js";
import type { IdGenerator } from "./types.js";
import {
  checkoutWorkers,
  getAllWorkers,
  getWorkerByID,
  getWorkersSurnamesByCategory,
  logFirstAvailable,
  logWorkersByCategory,
  logWorkersNames,
} from "./workers.js";

const MY_NAME: string = "Darii";
const MY_LIST_NUMBER: number = 22;
const MY_GROUP: number = 2;
const MY_HOBBY: number = 4;

function logSection(task: string): void {
  console.log(`\n--- Завдання ${task} ---`);
}

logSection("1.1");
const workers: Worker[] = getAllWorkers();
console.log("Усі робітники:", workers);
logFirstAvailable(workers);

logSection("1.2");
const developerSurnames: string[] = getWorkersSurnamesByCategory(Category.Developer);
console.log(`Прізвища робітників категорії ${Category.Developer}:`);
logWorkersNames(developerSurnames);

logSection("1.3");
console.log(`Робітники категорії ${Category.Developer}:`);
logWorkersByCategory(Category.Developer);
console.log("Робітник за ID 2:", getWorkerByID(2));
console.log("Робітник за ID 42:", getWorkerByID(42));

logSection("1.4");
const myID: string = createCustomerID(MY_NAME, MY_LIST_NUMBER);
console.log(`myID: ${myID}`);

let idGenerator: IdGenerator = (name: string, id: number): string => `${name}${id}`;
console.log(`idGenerator (стрілочна): ${idGenerator(MY_NAME, MY_LIST_NUMBER)}`);

idGenerator = createCustomerID;
console.log(`idGenerator (createCustomerID): ${idGenerator(MY_NAME, MY_LIST_NUMBER)}`);

logSection("1.5");
console.log("createCustomer з одним параметром:");
createCustomer(MY_NAME);
console.log("createCustomer з двома параметрами:");
createCustomer(MY_NAME, 20);
console.log("createCustomer з трьома параметрами:");
createCustomer(MY_NAME, 20, "Kyiv");

console.log("getWorkersSurnamesByCategory без параметрів:");
logWorkersNames(getWorkersSurnamesByCategory());

console.log("logFirstAvailable без параметрів:");
logFirstAvailable();

console.log("Оформлення замовлення:");
const myWorkers: string[] = checkoutWorkers(MY_NAME, MY_LIST_NUMBER, MY_GROUP, MY_HOBBY);
myWorkers.forEach((worker: string): void => console.log(worker));
