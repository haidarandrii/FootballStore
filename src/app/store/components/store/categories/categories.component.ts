import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/store/shared/interface/ICategory';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { StartLoadCategories, SuccessLoadCategories, FailedLoadCategories } from 'src/app/redux/Actions/get.categories.actions';
import { AddImageCategory } from 'src/app/redux/Actions/filterCategory.action';
import { CategoryServiceService } from 'src/app/shared/services/category-service.service';

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
    private categoryService: CategoryServiceService,
    ) {
      this.getCategories();
    }

  ngOnInit() {
  }
  public getCategories(): void {
    this.store.dispatch(new StartLoadCategories());
    this.categoryService.getJsonCategory().subscribe(
      data => {
        this.store.dispatch(new SuccessLoadCategories(data));
        this.store.select('getCategoriesPage').subscribe(data => {
          this.categories = data.categories;
          this.loader = data.loading;
        });
      },
      err => {
        this.store.dispatch(new FailedLoadCategories(err));
      }
    );
  }
  public clickOnCategory(category: string): void {
    this.store.dispatch(new AddImageCategory(category));
  }

}
