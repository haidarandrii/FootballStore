import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminBrandComponent } from './admin-brand/admin-brand.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { HistoryComponent } from './history/history.component';
import { QuestionsComponent } from './questions/questions.component';



const routes: Routes = [
  { path: 'admin', component: AdminComponent, children: [
    { path: 'brand', component: AdminBrandComponent },
    { path: 'category', component: AdminCategoryComponent },
    { path: 'product', component: AdminProductComponent },
    { path: 'order', component: AdminOrderComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'questions', component: QuestionsComponent },
    { path: '**', component: AdminOrderComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
