import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicModule } from './public/public.module';
import { StoreeModule } from './store/store.module';
import { AdminModule } from './admin/admin.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { registerReducer } from './redux/Reducers/register.reducer';
import { productReducer } from './redux/Reducers/product.reducer';
import { basketProductReducer } from './redux/Reducers/basket.product.reducer';
import { deleteBasketProductReducer } from './redux/Reducers/delete.basket.product.reducer';
import { getBrandsReducer } from './redux/Reducers/get.brands.reducer';
import { getCategoriesReducer } from './redux/Reducers/get.categories.reducer';
import { DateInputsModule, CalendarModule } from '@progress/kendo-angular-dateinputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { addCategoryReducer } from './redux/Reducers/filterCategory.reducer';
import { addBasketReducer } from './redux/Reducers/basket.reducer';
import { SingComponent } from './sing/sing.component';
import { RegistrationComponent } from './registration/registration.component';




@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SingComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PublicModule,
    StoreeModule,
    AdminModule,
    StoreModule.forRoot({registerPage: registerReducer,
      productPage: productReducer,
      basketProductPage: basketProductReducer,
      deleteBasketProductPage: deleteBasketProductReducer,
      getBrandsPage: getBrandsReducer,
      getCategoriesPage: getCategoriesReducer,
      filterCategoryPage: addCategoryReducer,
      basketPage: addBasketReducer}),
    DateInputsModule,
    BrowserAnimationsModule,
    CalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
