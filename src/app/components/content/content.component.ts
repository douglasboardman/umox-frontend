import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  @Input() sidebarToggle!: boolean;

  toggleContent: string = this.sidebarToggle ? 'maximized' : '';

}
