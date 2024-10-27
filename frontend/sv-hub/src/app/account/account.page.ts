import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/backend/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  userData: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUserAccount().subscribe(data => {
      this.userData = data;
    });
  }
}
