import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './redux/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'footballStore';
  registration = false;
  singIn = false;
  constructor(
    private store: Store<AppState>
  ) {
    this.store.select('actionsPage').subscribe(d => {
      this.registration = d.registrationStatus;
      this.singIn = d.singInStatus;
    });
  }
}
