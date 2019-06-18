import { Component, OnInit } from '@angular/core';
import { StartLoadBasketProduct, SuccessLoadBaskerProduct, FailedLoadBasketProduct } from 'src/app/redux/Actions/basket.product.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { ProductService } from 'src/app/shared/services/product.service';
import { IProduct } from 'src/app/shared/interfaces/product';
import { StartDeleteBasketProduct, SuccessDeleteBasketProduct } from 'src/app/redux/Actions/delete.basket.product.actions';
import { Order } from 'src/app/shared/clases/order';
import { OrderAdminService } from 'src/app/shared/services/order-admin.service';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})
export class GoodsComponent implements OnInit {
  myProducts: Array<IProduct>;
  loader = false;
  order = {
    firstName: null,
    secondName: null,
    address: null
  };
  constructor(
    private store: Store<AppState>,
    private productService: ProductService,
    private orderAdminService: OrderAdminService,
    ) { }

  ngOnInit() {
    this.getBasketProduct();
  }
  public getBasketProduct(): void {
    this.store.dispatch(new StartLoadBasketProduct());
    this.productService.getBasketProduct().subscribe(
      data => {
        this.store.dispatch(new SuccessLoadBaskerProduct(data));
        this.store.select('basketProductPage').subscribe(d => {
          this.myProducts = d.basketProduct;
        });
      },
      err => {
        this.store.dispatch(new FailedLoadBasketProduct(err));
      }
    );
  }
  public delProductBasket(product: IProduct): void {
    const id = product.id;
    this.store.dispatch(new StartDeleteBasketProduct());
    this.productService.delBasketsProducts(id).subscribe(() => {
      this.getBasketProduct();
      this.store.dispatch(new SuccessDeleteBasketProduct());
      this.store.select('deleteBasketProductPage').subscribe(d => this.loader = d.loading);
    });
  }
}
