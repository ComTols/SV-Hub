import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service'; // AuthService importieren

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true; // Zugriff erlauben, wenn der Benutzer authentifiziert ist
  } else {
    router.navigate(['/login']); // Umleitung zur Login-Seite, wenn nicht authentifiziert
    return false; // Zugriff verweigern
  }
};
