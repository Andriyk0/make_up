import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';


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
import { AddPresentComponent } from './admin/admin-present/add-present/add-present.component';
import { PresentListComponent } from './admin/admin-present/present-list/present-list.component';
import { PresentDetailsComponent } from './pages/present-details/present-details.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from "./shared/shared.module";
import { NgxMaskModule } from 'ngx-mask';
import { TextMaskModule } from 'angular2-text-mask';


import { AdminComponent } from './admin/admin.component';
import { AdminActionsComponent } from './admin/admin-actions/admin-actions.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminPresentComponent } from './admin/admin-present/admin-present.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { AdminCallbackComponent } from './admin/admin-callback/admin-callback.component';


import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AddCategoryComponent } from './admin/admin-category/add-category/add-category.component';
import { AddProductComponent } from './admin/admin-product/add-product/add-product.component';
import { ProductListComponent } from './admin/admin-product/product-list/product-list.component';
import { AddActionComponent } from './admin/admin-actions/add-action/add-action.component';
import { OrderListComponent } from './admin/admin-order/order-list/order-list.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchPipe } from './system/pipe/searchProduct/search.pipe';
import { SearchPresentPipe } from './system/pipe/searchPresent/search-present.pipe';
import { SearchOrderPipe } from './system/pipe/searchOrder/search-order.pipe';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ActionsComponent,
    ActionsDetailsComponent,
    OnlineComponent,
    BeautyClubComponent,
    DeliveryPaymentComponent,
    ArticleComponent,
    AboutComponent,
    CheckoutComponent,
    PresentComponent,
    ProductComponent,
    ProductDetailsComponent,
    RegisterComponent,
    AdminComponent,
    AdminActionsComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminPresentComponent,
    AdminOrderComponent,
    AddCategoryComponent,
    AddProductComponent,
    ProductListComponent,
    AddActionComponent,
    OrderListComponent,
    ProfileComponent,
    AdminCallbackComponent,
    AddPresentComponent,
    PresentListComponent,
    PresentDetailsComponent,
    SearchPipe,
    SearchPresentPipe,
    SearchOrderPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
