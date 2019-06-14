import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthTabsComponent } from '../components/auth-tabs/auth-tabs.component';

const routes: Routes = [
  {
    path: '',
    component: AuthTabsComponent
  }
]

@NgModule({
  exports: [ RouterModule ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AuthRoutingModule { }
