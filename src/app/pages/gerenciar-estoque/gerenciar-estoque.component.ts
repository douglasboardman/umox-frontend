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
  searchText = "";
  listaNaturezas!: Array<any>;
  natureza = "0";

  ngOnInit(){
    this.admin.listarNaturezas().subscribe((response: any)=> {
      this.listaNaturezas = response._data;
    });

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

  onSelNaturezasChanged() {
    let searchFor = replaceSpecialChars(this.searchText.toUpperCase());

    if(searchFor.length > 0 && this.natureza != "0") {
      this.dadosItens = this.dadosOriginais.filter((item)=>{
        return item.id_natureza == this.natureza && replaceSpecialChars(String(item.descricao_item).concat(' ' + item.marca_item)).search(searchFor) > -1;
      });
    } else if(searchFor.length > 0 && this.natureza == "0") {
      this.dadosItens = this.dadosOriginais.filter((item) => {
        return replaceSpecialChars(String(item.descricao_item).concat(' ' + item.marca_item)).search(searchFor) > -1;
      });
    } else if(searchFor.length <= 0 && this.natureza != "0") {
      this.dadosItens = this.dadosOriginais.filter((item)=>{
        return item.id_natureza == this.natureza;
      });
    } else {
      this.dadosItens = this.dadosOriginais.filter((item) => {
        return replaceSpecialChars(String(item.descricao_item).concat(' ' + item.marca_item)).search(searchFor) > -1;
      });
    }
  }

  onKeyUpTxtConsulta() {
    let searchFor = replaceSpecialChars(this.searchText.toUpperCase());

    if(this.natureza != "0") {
      this.dadosItens = this.dadosOriginais.filter((item) => {
        return replaceSpecialChars(String(item.descricao_item).concat(' ' + item.marca_item)).search(searchFor) > -1 && item.id_natureza == this.natureza;
      });
    } else {
      this.dadosItens = this.dadosOriginais.filter((item) => {
        return replaceSpecialChars(String(item.descricao_item).concat(' ' + item.marca_item)).search(searchFor) > -1;
      });
    }
  }
  
}