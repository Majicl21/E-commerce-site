import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './admin/clients/clients.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { OffersComponent } from './admin/offers/offers.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { SidenavComponent } from './adminComponents/sidenav/sidenav.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { OurappComponent } from './components/ourapp/ourapp.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ShopComponent } from './pages/shop/shop.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './Services/auth/login.service';
import { CartService } from './Services/cart/cart.service';
import { ClientService } from './Services/client/client.service';
import { OfferService } from './Services/offer/offer.service';
import { NgApexchartsModule } from 'ng-apexcharts';
import { OrdersChartComponent } from './adminComponents/charts/ordersChart/orders-chart/orders-chart.component';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ShopComponent,
    DashboardComponent,
    OffersComponent,
    ClientsComponent,
    OrdersComponent,
    HeaderComponent,
    AboutComponent,
    OurappComponent,
    ContactComponent,
    FooterComponent,
    PricingComponent,
    SidenavComponent,
    OrdersChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    CommonModule,
  ],
  providers: [
    LoginService,
    CartService,
    ClientService,
    OfferService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
