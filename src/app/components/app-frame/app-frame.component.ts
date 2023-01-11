import { Component } from '@angular/core';

@Component({
  selector: 'app-frame',
  templateUrl: './app-frame.component.html',
  styleUrls: ['./app-frame.component.scss']
})
export class AppFrameComponent {
  sidebarToggle: boolean = false;
  contentToggle: string = 'normal-view';

  onSidebarToggle() {
      if(!this.sidebarToggle) {
        this.contentToggle = 'maximized';
        this.sidebarToggle = true;
        localStorage.setItem('sidebar-toggle', 'true');
      } else {
        this.contentToggle = 'normal-view';
        this.sidebarToggle = false;
        localStorage.setItem('sidebar-toggle', 'false');
      }
  }
}
