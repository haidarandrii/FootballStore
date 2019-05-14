import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { PublicComponent } from './public.component';
import { CabinetComponent } from './components/cabinet/cabinet.component';


const routes: Routes = [
  { path: '', component: PublicComponent, children: [
    { path: '', component: HomeComponent},
    { path: 'about-us', component: AboutComponent},
    { path: 'cabinet', component: CabinetComponent},
    { path: 'contact', component: ContactComponent},
    // { path: '**', redirectTo: '', pathMatch: 'full'}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
