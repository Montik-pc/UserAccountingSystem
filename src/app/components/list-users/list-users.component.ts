import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.less']
})
export class ListUsersComponent implements OnInit, OnDestroy {
  subscription;
  public users;
  private id;
  public message;
  last_name;
  noSort: boolean = true;
  sortAZ: boolean = false;
  sortZA: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.users = this.userService.showUsers();
  }

  getUsers() {
    this.subscription = this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  searchUser(surname) {
    this.id = this.userService.searchUser(surname);
    if (this.id) {
      this.router.navigate(['/user', this.id]);
    } else {
      this.message = surname;
      this.last_name = '';
      setTimeout(() => this.message = false, 3000);
    }
  }

  sortUsers() {
    switch(true) {
      case this.noSort || this.sortZA:
        this.users.sort((a, b) => a.last_name > b.last_name ? 1 : -1);
        this.reset();
        this.sortAZ = true;
        break;
      case this.sortAZ:
        this.users.sort((a, b) => a.last_name > b.last_name ? -1 : 1);
        this.reset();
        this.sortZA = true;
        break;
    }
  }

  reset() {
    this.noSort = false;
    this.sortAZ = false;
    this.sortZA = false;
  }

  deleteUserById(id: string) {
    this.userService.deleteUser(id);
    this.users = this.userService.showUsers();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
