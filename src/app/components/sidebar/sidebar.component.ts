import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OperacoesService } from 'src/app/services/operacoes.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private authService: AuthService, private operacoes: OperacoesService) {}
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

  onLogoutButtonClicked() {
    this.authService.logout();
  }
  
}
