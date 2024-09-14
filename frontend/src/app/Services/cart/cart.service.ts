import { Injectable } from '@angular/core';
import { Offer } from '../offer/offer.service';

@Injectable({
  providedIn: 'root'
})
export class CartService  {
  private cart: Offer[] = [];

  constructor() {
    this.loadCart();
  }

  addToCart(offer: Offer) {
    this.cart.push(offer);
    this.saveCart();
  }

  removeFromCart(offer: Offer) {
    const index = this.cart.indexOf(offer);
    if (index > -1) {
      this.cart.splice(index, 1);
      this.saveCart();
    }
  }

  getCartItems(): Offer[] {
    return this.cart;
  }

  private saveCart() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

  private loadCart() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const cart = localStorage.getItem('cart');
      if (cart) {
        this.cart = JSON.parse(cart);
      }
    }
  }

  private clearLocalStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('cart'); 
    }
  }

  clearCart() {
    this.cart = [];
    this.clearLocalStorage();
  }
}
