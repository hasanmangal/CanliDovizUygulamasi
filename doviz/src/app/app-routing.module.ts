import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { Page1Component } from './pages/page1/page1.component';

const routes: Routes = [

  {
    path:'home' ,component:Page1Component
  },

  { path: '', redirectTo:'home', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
