import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBrandComponent } from './admin-brand/admin-brand.component';
import { AdminComponent } from './admin.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { HistoryComponent } from './history/history.component';
import { QuestionsComponent } from './questions/questions.component';
import { OrderStatusPipe } from './shared/pipes/order-status.pipe';
import { FormAddBrandComponent } from './admin-brand/form-add-brand/form-add-brand.component';
import { TableBrandComponent } from './admin-brand/table-brand/table-brand.component';
import { FormAddCategoryComponent } from './admin-category/form-add-category/form-add-category.component';
import { TableCategoryComponent } from './admin-category/table-category/table-category.component';
import { ProductFormComponent } from './admin-product/product-form/product-form.component';
import { TableProductsComponent } from './admin-product/table-products/table-products.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminBrandComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminOrderComponent,
    HistoryComponent,
    QuestionsComponent,
    OrderStatusPipe,
    FormAddBrandComponent,
    TableBrandComponent,
    FormAddCategoryComponent,
    TableCategoryComponent,
    ProductFormComponent,
    TableProductsComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
