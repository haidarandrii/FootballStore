import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { StartLoadBasketProduct, SuccessLoadBaskerProduct, FailedLoadBasketProduct } from 'src/app/redux/Actions/basket.product.actions';
import { IProduct } from 'untitled folder/src/app/shared/interfaces/product';

@Component({
  selector: 'app-forma-shopping-cart',
  templateUrl: './forma-shopping-cart.component.html',
  styleUrls: ['./forma-shopping-cart.component.scss']
})
export class FormaShoppingCartComponent implements OnInit {
  firstName: string;
  secondName: string;
  productService: any;
  myProducts: Array<IProduct> = [];
  constructor(
    private store: Store<AppState>
  ) {
    this.store.select('registerPage').subscribe(d => {
      if (d.currentUser !== undefined) {
        this.firstName = d.currentUser.firstName;
        this.secondName = d.currentUser.secondName;
    }
    });
  }

  ngOnInit() {
  }
  public getBasketProduct(): void {
    this.store.dispatch(new StartLoadBasketProduct());
    this.productService.getBasketProduct().subscribe(
      data => {
        this.store.dispatch(new SuccessLoadBaskerProduct(data));
        this.store.select('basketProductPage').subscribe(d => {
          this.myProducts = d.basketProduct;
          // this.loader = d.loading;
        });
      },
      err => {
        this.store.dispatch(new FailedLoadBasketProduct(err));
      }
    );
  }

}
