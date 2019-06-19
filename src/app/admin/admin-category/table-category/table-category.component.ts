import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/store/shared/interface/ICategory';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { CategoryServiceService } from 'src/app/shared/services/category-service.service';

@Component({
  selector: 'app-table-category',
  templateUrl: './table-category.component.html',
  styleUrls: ['./table-category.component.scss']
})
export class TableCategoryComponent implements OnInit {
  categories: ICategory[];
  category: ICategory;
  constructor(
    private categoryService: CategoryServiceService,
    private store: Store<AppState>,
  ) {
    this.store.select('adminPage').subscribe(data => {
      this.category = data.addCategory;
      this.getCategory();
    });
  }

  ngOnInit() {
    this.getCategory();
  }
  public getCategory(): void {
    this.categoryService.getJsonCategory().subscribe(
      data => {
        this.categories = data;
      }
    );
  }
}
