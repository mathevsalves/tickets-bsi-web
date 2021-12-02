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

  constructor(private http: HttpClient) { }

  public createUser(user: User): Observable<User> {
    const url = `${environment.api}/users`;
    return this.http.post<User>(url, user);
  }

  public alterUser(user: User): Observable<User> {
    const url = `${environment.api}/users/${user.id}`;
    return this.http.put<User>(url, user);
  }

  public findAllUser(): Observable<User[]> {
    const url = `${environment.api}/users`;
    return this.http.get<User[]>(url);
  }

  public deleteByIdUser(id: number): Observable<void> {
    const url = `${environment.api}/users/${id}`;
    return this.http.delete<void>(url);
  }

  public findByIdUser(id: number): Observable<User> {
    const url = `${environment.api}/users/${id}`;
    return this.http.get<User>(url);
  }

  public postLogin(login: Login) {
    const url = `${environment.api}/users/login`;
    return this.http.post<User>(url, login);
  }

  public findAllShows(): Observable<Show[]> {
    const url = `${environment.api}/products`;
    return this.http.get<Show[]>(url);
  }

  public findAllShowsByDate(isPrevious: boolean): Observable<Show[]> {
    const url = `${environment.api}/products/filter-date?isPrevious=${isPrevious}`;
    return this.http.get<Show[]>(url);
  }

  public findByIdShow(id: number): Observable<Show> {
    const url = `${environment.api}/products/${id}`;
    return this.http.get<Show>(url);
  }

  public createShow(show: Show): Observable<Show> {
    const url = `${environment.api}/products`;
    return this.http.post<Show>(url, show);
  }

  public alterShow(show: Show): Observable<Show> {
    const url = `${environment.api}/products/${show.id}`;
    return this.http.put<Show>(url, show);
  }

  public findAllOrder(): Observable<Order[]> {
    const url = `${environment.api}/order`;
    return this.http.get<Order[]>(url);
  }

  public findByIdOrder(id: number): Observable<Order> {
    const url = `${environment.api}/order/${id}`;
    return this.http.get<Order>(url);
  }

  public createOrder(order: Order): Observable<Order> {
    const url = `${environment.api}/order`;
    return this.http.post<Order>(url, order);
  }

  public findDashboard(): Observable<Dashboard[]> {
    const url = `${environment.api}/dashboard`;
    return this.http.get<Dashboard[]>(url);
  }

  public findDashboardAddress(): Observable<DashboardAddress[]> {
    const url = `${environment.api}/dashboard/address`;
    return this.http.get<DashboardAddress[]>(url);
  }

}
