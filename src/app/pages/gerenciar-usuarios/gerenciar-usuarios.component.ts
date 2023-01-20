import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { TopMessage } from 'src/models/TopMessage';

@Component({
  selector: 'app-gerenciar-usuarios',
  templateUrl: './gerenciar-usuarios.component.html',
  styleUrls: ['./gerenciar-usuarios.component.scss']
})
export class GerenciarUsuariosComponent {
  constructor(private admin: AdminService, private messenger: MessengerService){}
  
  notification: TopMessage = new TopMessage('','','');
  $subs!: Subscription;
  usuarios!: any;

  ngOnInit() {
      this.admin.listarUsuarios().subscribe((response: any) => {
        this.usuarios = response._data;
      });

      this.$subs = this.messenger.receiveMessage().subscribe((msg) => {
        if(msg.target == 'gerenciarUsuarios'){
          this.notification = msg;
        }
      });
  }

  ngOnDestroy(){
    this.$subs.unsubscribe();
  }

}
