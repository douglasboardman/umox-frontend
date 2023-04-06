import { Component } from '@angular/core';
import { screenSizeAjust } from '../../utils/comon';

@Component({
  selector: 'app-frame',
  templateUrl: './app-frame.component.html',
  styleUrls: ['./app-frame.component.scss']
})
export class AppFrameComponent {
  viewMode!: string;

  ngOnInit() {
    const width = window.innerWidth;
    if(width <= 950) {
      this.viewMode = 'responsive';
      localStorage.setItem('view-mode', 'responsive');
    } else {
      this.viewMode = String(localStorage.getItem('view-mode'));
    }
  }

  onSidebarToggle() {
    let width = window.innerWidth;
    let viewMode = localStorage.getItem('view-mode');
    if(width <= 950) {
      if(viewMode == 'responsive') {
        this.viewMode = 'minimalist';
        localStorage.setItem('view-mode', 'minimalist');
      } else {
        this.viewMode = 'responsive';
        localStorage.setItem('view-mode', 'responsive');
      }
    } else {
      if(viewMode == 'normal-view') {
        this.viewMode = 'minimalist';
        localStorage.setItem('view-mode', 'minimalist');
      } else {
        this.viewMode = 'normal-view';
        localStorage.setItem('view-mode', 'normal-view');
      }
    }
  }

  onResize(event: any) {
    const width = event.target.innerWidth;
    let mode: string;
    if(width > 1480) {
      mode = 'normal-view';
    } else if(width <= 950) {
      mode = 'responsive';
    } else {
      mode = 'minimalist';
    }
    this.viewMode = mode;
    localStorage.setItem('view-mode', mode);
  }
}


 