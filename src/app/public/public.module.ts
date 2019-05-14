import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public-routing.module';
import { ProductService } from '../shared/services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { CabinetComponent } from './components/cabinet/cabinet.component';



@NgModule({
  declarations: [
    PublicComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    NotFoundComponent,
    CabinetComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PublicRoutingModule,
    HttpClientModule,

  ],
  providers: [
    ProductService,
  ]
})
export class PublicModule { }
