import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBrandComponent } from './admin-brand/admin-brand.component';
import { AdminComponent } from './admin.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { FormsModule } from '@angular/forms';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { HistoryComponent } from './history/history.component';
import { QuestionsComponent } from './questions/questions.component';
import { OrderStatusPipe } from './shared/pipes/order-status.pipe';

@NgModule({
  declarations: [
    AdminComponent,
    AdminBrandComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminOrderComponent,
    HistoryComponent,
    QuestionsComponent,
    OrderStatusPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
