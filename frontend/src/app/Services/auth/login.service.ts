import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8000/login/';
  private Url = 'http://localhost:8000/logout/';

  constructor(private http: HttpClient) { }

  signIn(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { username, password };
    console.log(body)
    return this.http.post(this.apiUrl, body, { headers }).pipe(
      catchError((error) => {
        console.error('Error during signIn:', error);
        throw error;
      })
    );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    console.log(!!token)
    return !!token;

  }

  logout(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });

    return this.http.get(this.Url, { headers });
  }
}
