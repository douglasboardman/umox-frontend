import { Component, Input } from '@angular/core';
import { PanelMenu } from 'src/models/PanelMenu';

@Component({
  selector: 'app-panel-menu',
  templateUrl: './panel-menu.component.html',
  styleUrls: ['./panel-menu.component.scss']
})
export class PanelMenuComponent {
  @Input() menus!: Array<PanelMenu>;
  
}
