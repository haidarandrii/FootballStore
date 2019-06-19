import { Component, OnInit, HostListener } from '@angular/core';
import { IProduct } from '../shared/interfaces/product';
import { BasketServiceService } from '../shared/services/basket-service.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  myProducts: Array<IProduct>;
  menuClick = false;
  public scroll: number;
  constructor(
    private basketService: BasketServiceService,
    ) {}

  ngOnInit() {
    this.getBasketProducts();
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scroll = window.scrollY;
  }
  public showMenu(): void {
    this.menuClick = !this.menuClick;
  }
  public getBasketProducts(): void {
    this.basketService.getBasketProduct().subscribe(
      data => {
        this.myProducts = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
