import { Injectable } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { StartLoadCategories, SuccessLoadCategories, FailedLoadCategories } from 'src/app/redux/Actions/get.categories.actions';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private productService: ProductService,
    private store: Store<AppState>
    ) { }
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
}
