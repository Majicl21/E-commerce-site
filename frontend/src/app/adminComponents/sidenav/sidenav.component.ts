import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/auth/login.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {

  constructor(private authService: LoginService, private router: Router) {}

  logout() {
    const token = localStorage.getItem('token');

    if (token) {
      console.log('test')
      this.authService.logout(token).subscribe(
        response => {
          console.log(response.message);
          localStorage.removeItem('token');
          this.router.navigate(['/landing-page']);
        },
        error => {
          console.error('Error logging out', error);
        }
      );
    }
  }
}
