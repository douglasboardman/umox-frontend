import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessengerService } from 'src/app/services/messenger.service';
import { OperacoesService } from 'src/app/services/operacoes.service';
import { TopMessage } from 'src/models/TopMessage';

@Component({
  selector: 'app-gerenciar-estoque',
  templateUrl: './gerenciar-estoque.component.html',
  styleUrls: ['./gerenciar-estoque.component.scss']
})
export class GerenciarEstoqueComponent {
  constructor(private operacoes: OperacoesService, private messenger: MessengerService){}

  notification: TopMessage = new TopMessage('','','');
  $subs!: Subscription;
  dadosItens!: Array<any>;
  dadosOriginais!: Array<any>;
  searchText!: string;

  ngOnInit(){
    this.operacoes.consultarEstoque().subscribe((response: any) => {
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
    this.messenger.cleanMessage();
  }

  onKeyUpTxtConsulta() {
    let searchFor = this.searchText.toUpperCase();
    this.dadosItens = this.dadosOriginais.filter((item) => {
      return item.descricao_item.search(searchFor) > -1;
    });
  }
}
