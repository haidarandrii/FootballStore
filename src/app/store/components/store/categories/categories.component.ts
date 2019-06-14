import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/store/shared/interface/ICategory';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { ProductService } from 'src/app/shared/services/product.service';
import { StartLoadCategories, SuccessLoadCategories, FailedLoadCategories } from 'src/app/redux/Actions/get.categories.actions';
import { AddImageCategory } from 'src/app/redux/Actions/filterCategory.action';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Array<ICategory>;
  loader = false;
  imageCategory: string;
  constructor(
    private store: Store<AppState>,
    private productService: ProductService, ) {
      this.getCategories();
    }

  ngOnInit() {
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
  public clickOnCategory(category: string): void {
    this.store.dispatch(new AddImageCategory(category));
    // this.currentNumberPage = 1;
    // this.arrayCategory = [];
    // this.hideCategoryFilter = false;
    // this.imageCategory = category;
    // this.toTop();
  }

}
