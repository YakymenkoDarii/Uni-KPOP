export function createCustomerID(name: string, id: number): string {
  if (!Number.isInteger(id) || id <= 0) {
    throw new RangeError(`Некоректний id: ${id}`);
  }
  return `${name}${id}`;
}

export function createCustomer(name: string, age?: number, city?: string): void {
  console.log(`Замовник: ${name}`);
  if (age) console.log(`Вік: ${age}`);
  if (city) console.log(`Місто: ${city}`);
}
