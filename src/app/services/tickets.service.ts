import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Show } from 'src/app/interfaces/show';
import { ShowBuy } from '../interfaces/show-buy';
import { User } from '../interfaces/user';
import { environment } from './../../environments/environment';
import { Login } from './../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private http: HttpClient) { }

  public postRegister(register: User): Observable<User> {
    const url = `${environment.api}/users`;
    return this.http.post<User>(url, register);
  }

  public postLogin(login: Login) {
    const url = `${environment.api}/users/login`;
    return this.http.post<User>(url, login);
  }

  public findAllShows(): Observable<Show[]> {
    const url = `${environment.api}/products`;
    return this.http.get<Show[]>(url);
  }

  public findByIdShow(id: number): Observable<Show> {
    const url = `${environment.api}/products/${id}`;
    return this.http.get<Show>(url);
  }

  public buyShow(show: ShowBuy): Observable<ShowBuy> {
    const url = `${environment.api}/orders`;
    return this.http.post<ShowBuy>(url, show);
  }

}
