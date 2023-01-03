import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private authService: AuthService) {}

  title = 'umox-frontend';
  sidebarToggle: boolean = false;
  contentToggle: string = 'normal-view';
  auth: string = this.authService.auth == '' ? 'logged-out' : this.authService.auth;
  
  onSidebarToggle() {
      if(!this.sidebarToggle) {
        this.contentToggle = 'maximized';
        this.sidebarToggle = true;
      } else {
        this.contentToggle = 'normal-view';
        this.sidebarToggle = false;
      }
  }
}
