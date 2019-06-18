import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/store/shared/interface/ICategory';
import { ProductService } from 'src/app/shared/services/product.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';

@Component({
  selector: 'app-table-category',
  templateUrl: './table-category.component.html',
  styleUrls: ['./table-category.component.scss']
})
export class TableCategoryComponent implements OnInit {
  categories: ICategory[];
  category: ICategory;
  constructor(
    private productService: ProductService,
    private store: Store<AppState>
  ) {
    this.store.select('adminPage').subscribe(d => {
      this.category = d.addCategory;
      this.getCategory();
    });
  }

  ngOnInit() {
    this.getCategory();
  }
  public getCategory(): void {
    this.productService.getJsonCategory().subscribe(
      data => {
        this.categories = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
