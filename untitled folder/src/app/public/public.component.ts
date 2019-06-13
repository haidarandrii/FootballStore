import { Component, HostListener, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { IProduct } from '../shared/interfaces/product';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {
  title = 'Home';
  myProducts: Array<IProduct>;
  constructor() {}
 ngOnInit() {
 }
}
