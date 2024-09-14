import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './Services/auth/login.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/landing-page']);
    return false;
  }
};
