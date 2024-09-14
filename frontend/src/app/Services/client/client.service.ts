import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer } from '../offer/offer.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://127.0.0.1:8000/client/';
  private url = 'http://127.0.0.1:8000/clientOrder/';
  private api = 'http://127.0.0.1:8000/order/';

  constructor(private http: HttpClient) { }

  // Get all clients
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  // Get a single client by ID
  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}${id}/`);
  }

  // Create a new client
  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }

  createClientAndOrder(payload: any): Observable<any> {
    return this.http.post<any>(this.url, payload);
  }
  // Update an existing client
  updateClient(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}${id}/`, client);
  }

  // Delete a client
  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.api}`);
  }

  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.patch(`${this.api}${orderId}/update-status/`, { status });
  }
}

// Define the Client interface
export interface Client {
  id?: number;
  cin:string;
  user: string;
  firstName: string;
  lastName: string;
  tel: string;
  adresse: string;
  photo: string;
  gender: string;
}

export interface Order {
  id?: number;
  client: number;
  offers: number[];
  created_at:Date;
  status: string;
}
