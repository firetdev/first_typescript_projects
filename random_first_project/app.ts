import { Counter } from './counter'

const counter: Counter = new Counter();

counter.increment();
counter.increment();

console.log("Counter value:", counter.getValue());