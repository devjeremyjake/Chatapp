import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  followers = [];
  user: any;
  socketHost: any;
  socket: any;

  constructor(private tokenService: TokenService, private userService: UsersService) {
    this.socketHost = 'http://localhost:3030';
    this.socket = io(this.socketHost);
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayLoad();
    this.GetUser();

    // socket.io refresh for refreshing following user.
    this.socket.on('refreshPage', () => {
      this.GetUser();
    });
  }

  GetUser() {
    this.userService.GetUserById(this.user._id).subscribe(
      data => {
        this.followers = data.result.followers;
      },
      err => console.log(err)
    );
  }
}
