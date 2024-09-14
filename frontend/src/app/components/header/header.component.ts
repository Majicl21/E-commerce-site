import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Offer } from '../../Services/offer/offer.service';
import { CartService } from '../../Services/cart/cart.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../Services/client/client.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../../Services/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isModalOpen = false;
  isModalOpen1 = false;
  loginmodal = false;
  isSidebarOpen = false;

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }
  toggleModal1() {
    this.isModalOpen1 = !this.isModalOpen1;
  }
  toggleloginModal() {
    this.loginmodal = !this.loginmodal;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  cart: Offer[] = [];
  offerForm: FormGroup;
  loginForm: FormGroup;
  ngOnInit(): void {
    this.listItems();
  }

  constructor(private router: Router,private cartService: CartService,private fb: FormBuilder,private clientService: ClientService,private loginService: LoginService) {
    this.offerForm = this.fb.group({
      cin: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      tel: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      adresse: ['', Validators.required],
      gender: ['', Validators.required],
    });
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
   }

   listItems(){
     this.cart = this.cartService.getCartItems()
   }

  removeFromCart(offer: Offer) {
    this.cartService.removeFromCart(offer);
    alert('Offer removed from cart!');
  }

  onSubmit() {
    if (this.offerForm.valid) {
      const clientData = this.offerForm.value; // Get form data for client

      // Extract offer IDs from cartItems
      const offerIds = this.cart.map(offer => offer.id); // Map over cart items to get their IDs

      console.log('Client Data:', clientData);
      console.log('Offer IDs:', offerIds);

      // Construct the payload to match the backend expectations
      const payload = {
        client: clientData,
        order: {
          offers: offerIds
        }
      };

      // Send the payload to the backend
      this.clientService.createClientAndOrder(payload).subscribe(
        response => {
          console.log('Checkout successful:', response);
          this.isModalOpen = false;
          this.cartService.clearCart(); // Clear the cart after successful checkout
        },
        error => {
          console.error('Error during checkout:', error);
        }
      );
    }
  }


  clearcart(){
    this.cartService.clearCart();
    window.location.reload();
  }

  login() {
    const userdata = this.loginForm.value;
    console.log(userdata)
    this.loginService.signIn(userdata.username,userdata.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/Dashboard']);
      },
      error: (error) => {
        console.error('Error during login:', error);
      }
    });
  }

  loggedin(){
    const token = localStorage.getItem('token');
    console.log(!!token)
    return !!token;
  }
}
