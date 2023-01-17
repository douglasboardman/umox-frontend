import { Component, Input } from '@angular/core';
import { PanelMenu, PanelMenuPair } from 'src/models/PanelMenu';

@Component({
  selector: 'app-panel-menu',
  templateUrl: './panel-menu.component.html',
  styleUrls: ['./panel-menu.component.scss']
})
export class PanelMenuComponent {
  @Input() menus!: Array<PanelMenu>;
  menuPairs: Array<PanelMenuPair> = [];

  ngOnInit() {
    let j = 0;
    for(let i = 0; i < this.menus.length; i++) {
      if(i % 2 == 0) {
        if ((i + 1) < this.menus.length){
          this.menuPairs[j] = new PanelMenuPair(this.menus[i], this.menus[i+1]);
        } else {
          this.menuPairs[j] = new PanelMenuPair(this.menus[i], new PanelMenu('','','',''));
        }
        j++;
      } 
    }   
  }
  
}
