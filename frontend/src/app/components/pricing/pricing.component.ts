import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Offer, OfferService } from '../../Services/offer/offer.service';
import { CartService } from '../../Services/cart/cart.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css'
})
export class PricingComponent {
  selectedOffer: Offer | null = null;
  offers : Offer[] = []
  isModalOpen = false;
  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }
  addToCart(offer: Offer) {
    this.cartService.addToCart(offer);
    alert('Offer added to cart!');
    console.log("cart",this.cartService.getCartItems())
  }

  constructor(private offerService: OfferService,private cartService: CartService) {

  }

  ngOnInit(): void {
    this.fetchOffers();
  }

  fetchOffers(): void {
    this.offerService.getOffers()
      .subscribe(data => {
        this.offers = data;
        console.log(data)
      }, error => {
        console.error('Error fetching offers:', error);
      });
  }

}
