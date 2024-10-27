import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '';

  constructor(private http: HttpClient) {}

  getUserAccount(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
