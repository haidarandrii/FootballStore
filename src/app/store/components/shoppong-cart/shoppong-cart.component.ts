import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { IProduct } from 'src/app/shared/interfaces/product';
import { OrderAdminService } from 'src/app/shared/services/order-admin.service';
import { Order } from 'src/app/shared/clases/order';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { StartLoadBasketProduct, SuccessLoadBaskerProduct, FailedLoadBasketProduct } from 'src/app/redux/Actions/basket.product.actions';
import { StartDeleteBasketProduct, SuccessDeleteBasketProduct } from 'src/app/redux/Actions/delete.basket.product.actions';

@Component({
  selector: 'app-shoppong-cart',
  templateUrl: './shoppong-cart.component.html',
  styleUrls: ['./shoppong-cart.component.scss']
})
export class ShoppongCartComponent implements OnInit {
  myProducts: Array<IProduct> = [];
  firstName: string;
  secondName: string;
  address: string;
  modalTrue = false;
  confirmModalTrue = false;
  goHomeTrue = false;
  modalSuccess = false;
  orderAdminProduct: Array<IProduct> = [];
  loader = false;
  constructor(
    private productService: ProductService,
    private orderAdminService: OrderAdminService,
    private store: Store<AppState>
    ) {}
  ngOnInit() {
    this.getBasketProduct();
  }
  public getBasketProduct(): void {
    this.store.dispatch(new StartLoadBasketProduct());
    this.productService.getBasketProduct().subscribe(
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
