import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private createUser = 'https://localhost:7075/api/User/CreateUser';
  private readUser = 'https://localhost:7075/api/User/ReadUser';
  private updateUser = 'https://localhost:7075/api/User/UpdateUser';
  private deleteUser = 'https://localhost:7075/api/User/DeleteUser';

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
}
