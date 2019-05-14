import { Component, OnInit, HostListener } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { IProduct } from '../shared/interfaces/product';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  myProducts: Array<IProduct>;
  menuClick = false;
  public scroll: number;
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getBasketProducts();
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scroll = window.scrollY;
  }
   // tslint:disable-next-line:use-life-cycle-interface
  @HostListener('click', ['$event.target'])
  onClick(btn) {
    this.getBasketProducts();
 }
  public showMenu(): void {
    this.menuClick = !this.menuClick;
  }
  public getBasketProducts(): void {
    this.productService.getBasketProduct().subscribe(
      data => {
        this.myProducts = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
