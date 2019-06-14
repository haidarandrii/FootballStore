import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppongCartComponent } from './components/shoppong-cart/shoppong-cart.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreComponent } from './store.component';
import { StoreRoutingModule } from './store-routing.module';
import { MoneyPipe } from '../shared/pipes/filter.money/money.pipe';
import { FiltrProductPipe } from '../shared/pipes/filter.product/filtr-product.pipe';
import { FormsModule } from '@angular/forms';
import { StoreInfoComponent } from './components/store/storeinfo.component';
import { ViewComponent } from './components/view/view.component';
import { CheckboxCatPipe } from './shared/pipes/checkbox-cat.pipe';
import { CategoryImagePipe } from './shared/pipes/category-image.pipe';
import { PaginationPipe } from './shared/pipes/pagination.pipe';
import { CategoriesComponent } from './components/store/categories/categories.component';
import { ProductsComponent } from './components/store/products/products.component';
import { FiltersComponent } from './components/store/filters/filters.component';
import { SearchFilterComponent } from './components/store/search-filter/search-filter.component';
import { FormaShoppingCartComponent } from './components/shoppong-cart/forma-shopping-cart/forma-shopping-cart.component';
import { GoodsComponent } from './components/shoppong-cart/goods/goods.component';

@NgModule({
  declarations: [
    ShoppongCartComponent,
    StoreComponent,
    MoneyPipe,
    FiltrProductPipe,
    StoreInfoComponent,
    ViewComponent,
    CheckboxCatPipe,
    CategoryImagePipe,
    PaginationPipe,
    CategoriesComponent,
    ProductsComponent,
    FiltersComponent,
    SearchFilterComponent,
    FormaShoppingCartComponent,
    GoodsComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreRoutingModule,
    FormsModule,
  ]
})
export class StoreeModule { }
