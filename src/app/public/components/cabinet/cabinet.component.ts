import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces/user';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {
  currentUser: IUser;
  constructor(private store: Store<AppState>) {
    this.store.select('registerPage').subscribe(d => this.currentUser = d.currentUser);
  }
  ngOnInit() {
  }
}
