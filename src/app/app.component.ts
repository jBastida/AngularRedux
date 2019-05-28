import {Component} from '@angular/core';
import {Store} from './redux/store.service';
import {Action} from './redux/action';
import {Observable} from 'rxjs';

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
    this.store.dispatch(new Action('SET', {hello: 'world'}));
  }

  update(): void {
    //  It's the most used to add/update data without delete others elements
    this.store.dispatch(new Action('UPDATE', {spanish: {hola: this.inputValue}}));
  }

  delete(): void {
    // It's the most used to delete certain data without delete others elements
    this.store.dispatch(new Action('DELETE', 'spanish'));
  }

  clear(): void {
    // It's used to reset all values to the its initial value
    this.store.dispatch(new Action('RESET_ALL'));
  }

  clearOneToDefault(): void {
    // It's' used to reset a certain value to the it's initial value
    this.store.dispatch(new Action('RESET_ONE', this.inputValue));
  }

  // Reference : https://angularfirebase.com/lessons/redux-from-scratch-angular-rxjs/
  // Install redux : https://www.npmjs.com/package/@angular-redux/store
}
