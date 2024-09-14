import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ourapp',
  templateUrl: './ourapp.component.html',
  styleUrl: './ourapp.component.css'
})
export class OurappComponent {
  isModalOpen = false;

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }
}
