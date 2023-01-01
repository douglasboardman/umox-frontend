import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'umox-frontend';
  sidebarToggle: boolean = false;
  contentToggle: string = 'normal-view';
  auth: string = 'logged-in'
  
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
