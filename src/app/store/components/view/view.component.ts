import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../services/view.service';
import { IProduct } from 'src/app/shared/interfaces/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/clases/product';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  viewProduct: IProduct;
  productId: number;
  basketProduct: Array<IProduct> = [];
  constructor(
    private viewService: ViewService,
    private productService: ProductService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProducts();
    this.getBasketProduct();
  }
  public getProducts(): void {
    this.viewService.getJsonProduct(this.productId).subscribe(
      data => {
        this.viewProduct = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  public getBasketProduct(): void {
    this.productService.getBasketProduct().subscribe(
      data => {
        this.basketProduct = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  public addToBasket(product: IProduct): void {
    this.productService.addBasketProducts(product).subscribe(
      () => this.getBasketProduct(),
    );
  }
  public existInBasket(): boolean {
    if (!this.viewProduct) {
      return false;
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.basketProduct.length; i++) {
      if (this.viewProduct.id === this.basketProduct[i].id) {
        return true;
      }
    }
    return false;
  }
}
