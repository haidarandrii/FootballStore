import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store.component';
import { ShoppongCartComponent } from './components/shoppong-cart/shoppong-cart.component';
import { StoreInfoComponent } from 'src/app/store/components/store/storeinfo.component';
import { ViewComponent } from './components/view/view.component';



const routes: Routes = [
  { path: 'store', component: StoreComponent, children: [
    { path: '', component: StoreInfoComponent },
    { path: 'shopping-cart', component: ShoppongCartComponent },
    { path: ':id', component: ViewComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
