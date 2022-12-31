import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  sidebarMode: string = '';
  @Output() toggle: EventEmitter<any> = new EventEmitter()

  onToggleSidebarClicked(){
    if(this.sidebarMode == '') {
      this.sidebarMode = 'minimized'
      this.toggle.emit();
    } else {
      this.sidebarMode = ''
      this.toggle.emit();
    }
  }
}
