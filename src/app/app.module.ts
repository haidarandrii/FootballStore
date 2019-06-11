import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PublicModule,
    StoreeModule,
    AdminModule,
    StoreModule.forRoot({registerPage: registerReducer, productPage: productReducer, basketProductPage: basketProductReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
