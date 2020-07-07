import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ProductService} from "./services/product.service";

import {Routes, RouterModule} from "@angular/router";
import {ProductCategoryMenuComponent} from './components/product-category-menu/product-category-menu.component';
import {SearchComponent} from './components/search/search.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CartStatusComponent} from './components/cart-status/cart-status.component';
import {CartDetailsComponent} from './components/cart-details/cart-details.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SecurityComponent } from './components/security/security.component';
import {HttpInterceptorBasicAuthServiceService} from "./services/http/http-interceptor-basic-auth-service.service";

const routes: Routes = [
    {path: "checkout", component: CheckoutComponent},
    {path: "cart-details", component: CartDetailsComponent},
    {path: "products/:id", component: ProductDetailsComponent},
    {path: "search/:keyword", component: ProductListComponent},
    {path: "category/:id/:name", component: ProductListComponent},
    {path: "category", component: ProductListComponent},
    {path: "products", component: ProductListComponent},
    {path: "", redirectTo: '/products', pathMatch: 'full'},
    {path: "**", redirectTo: '/products', pathMatch: 'full'},
];

@NgModule({
    declarations: [
        AppComponent,
        ProductListComponent,
        ProductCategoryMenuComponent,
        SearchComponent,
        ProductDetailsComponent,
        CartStatusComponent,
        CartDetailsComponent,
        CheckoutComponent,
        SecurityComponent,
    ],
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule,
        HttpClientModule,    //module that contains http client
        NgbModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    //old way to register services
    // providers: [ProductService],
    // providers: [{provide:HTTP_INTERCEPTORS, useClass: HttpInterceptorBasicAuthServiceService, multi: true}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
