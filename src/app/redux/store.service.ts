import {Injectable} from '@angular/core';
import {Observable, pipe, Subject} from 'rxjs';
import {Action} from './action';
import {distinctUntilChanged, map, scan, shareReplay} from 'rxjs/operators';
import {get, isEqual, omit} from 'lodash';

const INITIAL_STATE = {
  hello: 'Jose',
  hola: 'José'
};

export const reducer = () =>
  scan<any>((state, action) => {
    let next;
    switch (action.type) {
      case 'SET':
        next = action.payload;
        break;
      case 'UPDATE':
        next = {...state, ...action.payload};
        break;
      case 'DELETE':
        next = omit(state, action.payload);
        break;
      case 'RESET_ALL':
        state = INITIAL_STATE;
        next = state;
        break;
      case 'RESET_ONE':
        const temp = {...state};
        temp[action.payload] = {...INITIAL_STATE}[action.payload];
        next = temp;
        break;
      default:
        next = state;
        break;
    }
    console.log(next);
    return next;
  }, {});

export const slice = path =>
  pipe(
    map(state => get(state, path, null)),
    distinctUntilChanged(isEqual)
  );

@Injectable({
  providedIn: 'root'
})
export class Store {
  state: Observable<any>;
  actions: Subject<Action> = new Subject();

  constructor() {
    this.state = this.actions.pipe(
      reducer(),
      shareReplay(1)
    );
  }

  dispatch(action: Action): void {
    this.actions.next(action);
  }

  select(path: string): any {
    return this.state.pipe(slice(path));
  }

}
