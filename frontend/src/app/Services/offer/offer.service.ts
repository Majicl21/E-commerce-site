import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrl = 'http://127.0.0.1:8000/offers/';

  constructor(private http: HttpClient) { }

  // Get all offers
  getOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.apiUrl);
  }

  // Get a single offer by ID
  getOffer(id: number): Observable<Offer> {
    return this.http.get<Offer>(`${this.apiUrl}${id}/`);
  }

  // Create a new offer
  createOffer(offer: Offer): Observable<Offer> {
    return this.http.post<Offer>(this.apiUrl, offer);
  }

  // Update an existing offer
  updateOffer(id: number, offer: Offer): Observable<Offer> {
    return this.http.put<Offer>(`${this.apiUrl}${id}/`, offer);
  }

  // Delete an offer
  deleteOffer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}

// Define the Offer interface
export interface Offer {
  id?: number;
  title: string;
  description: string;
  date: string;
  tarif: string;
}
