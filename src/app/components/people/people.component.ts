import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import _ from 'lodash';
import { TokenService } from 'src/app/services/token.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  users = [];
  loggedInUser: any;
  userArr = [];
  socketHost: any;
  socket: any;

  constructor(private userService: UsersService, private tokenService: TokenService) {
    this.socketHost = 'http://localhost:3030';
    this.socket = io(this.socketHost);
  }

  ngOnInit() {
    this.loggedInUser = this.tokenService.GetPayLoad();
    this.GetUsers();
    this.GetUser();

    // socket.io refresh for refreshing following user.
    this.socket.on('refreshPage', () => {
      this.GetUsers();
      this.GetUser();
    });
  }

  GetUsers() {
    this.userService.GetAllUsers().subscribe(data => {
      console.log(data);
      _.remove(data.result, { username: this.loggedInUser.username });
      this.users = data.result;
    });
  }

  GetUser() {
    this.userService.GetUserById(this.loggedInUser._id).subscribe(data => {
      console.log(data);
      this.userArr = data.result.following;
    });
  }

  followUser(user) {
    this.userService.FollowUser(user._id).subscribe(data => {
      this.socket.emit('refresh', {});
      console.log(data);
    });
  }

  CheckInArray(arr, id) {
    const result = _.find(arr, ['userFollowed._id', id]);
    if (result) {
      return true;
    } else {
      return false;
    }
  }
}
