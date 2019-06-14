import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import io from 'socket.io-client';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, AfterViewInit {
  toolbarElement: any;
  commentForm: FormGroup;
  postId: any;
  commentsArray = [];
  socket: any;
  socketHost: any;
  post: string;
  Username: any;
  Time: any;

  constructor(private fb: FormBuilder, private postService: PostService, private route: ActivatedRoute) {
    this.socketHost = 'http://localhost:3030';
    this.socket = io(this.socketHost);
  }

  ngOnInit() {
    this.toolbarElement = document.querySelector('.nav-content');
    this.postId = this.route.snapshot.paramMap.get('id');

    this.init();
    this.GetPost();
    this.socket.on('refreshPage', data => {
      this.GetPost();
    });
  }

  ngAfterViewInit() {
    this.toolbarElement.style.display = 'none';
  }

  init() {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    });
  }

  AddComment() {
    this.postService.addComment(this.postId, this.commentForm.value.comment).subscribe(data => {
      this.socket.emit('refresh', {});
      this.commentForm.reset();
    });
  }
  GetPost() {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data.post.post;
      this.Username = data.post.Username;
      this.Time = data.post.createdAt;
      this.commentsArray = data.post.comments.reverse();
    });
  }

  TimeFromNow(time) {
    return moment(time).fromNow();
  }
}
