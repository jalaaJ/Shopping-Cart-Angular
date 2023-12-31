import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { authGuard } from './guards/auth.guard';
import { CustomReuseStrategy } from './reuse-strategy/custom-reuse-strategy';

const routes: Routes = [
  
    { path: 'register', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'products', loadChildren: () => import('./components/products/products.module').then( response => response.ProductsModule), component: ProductsComponent, canActivate: [authGuard] },
    { path: 'cart', loadChildren: () => import('./components/cart/cart.module').then( response => response.CartModule), component: CartComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CustomReuseStrategy]
})
export class AppRoutingModule { }
