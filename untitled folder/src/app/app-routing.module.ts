import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'store', redirectTo: 'store', pathMatch: 'full' },
  { path: 'admin', redirectTo: 'admin', pathMatch: 'full' },
  { path: '', redirectTo: 'public', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
