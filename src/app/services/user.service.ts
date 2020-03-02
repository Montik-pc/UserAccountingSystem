import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators/';
import { Observable, throwError } from 'rxjs';
import { User } from '../modeles/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  keys;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://reqres.in/api/users?page=2').pipe(
      map( data =>
        data['data'].map(this.saveLocaleStorege)
      ),
      catchError(err => {
        console.log(err);
        return throwError(err);
      })
    )
  }

  saveLocaleStorege(user) {
    localStorage.setItem(user.id, JSON.stringify(user));
    return {...user || ''}
  }

  showUsers() {
    this.keys = Object.keys(localStorage);
    const users = [];

    for(let key of this.keys) {
      let user = JSON.parse(localStorage.getItem(key));
      users.push(user);
    }
    return users
  }

  getUserById(id: string) {
    return JSON.parse(localStorage.getItem(id));
  }

  searchUser(surname) {
    this.keys = Object.keys(localStorage);

    for(let key of this.keys) {
      if (JSON.parse(localStorage.getItem(key)).last_name === surname) {
        return key;
      };
    }
    return null;
  }

  saveUser(id, user) {
    localStorage.setItem(id, JSON.stringify(user));
  }

  deleteUser(id: string) {
    localStorage.removeItem(id);
  }
}
