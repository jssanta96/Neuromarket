import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { ProductListComponent } from './views/product-list/product-list.component';
import { ProductDetailComponent } from './views/product-detail/product-detail.component';
import { StoreComponent } from './views/store/store.component';
import { CartComponent } from './views/cart/cart.component';
import { PurchaseListComponent } from './views/purchase-list/purchase-list.component';
import { PurchaseDetailComponent } from './views/purchase-detail/purchase-detail.component';
import { SaleListComponent } from './views/sale-list/sale-list.component';
import { PaymentComponent } from './views/payment/payment.component';
import { RegisterProductComponent } from './views/register-product/register-product.component'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent, },
  { path: 'purchase-detail/:id', component: PurchaseDetailComponent, },
  { path: 'product-list', component: ProductListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'store', component: StoreComponent },
  { path: 'purchase', component: PurchaseListComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'sale', component: SaleListComponent },
  { path: 'register-product', component: RegisterProductComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {};