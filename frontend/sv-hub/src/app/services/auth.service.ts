import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isAuthenticated(): boolean {
    // Überprüfung, ob der Benutzer eingeloggt ist
    return !!localStorage.getItem('userToken'); // Beispiel: Token-Check im Local Storage
  }
}
