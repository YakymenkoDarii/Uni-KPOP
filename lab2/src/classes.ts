import type { Librarian } from "./interfaces.js";

// 2.4.1
export class UniversityLibrarian implements Librarian {
  name: string = "";
  email: string = "";
  department: string = "";

  assistCustomer(custName: string): void {
    console.log(`${this.name} is assisting ${custName}`);
  }
}

// 2.5.1, 2.7.1: клас став абстрактним
export abstract class ReferenceItem {
  // 2.5.3: властивості та конструктор замінено на параметри конструктора
  // title: string;
  // year: number;
  //
  // constructor(newTitle: string, newYear: number) {
  //   console.log("Creating a new ReferenceItem ...");
  //   this.title = newTitle;
  //   this.year = newYear;
  // }

  // 2.5.5
  static department: string = "Research Department";

  // 2.5.4
  private _publisher: string = "";

  // 2.6.3: year змінено з private на protected, щоб він був доступний в Encyclopedia
  constructor(public title: string, protected year: number) {
    console.log("Creating a new ReferenceItem ...");
  }

  get publisher(): string {
    return this._publisher.toUpperCase();
  }

  set publisher(newPublisher: string) {
    this._publisher = newPublisher;
  }

  printItem(): void {
    console.log(`${this.title} was published in ${this.year}`);
    console.log(`Department: ${ReferenceItem.department}`);
  }

  // 2.7.2
  abstract printCitation(): void;
}

// 2.6.1
export class Encyclopedia extends ReferenceItem {
  constructor(title: string, year: number, public edition: number) {
    super(title, year);
  }

  // 2.6.3
  override printItem(): void {
    super.printItem();
    console.log(`Edition: ${this.edition} (${this.year})`);
  }

  // 2.7.3
  printCitation(): void {
    console.log(`${this.title} - ${this.year}`);
  }
}
