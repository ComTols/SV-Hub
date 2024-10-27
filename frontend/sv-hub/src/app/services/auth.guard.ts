import {CanActivateFn} from '@angular/router';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './auth.service'; // AuthService importieren

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (await authService.isAuthenticated()) {
    return true
  } else {
    router.navigate(["/login"]).then()
    return false
  }
};
