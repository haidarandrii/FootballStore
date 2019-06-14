import { Component, OnInit } from '@angular/core';
import { StartLoadBasketProduct, SuccessLoadBaskerProduct, FailedLoadBasketProduct } from 'src/app/redux/Actions/basket.product.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { ProductService } from 'src/app/shared/services/product.service';
import { IProduct } from 'src/app/shared/interfaces/product';
import { StartDeleteBasketProduct, SuccessDeleteBasketProduct } from 'src/app/redux/Actions/delete.basket.product.actions';
import { OrderAdminService } from 'untitled folder/src/app/shared/services/order-admin.service';
import { Order } from 'src/app/shared/clases/order';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})
export class GoodsComponent implements OnInit {
  myProducts: Array<IProduct>;
  loader = false;
  constructor(
    private store: Store<AppState>,
    private productService: ProductService,
    private orderAdminService: OrderAdminService,
    ) { }

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
  public delProductBasket(product: IProduct): void {
    const id = product.id;
    this.store.dispatch(new StartDeleteBasketProduct());
    this.productService.delBasketsProducts(id).subscribe(() => {
      this.getBasketProduct();
      this.store.dispatch(new SuccessDeleteBasketProduct());
      this.store.select('deleteBasketProductPage').subscribe(d => this.loader = d.loading);
    });
  }
  // public confirm(): void {
  //   this.orderAdminService.addJsonOrderProduct(new Order(this.myProducts,
  //     this.firstName, this.secondName, this.address, 'created')).subscribe();
  //     // tslint:disable-next-line:prefer-for-of
  //   for (let i = 0; i < this.myProducts.length; i++ ) {
  //     const index = this.myProducts[i].id;
  //     this.productService.delBasketsProducts(index).subscribe(() => {
  //       this.getBasketProduct();
  //     });
  //   }
  //   this.firstName = null;
  //   this.secondName = null;
  //   this.address = null;
  //   this.confirmModalTrue = false;
  //   this.goHomeTrue = true;
  // }
  public fullPrice(): number {
    const result = this.myProducts.reduce((acum, a) => {
      return acum + a.price;
    }, 0);
    return result;
  }
  // public modalSuccesTrue(): void {
  //   if ((this.firstName === null || undefined)
  //   || (this.secondName === null || undefined) || (this.address === undefined || null)) {
  //     this.modalTrue = true;
  //   } else {
  //   this.modalSuccess = true;
  //   this.confirmModalTrue = true;
  //   }
  // }
  // public clickModal(): void {
  //   this.modalTrue = false;
  // }
  // public modalSuccessFalse(): void {
  //   this.modalSuccess = false;
  // }
}
