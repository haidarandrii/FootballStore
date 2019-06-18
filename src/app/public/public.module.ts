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
import { PhotoComponent } from './components/home/photo/photo.component';
import { TopProductsComponent } from './components/home/top-products/top-products.component';
import { BrandsComponent } from './components/home/brands/brands.component';
import { QuestionComponent } from './components/contact/question/question.component';
import { SocialComponent } from './components/contact/social/social.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PublicComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    NotFoundComponent,
    CabinetComponent,
    PhotoComponent,
    TopProductsComponent,
    BrandsComponent,
    QuestionComponent,
    SocialComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PublicRoutingModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [
    ProductService,
  ]
})
export class PublicModule { }
