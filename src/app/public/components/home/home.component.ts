import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { IProduct } from 'src/app/shared/interfaces/product';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { StartLoadProduct, SuccessLoadProduct, FailedLoadProduct } from 'src/app/redux/Actions/product.actions';
import { StartLoadBasketProduct } from 'src/app/redux/Actions/basket.product.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private store: Store<AppState>) {
      // this.store.select('productPage').subscribe(d => {
      //   this.products = d.products;
      //   console.log(d.products);
      //   this.filteredProducts();
      // });
      this.getProduct();
      this.getBasketProduct();
  }
  products: Array<IProduct>;
  basketProduct: Array<IProduct> = [];
  filterProduct: Array<IProduct> = [];
  ngOnInit() {
  }
  public getProduct(): void {
    this.store.dispatch(new StartLoadProduct());
    this.store.select('productPage').subscribe(d => console.log(d));
    this.productService.getJsonProduct().subscribe(
      data => {
        // this.products = data;
        this.store.dispatch(new SuccessLoadProduct(data));
        this.store.select('productPage').subscribe(d => {
          this.products = d.products;
          this.filteredProducts();
        });
      },
      err => {
        this.store.dispatch(new FailedLoadProduct(err));
      }
    );
  }
  public filteredProducts(): void {
    const array: Array<number> = [];
    for (let i = 0; i < 4; i++) {
      let count = 0;
      const num = Math.floor(Math.random() * this.products.length);
      if (this.products[num] === undefined) {
        i--;
      } else if (array.length === 0) {
        this.filterProduct.push(this.products[num]);
        array[i] = num;
      } else if (array.length > 0) {
        // tslint:disable-next-line:prefer-for-of
        for (let q = 0; q < array.length; q++) {
          if (num === array[q]) {
            count++;
          }
        }
        if (count > 0) {
          i--;
        } else {
          this.filterProduct.push(this.products[num]);
          array[i] = num;
        }

      }
    }
  }
  public getBasketProduct(): void {
    this.store.dispatch(new StartLoadBasketProduct());
    this.store.select('basketProductPage').subscribe(d => console.log(d.loading));
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
  public existInBasket(product: IProduct): boolean {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.basketProduct.length; i++) {
      if (product.id === this.basketProduct[i].id) {
        return true;
      }
    }
    return false;
  }
}
