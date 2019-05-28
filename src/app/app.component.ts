import {Component} from '@angular/core';
import {Store} from './redux/store.service';
import {Action} from './redux/action';
import {Observable} from 'rxjs';
import {Mammalian} from './entity/mammalian';
import {Birds} from './entity/birds';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularRedux';

  $spanish: Observable<any>;
  inputValue = 'hello';

  constructor(private store: Store) {
    this.$spanish = store.select('spanish.hola');
  }

  set(): void {
    // Only use in special case because it will delete all and add the new payload
    this.store.dispatch(new Action('SET', {
      animals: [
        new Mammalian('Coyote', 12, 'male', 4, 'hair'),
        new Birds('Roadrunner', 10, 'male', 0, 500)
      ]
    }));
  }

  update(): void {
    //  It's the most used to add/update data without delete others elements
    this.store.dispatch(new Action('UPDATE_POSITION',  new Mammalian('A', 0, 'B', 1, 'C'), 1));
  }

  delete(): void {
    // It's the most used to delete certain data without delete others elements
    this.store.dispatch(new Action('DELETE_POSITION', 0));
  }

  clear(): void {
    // It's used to reset all values to the its initial value
    this.store.dispatch(new Action('RESET_ALL'));
  }

  clearOneToDefault(): void {
    // It's' used to reset a certain value to the it's initial value
    this.store.dispatch(new Action('RESET_ONE', this.inputValue));
  }

  // Reference : https://redux.js.org/recipes/using-object-spread-operator
  // Install redux : https://www.npmjs.com/package/@angular-redux/store
}
