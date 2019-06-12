import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { IProduct } from 'src/app/shared/interfaces/product';
import { ICategory } from '../../shared/interface/ICategory';
import { IBrand } from '../../shared/interface/IBrand';
import { ViewService } from '../../services/view.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { SuccessLoadProduct, StartLoadProduct, FailedLoadProduct } from 'src/app/redux/Actions/product.actions';
import { StartLoadBasketProduct, SuccessLoadBaskerProduct, FailedLoadBasketProduct } from 'src/app/redux/Actions/basket.product.actions';
import { StartLoadBrands, SuccessLoadBrands, FailedLoadBrands } from 'src/app/redux/Actions/get.brands.action';
import { StartLoadCategories, SuccessLoadCategories, FailedLoadCategories } from 'src/app/redux/Actions/get.categories.actions';

@Component({
  selector: 'app-storeinfo',
  templateUrl: './storeinfo.component.html',
  styleUrls: ['./storeinfo.component.scss']
})
export class StoreInfoComponent implements OnInit {
  products: Array<IProduct>;
  categories: Array<ICategory>;
  brands: Array<IBrand>;
  selectValue = 'DOLLAR';
  brandsArray: Array<string> = [];
  filteredProduct: Array<IProduct> = [];
  shoppingCart: Array<IProduct> = [];
  viewProduct: IProduct;
  showSearch = false;
  arrayCategory: Array<string> = [];
  arrayBrands: Array<string> = [];
  basketProduct: Array<IProduct> = [];
  hideCategoryFilter = true;
  imageCategory: string;
  countBasket: number;
  maxNumberPage: number;
  currentNumberPage: number;
  loader = false;
  constructor(
    private productService: ProductService,
    private viewService: ViewService,
    private store: Store<AppState>,
  ) {
    this.currentNumberPage = 1;
  }
  ngOnInit() {
    this.getProducts();
    this.getCategories();
    this.getBrands();
  }
  public clickOnCategory(category: string): void {
    this.currentNumberPage = 1;
    this.arrayCategory = [];
    this.hideCategoryFilter = false;
    this.imageCategory = category;
    this.toTop();
  }
  public basketCounter(): void {
    this.productService.countBasket = this.basketProduct.length;
  }
  public filterCheckboxCategory(newCategory: string): void {
    this.currentNumberPage = 1;
    const foundIndex = this.arrayCategory.findIndex(category => category === newCategory);
    if (foundIndex === -1) {
      this.arrayCategory.push(newCategory);
    } else {
      this.arrayCategory.splice(foundIndex, 1);
    }
    this.getProducts();
  }
  public filterCheckboxBrands(newBrand: string) {
    this.currentNumberPage = 1;
    const foundIndex = this.arrayBrands.findIndex(brand => brand === newBrand);
    if (foundIndex === -1) {
      this.arrayBrands.push(newBrand);
    } else {
      this.arrayBrands.splice(foundIndex, 1);
    }
    this.getProducts();
  }

  public addToBasket(product: IProduct): void {
    this.productService.addBasketProducts(product).subscribe(
      () => this.getBasketProduct(),
    );
  }
  public onFilter = (value) => {
    this.filteredProduct = this.products.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );
    this.currentNumberPage = 1;
  }
  public getProducts(): void {
    this.store.dispatch(new StartLoadProduct());
    this.productService.getJsonProduct().subscribe(
      data => {
        // this.products = data;
        this.store.dispatch(new SuccessLoadProduct(data));
        this.store.select('productPage').subscribe(d => {
          this.products = d.products;
          this.loader = d.loading;
          this.filteredProduct = d.products;
          console.log(d);
        });
      },
      err => {
        this.store.dispatch(new FailedLoadProduct(err));
      }
    );
  }

  public getCategories(): void {
    this.store.dispatch(new StartLoadCategories());
    this.productService.getJsonCategory().subscribe(
      data => {
        this.store.dispatch(new SuccessLoadCategories(data));
        this.store.select('getCategoriesPage').subscribe(d => {
          this.categories = d.categories;
          this.loader = d.loading;
        });

      },
      err => {
        this.store.dispatch(new FailedLoadCategories(err));
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
          this.loader = d.loading;
        });
        console.log(this.basketProduct);
      },
      err => {
        this.store.dispatch(new FailedLoadBasketProduct(err));
      }
    );
  }
  public getBrands(): void {
    this.store.dispatch(new StartLoadBrands());
    this.productService.getJsonBrands().subscribe(
      data => {
        this.store.dispatch(new SuccessLoadBrands(data));
        this.store.select('getBrandsPage').subscribe(d => this.brands = d.brands);
      },
      err => {
        this.store.dispatch(new FailedLoadBrands(err));
      }
    );
  }
  public clickSearch(): void {
    this.showSearch = !this.showSearch;
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
    const titleTop = document.getElementById('title').offsetTop;
    window.scrollTo({
      top: titleTop - 100,
      behavior: 'smooth'
  });
  }
  public maxNumPage(): number {
    return Math.ceil(this.viewService.arrayProductLength / 10);
  }
}
