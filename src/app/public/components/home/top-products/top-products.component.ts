import { Component } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { AppState } from 'src/app/redux/app.state';
import { Store } from '@ngrx/store';
import { IProduct } from 'src/app/shared/interfaces/product';
import { StartLoadProduct, SuccessLoadProduct, FailedLoadProduct } from 'src/app/redux/Actions/product.actions';
import { StartLoadBasketProduct, SuccessLoadBaskerProduct, FailedLoadBasketProduct } from 'src/app/redux/Actions/basket.product.actions';
import { BasketServiceService } from 'src/app/shared/services/basket-service.service';
import { QUANTITY_TOP_PRODUCT } from '../../const';

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.scss']
})
export class TopProductsComponent {
  constructor(
    private productService: ProductService,
    private store: Store<AppState>,
    private basketService: BasketServiceService) {
      this.getProduct();
      this.getBasketProduct();
  }
  loader: boolean;
  products: Array<IProduct>;
  basketProduct: Array<IProduct> = [];
  filterProduct: Array<IProduct> = [];
  public getProduct(): void {
    this.store.dispatch(new StartLoadProduct());
    this.productService.getJsonProduct().subscribe(
      data => {
        this.store.dispatch(new SuccessLoadProduct(data));
        this.store.select('productPage').subscribe(data => {
          this.products = data.products;
          this.filteredProducts();
        });
      },
      err => {
        this.store.dispatch(new FailedLoadProduct(err));
      }
    );
  }
  public filteredProducts(): void {
    const numArray = [];
    for (let i = 0; i < QUANTITY_TOP_PRODUCT; i++) {
      const num = Math.floor(Math.random() * this.products.length);
      if (!numArray.some(elem => elem === num)) {
        numArray.push(num);
        this.filterProduct.push(this.products[num]);
      } else {
        i--;
      }
    }
  }
  public getBasketProduct(): void {
    this.store.dispatch(new StartLoadBasketProduct());
    this.basketService.getBasketProduct().subscribe(
      data => {
        this.store.dispatch(new SuccessLoadBaskerProduct(data));
        this.store.select('basketProductPage').subscribe(d => this.basketProduct = d.basketProduct);
      },
      err => {
        this.store.dispatch(new FailedLoadBasketProduct(err));
      }
    );
  }
  public addToBasket(product: IProduct): void {
    this.basketService.addBasketProducts(product).subscribe(
      () => this.getBasketProduct(),
    );
  }
  public existInBasket(product: IProduct): boolean {
    return this.basketProduct.some(basketProduct => product.id === basketProduct.id);
  }
}
