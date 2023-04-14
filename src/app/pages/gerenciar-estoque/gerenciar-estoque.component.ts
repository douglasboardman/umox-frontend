import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { TopMessage } from 'src/models/TopMessage';
import { replaceSpecialChars } from '../../utils/comon';

@Component({
  selector: 'app-gerenciar-estoque',
  templateUrl: './gerenciar-estoque.component.html',
  styleUrls: ['./gerenciar-estoque.component.scss']
})
export class GerenciarEstoqueComponent {
  constructor(private admin: AdminService, private messenger: MessengerService){}

  notification: TopMessage = new TopMessage('','','');
  $subs!: Subscription;
  dadosItens!: Array<any>;
  dadosOriginais!: Array<any>;
  searchText!: string;

  ngOnInit(){
    this.admin.gerenciarEstoque().subscribe((response: any) => {
      this.dadosOriginais = response._data;
      this.dadosItens = response._data;
    });

    this.$subs = this.messenger.receiveMessage().subscribe((msg) => {
      if(msg.target == 'gerenciarEstoque'){
        this.notification = msg;
      }
    });
  }

  ngOnDestroy(){
    this.$subs.unsubscribe();
  }

  onKeyUpTxtConsulta() {
    let searchFor = replaceSpecialChars(this.searchText.toUpperCase());
    this.dadosItens = this.dadosOriginais.filter((item) => {
      return replaceSpecialChars(String(item.descricao_item).concat(' ' + item.marca_item)).search(searchFor) > -1;
    });
  }
  
}