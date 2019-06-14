import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  user: any;
  constructor(private router: Router, private tokenService: TokenService) {}

  ngOnInit() {
    this.user = this.tokenService.GetPayLoad();
    console.log(this.user);
  }

  GoToHome() {
    this.router.navigate(['streams']);
  }

  logout() {
    this.tokenService.DeleteToken();
    this.router.navigate(['']);
  }
}
