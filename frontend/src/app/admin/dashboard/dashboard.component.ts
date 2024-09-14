import { Component } from '@angular/core';
import {
  Order,
  Client,
  ClientService,
} from '../../Services/client/client.service';
import { HttpClient } from '@angular/common/http';
import { Offer, OfferService } from '../../Services/offer/offer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  orders: Order[] = [];
  clients: Client[] = [];
  offers: Offer[] = [];
  offer!: Offer;
  client!: number;
  money!:number;

  constructor(
    private http: HttpClient,
    private clientService: ClientService,
    private offerService: OfferService
  ) {}
  ngOnInit(): void {
    this.fetchOrders();
    this.fetchClients();
  }

  fetchOrders(): void {
    this.clientService.getOrders().subscribe((data) => {
      this.orders = data;
      this.orders.forEach((order) => {
        if (order.offers && order.offers !== undefined) {
          order.offers.forEach((offer) => {
            this.offerService.getOffer(offer).subscribe((offer) => {
              this.offers.push(offer);
              console.log(this.offers);
            });
          });
        }
      });
    });
  }

  fetchClients(): void {
    this.http.get<any[]>('http://127.0.0.1:8000/client/')
      .subscribe(data => {
        this.clients = data;
        console.log(data)
      }, error => {
        console.error('Error fetching clients:', error);
      });
  }
}
