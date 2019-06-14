import { Component, OnInit } from '@angular/core';
import { ViewService } from 'src/app/store/services/view.service';
import { IProduct } from 'src/app/shared/interfaces/product';
import { StartLoadProduct, SuccessLoadProduct, FailedLoadProduct } from 'src/app/redux/Actions/product.actions';
import { StartLoadBasketProduct, SuccessLoadBaskerProduct, FailedLoadBasketProduct } from 'src/app/redux/Actions/basket.product.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { ProductService } from 'untitled folder/src/app/shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  arrayCategoryFilterCheckbox: Array<string>;
  arrayBrandsFilterCheckbox: Array<string>;
  imageCategoryFilter: string;
  currentNumberPage = 1;
  basketProduct: Array<IProduct> = [];
  products: IProduct[] = [];
  filteredProduct: IProduct[];
  selectValue = 'DOLLAR';
  filterValue;
  constructor(
    private viewService: ViewService,
    private store: Store<AppState>,
    private productService: ProductService
    ) {
      this.store.select('filterCategoryPage').subscribe(d => this.selectValue = d.priceFilter);
      this.store.select('filterCategoryPage').subscribe(d =>  {
        this.arrayCategoryFilterCheckbox = d.categories;
      });
      this.store.select('filterCategoryPage').subscribe(d => {
        this.arrayBrandsFilterCheckbox = d.brands;
      });
      this.store.select('filterCategoryPage').subscribe(d => {
        this.imageCategoryFilter = d.imageCategory;
      });
      this.store.select('filterCategoryPage').subscribe(d => {
        this.filterValue = d.valueInput;
        this.onFilter();
      });
    }

  ngOnInit() {
    this.getBasketProduct();
    this.getProducts();
  }
  public onFilter = () => {
    this.filteredProduct = this.products.filter(({ name }) =>
      name.toLowerCase().includes(this.filterValue.toLowerCase())
    );
    console.log(this.filteredProduct);
    this.currentNumberPage = 1;
  }
  public addToBasket(product: IProduct): void {
    this.productService.addBasketProducts(product).subscribe(
      () => this.getBasketProduct(),
    );
  }
  public getProducts(): void {
    this.store.dispatch(new StartLoadProduct());
    this.productService.getJsonProduct().subscribe(
      data => {
        this.store.dispatch(new SuccessLoadProduct(data));
        this.store.select('productPage').subscribe(d => {
          this.products = d.products;
          // this.loader = d.loading;
          this.filteredProduct = d.products;
        });
      },
      err => {
        this.store.dispatch(new FailedLoadProduct(err));
      }
    );
  }
  public getBasketProduct(): void {
    this.store.dispatch(new StartLoadBasketProduct());
    this.productService.getBasketProduct().subscribe(
      data => {
        this.store.dispatch(new SuccessLoadBaskerProduct(data));
        this.store.select('basketProductPage').subscribe(d => {
          this.basketProduct = d.basketProduct;
          // this.loader = d.loading;
        });
      },
      err => {
        this.store.dispatch(new FailedLoadBasketProduct(err));
      }
    );
  }
  public existInBasket(currentProduct: IProduct): boolean {
    this.basketCounter();
    return this.basketProduct.some(product => product.id === currentProduct.id);
  }
// PAGINATION
public previous(): void {
  this.currentNumberPage --;
  this.toTop();
}
public next(): void {
  this.currentNumberPage ++;
  this.toTop();
}
public last(): void {
  this.currentNumberPage = this.maxNumPage();
  this.toTop();
}
public first(): void {
  this.currentNumberPage = 1;
  this.toTop();
}
public toTop(): void {
  const titleTop = document.getElementById('toTop').offsetTop;
  window.scrollTo({
    top: titleTop - 100,
    behavior: 'smooth'
});
}
public maxNumPage(): number {
  return Math.ceil(this.viewService.arrayProductLength / 10);
}
public basketCounter(): void {
  this.productService.countBasket = this.basketProduct.length;
}
}
