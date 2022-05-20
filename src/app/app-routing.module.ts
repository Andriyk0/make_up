import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ActionsComponent } from './pages/actions/actions.component';
import { ActionsDetailsComponent } from './pages/actions-details/actions-details.component';
import { OnlineComponent } from './pages/online/online.component';
import { BeautyClubComponent } from './pages/beauty-club/beauty-club.component';
import { DeliveryPaymentComponent } from './pages/delivery-payment/delivery-payment.component';
import { ArticleComponent } from './pages/article/article.component';
import { AboutComponent } from './pages/about/about.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PresentComponent } from './pages/present/present.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { RegisterComponent } from './pages/register/register.component';
import { PresentDetailsComponent } from './pages/present-details/present-details.component';

import { AdminComponent } from './admin/admin.component';
import { AdminActionsComponent } from './admin/admin-actions/admin-actions.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminPresentComponent } from './admin/admin-present/admin-present.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { AdminCallbackComponent } from './admin/admin-callback/admin-callback.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './system/guards/auth/auth.guard';
import { ProfileGuard } from './system/guards/profile/profile.guard';


const routes: Routes = [
  { path : '', component: HomeComponent },
  { path : 'actions', component: ActionsComponent },
  { path : 'actions/:id', component: ActionsDetailsComponent },
  { path : 'online', component: OnlineComponent },
  { path : 'beauty-club', component: BeautyClubComponent },
  { path : 'delivery-payment', component: DeliveryPaymentComponent },
  { path : 'article', component: ArticleComponent },
  { path : 'about', component: AboutComponent },
  { path : 'checkout', component: CheckoutComponent },
  { path : 'present', component: PresentComponent },
  { path : 'present/:id', component: PresentDetailsComponent },
  { path : 'product/:name', component: ProductComponent },
  { path : 'product/:name/:id', component: ProductDetailsComponent },
  { path : 'register', component: RegisterComponent },
  { path : 'profile', component: ProfileComponent,canActivate:[ProfileGuard] },
  { path : 'admin', component: AdminComponent,canActivate:[AuthGuard] , children : [
      { path : '', pathMatch : 'full', redirectTo: 'category' },
      { path : 'action', component: AdminActionsComponent },
      { path : 'category', component: AdminCategoryComponent },
      { path : 'product', component: AdminProductComponent },
      { path : 'present', component: AdminPresentComponent },
      { path : 'order', component: AdminOrderComponent },
      { path : 'callback', component: AdminCallbackComponent },
    ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
