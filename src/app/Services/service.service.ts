import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private createUser = 'https://localhost:7075/api/User/CreateUser';
  private readUser = 'https://localhost:7075/api/User/ReadUser';
  private updateUser = 'https://localhost:7075/api/User/UpdateUser';
  private deleteUser = 'https://localhost:7075/api/User/DeleteUser';

  private login = 'https://localhost:7075/api/User/Login';

  constructor(private http: HttpClient) {}

  CreateUser(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.createUser, user, { headers: headers });
  }

  ReadUser(): Observable<any[]> {
    const headers = new HttpHeaders({ Accept: 'application/json' });
    return this.http.get<any[]>(this.readUser, { headers: headers });
  }

  UpdateUser(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.updateUser, user, { headers: headers });
  }

  DeleteUser(userId: string): Observable<any> {
    const headers = new HttpHeaders({ Accept: '*/*' });
    return this.http.delete<any>(`${this.deleteUser}/${userId}`, {
      headers: headers,
    });
  }

  Login(credentials: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
    });
    return this.http
      .post<any>(this.login, credentials, { headers: headers })
      .pipe(
        tap((response) => {
          if (response && response.active == true) {
            sessionStorage.setItem('id', response.id);
            sessionStorage.setItem('firstName', response.firstName);
            sessionStorage.setItem('lastName', response.lastName);
            sessionStorage.setItem('email', response.email);
          } else {
            throw new Error('Login fallido: No se encontró el usuario');
          }
        }),
        catchError((error) => {
          console.error('Error en el login:', error);
          throw error;
        })
      );
  }
}
