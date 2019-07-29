import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { CategoryComponent } from './views/category/category.component';
import { OfferComponent } from './views/offer/offer.component';
import { LoginComponent } from './views/login/login.component';
import { ProductComponent } from './views/product/product.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'offer', component: OfferComponent },
  { path: 'product', component: ProductComponent},
  { path: 'login', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {};