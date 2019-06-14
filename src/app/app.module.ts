import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth.module';
import { AuthRoutingModule } from './modules/auth-routing.module';
import { StreamsModule } from './modules/streams.module';
import { StreamsRoutingModule } from './modules/streams-routing.module';
import { CookieService } from 'ngx-cookie-service';
import { PostService } from './services/post.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token-interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AuthModule, AuthRoutingModule, StreamsModule, StreamsRoutingModule],
  providers: [
    CookieService,
    PostService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
