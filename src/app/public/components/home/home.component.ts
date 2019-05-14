import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { IProduct } from 'src/app/shared/interfaces/product';
import { Product } from 'src/app/shared/clases/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private productService: ProductService) {
    this.getProduct();
    this.getBasketProduct();
  }
  products: Array<IProduct>;
  basketProduct: Array<IProduct> = [];
  filterProduct: Array<IProduct> = [];
  ngOnInit() {
  }
  private getProduct(): void {
    this.productService.getJsonProduct().subscribe(
      data => {
        this.products = data;
        this.filteredProducts();
      },
      err => {
        console.log(err);
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
