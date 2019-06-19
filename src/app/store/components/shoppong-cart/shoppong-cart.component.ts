import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { StartLoadBasketProduct, SuccessLoadBaskerProduct, FailedLoadBasketProduct } from 'src/app/redux/Actions/basket.product.actions';
import { BasketServiceService } from 'src/app/shared/services/basket-service.service';

@Component({
  selector: 'app-shoppong-cart',
  templateUrl: './shoppong-cart.component.html',
  styleUrls: ['./shoppong-cart.component.scss']
})
export class ShoppongCartComponent implements OnInit {
  myProducts: Array<IProduct> = [];
  constructor(
    private basketService: BasketServiceService,
    private store: Store<AppState>
    ) {}
  ngOnInit() {
    this.getBasketProduct();
  }
  public getBasketProduct(): void {
    this.store.dispatch(new StartLoadBasketProduct());
    this.basketService.getBasketProduct().subscribe(
      data => {
        this.store.dispatch(new SuccessLoadBaskerProduct(data));
        this.store.select('basketProductPage').subscribe(d => this.myProducts = d.basketProduct);
      },
      err => {
        this.store.dispatch(new FailedLoadBasketProduct(err));
      }
    );
  }
}
