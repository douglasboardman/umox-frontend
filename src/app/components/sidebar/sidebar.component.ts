import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Permissoes } from 'src/models/Permissoes';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private authService: AuthService) {}
  
  permissoes: Permissoes = new Permissoes(false,false,false,false,false,false,false);
  sidebarMode: string = '';
  @Output() toggle: EventEmitter<any> = new EventEmitter()

  ngOnInit() {
    const width = window.innerWidth;
    this.authService.listarPermissoesUsuario().subscribe((perm) => {
      this.permissoes = perm as Permissoes;
    })
    let toggle = localStorage.getItem('sidebar-toggle') == 'true' ? true : false;
    if(width <= 950) {
      this.sidebarMode = 'responsive';
    } else if(toggle){
      this.onToggleSidebarClicked()
    }
  }

  onToggleSidebarClicked(){
    if(window.innerWidth <= 950) {
      if(this.sidebarMode == 'responsive'){
        this.sidebarMode = 'minimized'
        this.toggle.emit();
      } else {
        this.sidebarMode = 'responsive';
        this.toggle.emit();
      }
    } else {
      if(this.sidebarMode == '') {
        this.sidebarMode = 'minimized'
        this.toggle.emit();
      } else {
        this.sidebarMode = ''
        this.toggle.emit();
      }
    }
  }

  onLogoutButtonClicked() {
    this.authService.logout();
  }

  onResize(event: any) {
    const width = event.target.innerWidth;
    if(width > 1480) {
      this.sidebarMode = '';
    } else if(width <= 950) {
      this.sidebarMode = 'responsive';
    } else {
      this.sidebarMode = 'minimized';
    }
  }
  
}
