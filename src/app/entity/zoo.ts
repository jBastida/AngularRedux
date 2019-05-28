import {Animal} from './animal';

export class Zoo {
  animals = Array<Animal>();

  constructor(animals) {
    this.animals = animals;
  }
}
