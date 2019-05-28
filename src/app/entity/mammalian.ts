import {Animal} from './animal';

export class Mammalian extends Animal {
  numberOfLegs: number;
  furType: string;

  constructor(name: string, age: number, genre: string, numberOfLegs: number, furType: string) {
    super(name, age, genre);
    this.numberOfLegs = numberOfLegs;
    this.furType = furType;
  }
}
