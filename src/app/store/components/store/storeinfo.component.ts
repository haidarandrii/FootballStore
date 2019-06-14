import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-storeinfo',
  templateUrl: './storeinfo.component.html',
  styleUrls: ['./storeinfo.component.scss']
})
export class StoreInfoComponent implements OnInit {
  products: Array<IProduct>;

  shoppingCart: Array<IProduct> = [];
  viewProduct: IProduct;
  showSearch = false;
  // countBasket: number;
  loader = false;
  constructor() {
  }
  ngOnInit() {
  }
  // public basketCounter(): void {
  //   this.productService.countBasket = this.basketProduct.length;
  // }
}
