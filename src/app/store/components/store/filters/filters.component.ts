import { Component, OnInit } from '@angular/core';
import { StartLoadBrands, SuccessLoadBrands, FailedLoadBrands } from 'src/app/redux/Actions/get.brands.action';
import { ProductService } from 'src/app/shared/services/product.service';
import { Store } from '@ngrx/store';
import { AppState } from 'untitled folder/src/app/redux/app.state';
import { IBrand } from 'src/app/store/shared/interface/IBrand';
import { IProduct } from 'src/app/shared/interfaces/product';
import { StartLoadCategories, SuccessLoadCategories } from 'src/app/redux/Actions/get.categories.actions';
import { ICategory } from 'untitled folder/src/app/store/shared/interface/ICategory';
import { FailedLoadCategories } from 'untitled folder/src/app/redux/Actions/get.categories.actions';
import { AddCategory, AddBrand, PriceFilter } from 'src/app/redux/Actions/filterCategory.action';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  brands: Array<IBrand>;
  selectValue = 'DOLLAR';
  brandsArray: Array<string> = [];
  filteredProduct: Array<IProduct> = [];
  arrayCategory: Array<string> = [];
  arrayBrands: Array<string> = [];
  currentNumberPage = 1;
  hideCategoryFilter = true;
  categories: ICategory[];
  constructor(
    private productService: ProductService,
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.getBrands();
    this.getCategories();
  }
  public changePriceFilter(): void {
    this.store.dispatch(new PriceFilter(this.selectValue));
  }
  public filterCheckboxCategory(newCategory: string): void {
    const foundIndex = this.arrayCategory.findIndex(category => category === newCategory);
    if (foundIndex === -1) {
      this.arrayCategory.push(newCategory);
    } else {
      this.arrayCategory.splice(foundIndex, 1);
    }
    this.store.dispatch(new AddCategory(this.arrayCategory));
  }
  public filterCheckboxBrands(newBrand: string) {
    this.currentNumberPage = 1;
    const foundIndex = this.arrayBrands.findIndex(brand => brand === newBrand);
    if (foundIndex === -1) {
      this.arrayBrands.push(newBrand);
    } else {
      this.arrayBrands.splice(foundIndex, 1);
    }
    console.log(this.arrayBrands);
    this.store.dispatch(new AddBrand(this.arrayBrands));
    this.store.select('filterCategoryPage').subscribe(d => console.log(d.brands));
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
  public getCategories(): void {
    this.store.dispatch(new StartLoadCategories());
    this.productService.getJsonCategory().subscribe(
      data => {
        this.store.dispatch(new SuccessLoadCategories(data));
        this.store.select('getCategoriesPage').subscribe(d => {
          this.categories = d.categories;
          // this.loader = d.loading;
        });

      },
      err => {
        this.store.dispatch(new FailedLoadCategories(err));
      }
    );
  }

}
