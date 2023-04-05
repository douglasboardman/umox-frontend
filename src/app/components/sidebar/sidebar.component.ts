import { Component, EventEmitter, Output, Input } from '@angular/core';
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
  @Input() sidebarMode!: string;
  @Output() toggle: EventEmitter<any> = new EventEmitter()

  ngOnInit() {
    const width = window.innerWidth;
    this.authService.listarPermissoesUsuario().subscribe((perm) => {
      this.permissoes = perm as Permissoes;
    })
    if(width <= 950) {
      this.sidebarMode = 'responsive';
    } else{
      this.sidebarMode = String(localStorage.getItem('view-mode'));
    }
  }

  onToggleSidebarClicked(){
    if(window.innerWidth <= 950) {
      if(this.sidebarMode == 'responsive'){
        this.sidebarMode = 'minimalist'
        this.toggle.emit();
      } else {
        this.sidebarMode = 'responsive';
        this.toggle.emit();
      }
    } else {
      if(this.sidebarMode == 'normal-view') {
        this.sidebarMode = 'minimalist'
        this.toggle.emit();
      } else {
        this.sidebarMode = 'normal-view'
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
      this.sidebarMode = 'minimalist';
    }
  }
  
}
