import { Component, OnInit } from '@angular/core';
import { ViewService } from 'src/app/store/services/view.service';
import { IProduct } from 'src/app/shared/interfaces/product';
import { StartLoadProduct, SuccessLoadProduct, FailedLoadProduct } from 'src/app/redux/Actions/product.actions';
import { StartLoadBasketProduct, SuccessLoadBaskerProduct, FailedLoadBasketProduct } from 'src/app/redux/Actions/basket.product.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { ProductService } from 'src/app/shared/services/product.service';
import { BasketServiceService } from 'src/app/shared/services/basket-service.service';
import { PRODUCTS_ON_ONE_PAGE } from 'src/app/store/shared/const';

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
    private productService: ProductService,
    private basketService: BasketServiceService,
    ) {
      this.store.select('filterCategoryPage').subscribe(data => this.selectValue = data.priceFilter);
      this.store.select('filterCategoryPage').subscribe(data => this.arrayCategoryFilterCheckbox = data.categories);
      this.store.select('filterCategoryPage').subscribe(data => this.arrayBrandsFilterCheckbox = data.brands);
      this.store.select('filterCategoryPage').subscribe(data => this.imageCategoryFilter = data.imageCategory);
      this.store.select('filterCategoryPage').subscribe(data => {
        this.filterValue = data.valueInput;
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
    this.currentNumberPage = 1;
  }
  public addToBasket(product: IProduct): void {
    this.basketService.addBasketProducts(product).subscribe(() => {
      this.getBasketProduct();
      this.store.dispatch(new SuccessLoadBaskerProduct(this.basketProduct));
    });
  }
  public getProducts(): void {
    this.store.dispatch(new StartLoadProduct());
    this.productService.getJsonProduct().subscribe(
      data => {
        this.store.dispatch(new SuccessLoadProduct(data));
        this.store.select('productPage').subscribe(data => {
          this.products = data.products;
          this.filteredProduct = data.products;
        });
      },
      err => {
        this.store.dispatch(new FailedLoadProduct(err));
      }
    );
  }
  public getBasketProduct(): void {
    this.store.dispatch(new StartLoadBasketProduct());
    this.basketService.getBasketProduct().subscribe(
      data => {
        this.store.dispatch(new SuccessLoadBaskerProduct(data));
        this.store.select('basketProductPage').subscribe(data => {
          this.basketProduct = data.basketProduct;
        });
      },
      err => {
        this.store.dispatch(new FailedLoadBasketProduct(err));
      }
    );
  }
  public existInBasket(currentProduct: IProduct): boolean {
    return this.basketProduct.some(product => product.id === currentProduct.id);
  }
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
    return Math.ceil(this.viewService.arrayProductLength / PRODUCTS_ON_ONE_PAGE);
  }
}
