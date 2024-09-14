import { Component } from '@angular/core';
import { SidenavComponent } from "../../adminComponents/sidenav/sidenav.component";
import { CommonModule, NgFor } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Offer,OfferService } from '../../Services/offer/offer.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent {
  isModalOpen = false;
  isModalOpen1 = false;
  isSidebarOpen = false;
  selectedOffer: Offer | null = null;
  offers : Offer[] = []
  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }
  toggleModal1() {
    this.isModalOpen1 = !this.isModalOpen1;
  }
  offerForm: FormGroup;

  constructor(private fb: FormBuilder, private offerService: OfferService) {
    this.offerForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      tarif: ['', Validators.required],
    });
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

  openUpdateModal(offer: Offer): void {
    this.selectedOffer = offer;
    this.offerForm.patchValue(offer); // Populate the form with existing offer data
    this.isModalOpen1 = true; // Open the update modal
  }

  onSubmit(): void {
    if (this.offerForm.valid) {
      const offer: Offer = this.offerForm.value;
      this.offerService.createOffer(offer).subscribe({
        next: (response : Offer) => {
          console.log('Offer created successfully', response);
          this.offerForm.reset();
          this.isModalOpen = false;
          this.fetchOffers();
        },
        error: (error: any) => {
          console.error('Error creating offer', error);
        },
      });
    }
  }
}
