export class Counter {
  private count: number = 0;

  increment(): void {
    this.count++;
  }

  getValue(): number {
    return this.count;
  }
}