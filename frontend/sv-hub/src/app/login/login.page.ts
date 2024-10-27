import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private router: Router) { } // Injektieren des Routers

  ngOnInit() {}

  onLogin() {
    // Beispielhafter Check: Benutzername und Passwort prüfen
    if (this.username === 'test' && this.password === 'test') {
      // Leitet den Benutzer weiter, wenn die Anmeldung erfolgreich ist
      this.loginError = false;
      this.router.navigate(['/chad']); // Navigiert zur /chad-Seite
    } else {
      // Zeigt eine Fehlermeldung an, wenn die Anmeldung fehlschlägt
      this.loginError = true;
    }
  }
}
