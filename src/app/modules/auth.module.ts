import { AuthTabsComponent } from '../components/auth-tabs/auth-tabs.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import from Component Module
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';

// import from Service Module
import { AuthService } from '../services/auth.service';

@NgModule({
  declarations: [AuthTabsComponent, LoginComponent, SignupComponent],
  exports: [AuthTabsComponent, LoginComponent, SignupComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [AuthService]
})
export class AuthModule {}
