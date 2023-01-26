import { Component } from '@angular/core';

@Component({
  selector: 'app-frame',
  templateUrl: './app-frame.component.html',
  styleUrls: ['./app-frame.component.scss']
})
export class AppFrameComponent {
  sidebarToggle: boolean = false;
  contentToggle: string = 'normal-view';

  ngOnInit() {
    const width = window.innerWidth;
    if(width > 1480) {
      this.contentToggle = 'normal-view';
      this.sidebarToggle = false;
      localStorage.setItem('sidebar-toggle', 'false');
    } else if(width <= 950) {
      this.contentToggle = 'responsive';
    } else {
      this.contentToggle = 'maximized';
      this.sidebarToggle = true;
      localStorage.setItem('sidebar-toggle', 'true');
    }
  }

  onSidebarToggle() {
    if(window.innerWidth > 950) {
      if(this.contentToggle != 'maximized') {
        this.contentToggle = 'maximized';
        this.sidebarToggle = true;
        localStorage.setItem('sidebar-toggle', 'true');
      } else {
        this.contentToggle = 'normal-view';
        this.sidebarToggle = false;
        localStorage.setItem('sidebar-toggle', 'false');
      }
    } else {
      if(this.contentToggle == 'responsive') {
        this.contentToggle = 'maximized';
        this.sidebarToggle = true;
        localStorage.setItem('sidebar-toggle', 'true');
      } else {
        this.contentToggle = 'responsive';
        this.sidebarToggle = false;
        localStorage.setItem('sidebar-toggle', 'false');
      }
    }

  }

  onResize(event: any) {
    const width = event.target.innerWidth;
    if(width > 1480) {
      this.contentToggle = 'normal-view';
      this.sidebarToggle = false;
      localStorage.setItem('sidebar-toggle', 'false');
    } else if(width <= 950) {
      this.contentToggle = 'responsive';
    } else {
      this.contentToggle = 'maximized';
      this.sidebarToggle = true;
      localStorage.setItem('sidebar-toggle', 'true');
    }
  }
}


 