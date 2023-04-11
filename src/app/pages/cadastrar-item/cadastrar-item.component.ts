import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { unidades } from 'src/app/utils/comon';

@Component({
  selector: 'app-cadastrar-item',
  templateUrl: './cadastrar-item.component.html',
  styleUrls: ['./cadastrar-item.component.scss']
})
export class CadastrarItemComponent {
  constructor(private admin: AdminService){}

  unidades = unidades;
  listaNaturezas!: any;
  novoItemForm!: FormGroup;

  ngOnInit() {
    this.novoItemForm = new FormGroup({
      descricao_item: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10)])),
      id_natureza: new FormControl('', Validators.required),
      marca_item: new FormControl('', Validators.required),
      un_medida_item: new FormControl('', Validators.required),
      estoque_item: new FormControl('', Validators.compose([Validators.required, Validators.min(1)]))
    });
    
    this.admin.listarNaturezas().subscribe((response: any) => {
      this.listaNaturezas = response._data;
    });
  }

  submit() {
    let payload = this.novoItemForm.getRawValue();
    payload.descricao_item = payload.descricao_item.toUpperCase();
    payload.marca_item = payload.marca_item.toUpperCase();
    this.admin.cadastrarItem(payload);
  }
}
