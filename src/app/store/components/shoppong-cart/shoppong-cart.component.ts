import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { IProduct } from 'src/app/shared/interfaces/product';
import { OrderAdminService } from 'src/app/shared/services/order-admin.service';
import { Order } from 'src/app/shared/clases/order';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { StartLoadBasketProduct, SuccessLoadBaskerProduct, FailedLoadBasketProduct } from 'src/app/redux/Actions/basket.product.actions';

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
  constructor(
    private productService: ProductService,
    private orderAdminService: OrderAdminService,
    private store: Store<AppState>
    ) {
      this.store.select('registerPage').subscribe(d => {
        this.firstName = d.currentUser.firstName,
        this.secondName = d.currentUser.secondName;
      });
    }
  ngOnInit() {
    this.getBasketProduct();
    // this.getCurrentUser();
  }
  // public getCurrentUser(): void {
  //   if (this.userService.currentUser !== undefined) {
  //     this.firstName = this.userService.currentUser.firstName;
  //     this.secondName = this.userService.currentUser.secondName;
  //   }
  // }
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
  public delProductBasket(product: IProduct): void {
    const id = product.id;
    this.productService.delBasketsProducts(id).subscribe(() => {
      this.getBasketProduct();
    });
  }
  public clickModal(): void {
    this.modalTrue = false;
  }
  public modalSuccessFalse(): void {
    this.modalSuccess = false;
  }
  public modalSuccesTrue(): void {
    if ((this.firstName === null || undefined) || (this.secondName === null || undefined) || (this.address === undefined || null)) {
      this.modalTrue = true;
    } else {
    this.modalSuccess = true;
    this.confirmModalTrue = true;
    }
  }
  public confirm(): void {
      // tslint:disable-next-line:max-line-length
      this.orderAdminService.addJsonOrderProduct(new Order(this.myProducts, this.firstName, this.secondName, this.address, 'created')).subscribe();
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.myProducts.length; i++ ) {
        const index = this.myProducts[i].id;
        this.productService.delBasketsProducts(index).subscribe(() => {
          this.getBasketProduct();
        });
      }
      this.firstName = null;
      this.secondName = null;
      this.address = null;
      this.confirmModalTrue = false;
      this.goHomeTrue = true;
    }
  public fullPrice(): number {
    let result = 0;
    // tslint:disable-next-line:prefer-for-of
    // for (let i = 0; i < this.myProducts.length; i++) {
    //   result += this.myProducts[i].price;
    // }
    this.myProducts.reduce(a => {
      result += a.price;
      return a;
    });
    return result;
  }

}