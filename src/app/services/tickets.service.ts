import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Show } from 'src/app/interfaces/show';
import { Dashboard } from '../interfaces/dashboard';
import { DashboardAddress } from '../interfaces/dashboard-address';
import { Order } from '../interfaces/order';
import { User } from '../interfaces/user';
import { environment } from './../../environments/environment';
import { Login } from './../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  headers = { 'X-PO-No-Message': 'true' };

  constructor(private http: HttpClient) { }

  public createUser(user: User): Observable<User> {
    const url = `${environment.api}/users`;
    return this.http.post<User>(url, user, { headers: this.headers });
  }

  public alterUser(user: User): Observable<User> {
    const url = `${environment.api}/users/${user.id}`;
    return this.http.put<User>(url, user, { headers: this.headers });
  }

  public findAllUser(): Observable<User[]> {
    const url = `${environment.api}/users`;
    return this.http.get<User[]>(url, { headers: this.headers });
  }

  public deleteByIdUser(id: number): Observable<void> {
    const url = `${environment.api}/users/${id}`;
    return this.http.delete<void>(url, { headers: this.headers });
  }

  public findByIdUser(id: number): Observable<User> {
    const url = `${environment.api}/users/${id}`;
    return this.http.get<User>(url, { headers: this.headers });
  }

  public postLogin(login: Login) {
    const url = `${environment.api}/users/login`;
    return this.http.post<User>(url, login, { headers: this.headers });
  }

  public findAllShows(): Observable<Show[]> {
    const url = `${environment.api}/products`;
    return this.http.get<Show[]>(url, { headers: this.headers });
  }

  public findByIdShow(id: number): Observable<Show> {
    const url = `${environment.api}/products/${id}`;
    return this.http.get<Show>(url, { headers: this.headers });
  }

  public createShow(show: Show): Observable<Show> {
    const url = `${environment.api}/products`;
    return this.http.post<Show>(url, show, { headers: this.headers });
  }

  public alterShow(show: Show): Observable<Show> {
    const url = `${environment.api}/products/${show.id}`;
    return this.http.put<Show>(url, show, { headers: this.headers });
  }

  public findAllOrder(): Observable<Order[]> {
    const url = `${environment.api}/order`;
    return this.http.get<Order[]>(url, { headers: this.headers });
  }

  public findByIdOrder(id: number): Observable<Order> {
    const url = `${environment.api}/order/${id}`;
    return this.http.get<Order>(url, { headers: this.headers });
  }

  public createOrder(order: Order): Observable<Order> {
    const url = `${environment.api}/order`;
    return this.http.post<Order>(url, order, { headers: this.headers });
  }

  public findDashboard(): Observable<Dashboard[]> {
    const url = `${environment.api}/dashboard`;
    return this.http.get<Dashboard[]>(url, { headers: this.headers });
  }

  public findDashboardAddress(): Observable<DashboardAddress[]> {
    const url = `${environment.api}/dashboard/address`;
    return this.http.get<DashboardAddress[]>(url, { headers: this.headers });
  }

}
