import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private createUser = 'https://localhost:7075/api/User/CreateUser';
  private readUser = 'https://localhost:7075/api/User/ReadUser';

  constructor(private http: HttpClient) {}

  CreateUser(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.createUser, user, { headers: headers });
  }

  ReadUser(): Observable<any[]> {
    const headers = new HttpHeaders({ Accept: 'application/json' });
    return this.http.get<any[]>(this.readUser, { headers: headers });
  }
}
