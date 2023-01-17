import { Component } from '@angular/core';
import { PanelMenu } from 'src/models/PanelMenu';
import { AppMenuGroups } from 'src/models/AppStruct';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent {
  listaMenus!: Array<PanelMenu>;

  ngOnInit() {
    this.listaMenus = AppMenuGroups.admin;
  }
}
