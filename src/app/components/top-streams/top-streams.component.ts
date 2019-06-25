import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { TokenService } from 'src/app/services/token.service';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';

@Component({
  selector: 'app-top-streams',
  templateUrl: './top-streams.component.html',
  styleUrls: ['./top-streams.component.scss']
})
export class TopStreamsComponent implements OnInit {

  socketHost: any;
  socket: any;
  topposts = [];
  user: any;

  constructor(private postService: PostService, private tokenService: TokenService, private router: Router) {
    this.socketHost = 'http://localhost:3030';
    this.socket = io(this.socketHost);
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayLoad();
    this.AllPosts();
    // socket.io refresh
    this.socket.on('refreshPage', data => {
      this.AllPosts();
    });
  }

  // retriving all posts
  AllPosts() {
    this.postService.getAllPosts().subscribe(
      data => {
        this.topposts = data.top;
      },
      err => {
        if (err.error.token === null) {
          this.tokenService.DeleteToken();
          this.router.navigate(['']);
        }
      }
    );
  }
  // like post method
  LikePost(post) {
    this.postService.addLike(post).subscribe(
      data => {
        console.log(data);
        this.socket.emit('refresh', {});
      },
      err => console.log(err)
    );
  }

  // changing like button array
  CheckLikesArray(arr, username) {
    return _.some(arr, { username: username });
  }

  TimeFromNow(time) {
    return moment(time).fromNow();
  }

  // comment section
  OpenCommentBox(post) {
    this.router.navigate(['post', post._id]);
  }

}
