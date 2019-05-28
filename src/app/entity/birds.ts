import {Animal} from './animal';

export class Birds extends Animal {
  flightHeight: number;
  numberOfFeathers: number;

  constructor(name: string, age: number, genre: string, flightHeight: number, numberOfFeathers: number) {
    super(name, age, genre);
    this.flightHeight = flightHeight;
    this.numberOfFeathers = numberOfFeathers;
  }
}
