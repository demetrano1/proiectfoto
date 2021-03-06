import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [{
  path: '',
  component: DashboardComponent
}, {
  path: 'categories',
  component: CategoriesComponent
}, {
  path: 'categories/:categoryId',
  component: CategoryDetailsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
