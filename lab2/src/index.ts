import { Encyclopedia, UniversityLibrarian } from "./classes.js";
import type { Author, Librarian, PrizeLogger, Worker } from "./interfaces.js";
import { getAllWorkers, getWorkerByID, PrintWorker } from "./workers.js";

function logSection(task: string): void {
  console.log(`\n--- Завдання ${task} ---`);
}

logSection("2.1");
const workers: Worker[] = getAllWorkers();
console.log("Усі робітники:", workers);
console.log("Робітник за ID 2:", getWorkerByID(2));
console.log("Робітник за ID 42:", getWorkerByID(42));

const worker: Worker | undefined = getWorkerByID(4);
if (worker) PrintWorker(worker);

logSection("2.2");
function printPrize(prize: string): void {
  console.log(`Prize: ${prize}`);
}

let logPrize: PrizeLogger;
logPrize = printPrize;
logPrize("Best worker of the month");

if (worker) {
  worker.markPrize = logPrize;
  worker.markPrize(`${worker.name} ${worker.surname} - best developer`);
}

logSection("2.3");
const favoriteAuthor: Author = {
  name: "Lina Kostenko",
  email: "lina.kostenko@example.com",
  numBooksPublished: 25,
};
console.log("favoriteAuthor:", favoriteAuthor);

// 2.4.2: код, що відноситься до favoriteLibrarian-літерала, закоментовано
// const favoriteLibrarian: Librarian = {
//   name: "Olena",
//   email: "olena@example.com",
//   department: "Classical Literature",
//   assistCustomer: (custName: string): void => console.log(`Olena is assisting ${custName}`),
// };
// console.log("favoriteLibrarian:", favoriteLibrarian);
// favoriteLibrarian.assistCustomer("Darii");

logSection("2.4");
const favoriteLibrarian: Librarian = new UniversityLibrarian();
favoriteLibrarian.name = "Olena";
favoriteLibrarian.assistCustomer("Darii");

logSection("2.5");
console.log("Код змінної ref закоментовано: ReferenceItem абстрактний (2.7.1), див. refBook нижче");
// 2.7.1: ReferenceItem став абстрактним, тому створити його екземпляр неможливо
// const ref: ReferenceItem = new ReferenceItem("TypeScript Handbook", 2012);
// ref.printItem();
// ref.publisher = "Microsoft Press";
// console.log(`Publisher: ${ref.publisher}`);

logSection("2.6");
const refBook: Encyclopedia = new Encyclopedia("Encyclopedia of Ukraine", 1984, 3);
refBook.printItem();
refBook.publisher = "Naukova Dumka";
console.log(`Publisher: ${refBook.publisher}`);

logSection("2.7");
refBook.printCitation();
