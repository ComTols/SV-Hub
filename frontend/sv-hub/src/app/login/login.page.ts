import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private router: Router, private auth: AuthService) {
  } // Injektieren des Routers

  ngOnInit() {
  }

  onLogin() {
    this.auth.login(this.username, this.password).then(r => {
      if (r) {
        // Leitet den Benutzer weiter, wenn die Anmeldung erfolgreich ist
        this.loginError = false;
        this.router.navigate(['/chad']); // Navigiert zur /chad-Seite
      } else {
        this.loginError = true;

      }
    })
  }
}
