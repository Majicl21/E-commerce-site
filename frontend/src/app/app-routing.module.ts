import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './admin/clients/clients.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { OffersComponent } from './admin/offers/offers.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { authGuard } from './auth.guard';
import { LandingComponent } from './pages/landing/landing.component';
import { ShopComponent } from './pages/shop/shop.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
  {
    path: 'landing-page',
    component: LandingComponent,
  },
  {
    path: 'shop-page',
    component: ShopComponent,
  },
  {
    path: 'Dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'Offers',
    component: OffersComponent,
    canActivate: [authGuard]
  },
  {
    path: 'Clients',
    component: ClientsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
