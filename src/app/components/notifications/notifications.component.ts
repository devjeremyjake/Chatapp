import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client';
import * as moment from 'moment';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  socketHost: any;
  socket: any;
  user: any;
  notifications = [];

  constructor(private tokenService: TokenService, private userService: UsersService) {
    this.socketHost = 'http://localhost:3030';
    this.socket = io(this.socketHost);
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayLoad();
    this.GetUser();
    this.socket.on('refreshPage', () => {
      this.GetUser();
    });
  }

  GetUser() {
    this.userService.GetUserById(this.user._id).subscribe(data => {
      this.notifications = data.result.notifications;
    });
  }

  MarkNotification(data) {
    this.userService.MarkNotification(data._id).subscribe(value => {
      this.socket.emit('refresh', {});
    })
  }

  DeleteNotification(value) {
    this.userService.MarkNotification(value._id, true).subscribe(data =>{
      console.log(data);
      this.socket.emit('refresh', {});
    })
  }

  TimeFromNow(time) {
    return moment(time).fromNow();
  }

}
