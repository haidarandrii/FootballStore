import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { StartLoadBasketProduct, SuccessLoadBaskerProduct, FailedLoadBasketProduct } from 'src/app/redux/Actions/basket.product.actions';
import { ProductService } from 'src/app/shared/services/product.service';
import { Order } from 'src/app/shared/clases/order';
import { IProduct } from 'src/app/shared/interfaces/product';
import { OrderAdminService } from 'src/app/shared/services/order-admin.service';

@Component({
  selector: 'app-forma-shopping-cart',
  templateUrl: './forma-shopping-cart.component.html',
  styleUrls: ['./forma-shopping-cart.component.scss']
})
export class FormaShoppingCartComponent implements OnInit {
  myProducts: Array<IProduct> = [];
  modalTrue = false;
  confirmModalTrue = false;
  goHomeTrue = false;
  modalSuccess = false;
  orderAdminProduct: Array<IProduct> = [];
  order = {
    firstName: '',
    secondName: '',
    address: ''
  };
  constructor(
    private store: Store<AppState>,
    private productService: ProductService,
    private orderAdminService: OrderAdminService
  ) {
    this.store.select('registerPage').subscribe(d => {
      if (d.currentUser !== undefined) {
        this.order.firstName = d.currentUser.firstName;
        this.order.secondName = d.currentUser.secondName;
    }
    });
  }

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
          console.log(this.myProducts);
        });
      },
      err => {
        this.store.dispatch(new FailedLoadBasketProduct(err));
      }
    );
    console.log(this.myProducts);
  }
  public fullPrice(): number {
    const result = this.myProducts.reduce((acum, a) => {
      return acum + a.price;
    }, 0);
    return result;
  }
  public confirm(): void {
    this.orderAdminService.addJsonOrderProduct(new Order(this.myProducts,
      this.order.firstName, this.order.secondName, this.order.address, 'created')).subscribe();
      // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.myProducts.length; i++ ) {
      const index = this.myProducts[i].id;
      this.productService.delBasketsProducts(index).subscribe(() => {
        this.getBasketProduct();
      });
    }
    this.order = null;
    this.confirmModalTrue = false;
    this.goHomeTrue = true;
  }
  public modalSuccesTrue(): void {
    if ((this.order.firstName === '' || undefined)
    || (this.order.secondName === '' || undefined) || (this.order.address === undefined || '')) {
      this.modalTrue = true;
    } else {
    this.modalSuccess = true;
    this.confirmModalTrue = true;
    }
  }
  public clickModal(): void {
    this.modalTrue = false;
  }
  public modalSuccessFalse(): void {
    this.modalSuccess = false;
  }
}
