import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/interfaces/product';
import { Store } from '@ngrx/store';
import { AppState } from '../redux/app.state';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {
  title = 'Home';
  myProducts: Array<IProduct>;
  registration: string;
  singIn: string;
  constructor(
    private store: Store<AppState>
  ) {}
  ngOnInit() {
  }
}
