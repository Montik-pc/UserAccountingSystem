import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-user',
  templateUrl: './item-user.component.html',
  styleUrls: ['./item-user.component.less']
})
export class ItemUserComponent implements OnInit {
  @Input() user;
  @Output() onDelete = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  editUser(id: string) {  }

  deleteUser(id: string): void {
    this.onDelete.emit(id);
  }
}
