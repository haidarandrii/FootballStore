import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { IProduct } from 'src/app/shared/interfaces/product';
import { OrderAdminService } from 'src/app/shared/services/order-admin.service';
import { Order } from 'src/app/shared/clases/order';
import { Product } from 'src/app/shared/clases/product';
import { UserService } from 'src/app/shared/services/user.service';

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
    private userService: UserService,
    ) { }

  ngOnInit() {
    this.getBasketProduct();
    this.getCurrentUser();
  }
  public getCurrentUser(): void {
    if (this.userService.currentUser != undefined) {
      this.firstName = this.userService.currentUser.firstName;
      this.secondName = this.userService.currentUser.secondName;
    }
  }
  public getBasketProduct(): void {
    this.productService.getBasketProduct().subscribe(
      data => {
        this.myProducts = data;
      },
      err => {
        console.log(err);
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
    this.myProducts.reduce(function(a) {
      result += a.price;
      return a;
    })
    return result;
  }

}
