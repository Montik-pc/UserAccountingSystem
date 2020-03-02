import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.less']
})
export class FormUserComponent implements OnInit {
  formUser = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    avatar: new FormControl(''),
    note: new FormControl('')
  });
  subscription;
  user: {};
  id: string;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription =  this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.showUser(this.id);
    });
  }

  showUser(id) {
    this.user = this.userService.getUserById(id);
    this.patchForm(this.user);
  }

  patchForm(user) {
    this.formUser.patchValue({
      ...user || ''
    });
  }

  editUser() {
    let user = {
      id: this.id,
      ...this.formUser.value
    }
    this.userService.saveUser(this.id, user);
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
