import { Component } from '@angular/core';
import { Client, ClientService, Order } from '../../Services/client/client.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orders: Order[] = []; 
  clients: Client[] = [];
  client !: Number ;
  constructor(private http: HttpClient,private clientService : ClientService) {}
  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.clientService.getOrders()
      .subscribe(data => {
        this.orders = data;
          this.orders.forEach(order => {
          if (order.client && order.client !== undefined) {
          this.clientService.getClient(order.client)
          .subscribe(client => {
          this.clients.push(client);
          console.log(this.clients)
        })
      }
    })
  })
  }

  getClientForOrder(order: Order): Client | undefined {
    return this.clients.find(client => client.id === order.client);
  }

  updateOrderStatus(orderId: number, status: string): void {
    this.clientService.updateOrderStatus(orderId, status)
      .subscribe(
        (response) => {
          console.log('Order status updated:', response);
          // Optionally, update the UI after status change
          const order = this.orders.find(o => o.id === orderId);
          if (order) {
            order.status = status;  // Update status locally
          }
        },
        (error) => {
          console.error('Error updating order status:', error);
        }
      );
  }
}


