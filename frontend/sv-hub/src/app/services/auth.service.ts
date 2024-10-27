import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {URL} from "./backend/backend";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  async isAuthenticated(): Promise<boolean> {
    // Überprüfung, ob der Benutzer eingeloggt ist
    //return !!localStorage.getItem('userToken'); // Beispiel: Token-Check im Local Storage
    const token = localStorage.getItem("userToken");
    if (token) {
      try {
        const user = await firstValueFrom(this.http.get<Answer<User>>(URL + "/user", {
          headers: {}
        }));
        if (user.content) {
          return true
        }
      } catch (e) {
        return false
      }
    }
    return false
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
      const usr = await firstValueFrom(this.http.post<Answer<User>>(URL + "/login", {
        username: username,
        password: password
      }));
      if (usr.content) {
        const token = usr.content.token ? usr.content.token : "";
        localStorage.setItem("userToken", token);
        return true
      }
    } catch (e) {
      return false
    }
    return false
  }
}
