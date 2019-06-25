import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import * as M from 'materialize-css';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  socketHost: any;
  socket: any;
  user: any;
  notifications = [];
  count = [];

  constructor(private router: Router, private tokenService: TokenService, private userService: UsersService) {
    this.socketHost = 'http://localhost:3030';
    this.socket = io(this.socketHost);
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayLoad();
    console.log(this.user);

    const dropDownElement = document.querySelector('.dropdown-trigger');
    M.Dropdown.init(dropDownElement, {
      alignment: 'right',
      hover: true,
      coverTrigger: false
    });

    this.GetUser();
    this.socket.on('refreshPage', () => {
      this.GetUser();
    });
  }

  GetUser() {
    this.userService.GetUserById(this.user._id).subscribe(data => {
      this.notifications = data.result.notifications;
      const value = _.filter(this.notifications, ['read', false]);
      this.count = value;
    });
  }

  MarkAll() {
    this.userService.MarkAllAsRead().subscribe(data => {
      this.socket.emit('refresh', {});
    });
  }

  TimeFromNow(time) {
    return moment(time).fromNow();
  }

  GoToHome() {
    this.router.navigate(['streams']);
  }

  logout() {
    this.tokenService.DeleteToken();
    this.router.navigate(['']);
  }
}
