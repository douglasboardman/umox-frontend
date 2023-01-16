import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Route } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { unidades } from 'src/app/utils/comon';

@Component({
  selector: 'app-editar-item',
  templateUrl: './editar-item.component.html',
  styleUrls: ['./editar-item.component.scss']
})
export class EditarItemComponent {
  constructor(private admin: AdminService, private route: ActivatedRoute){}

  unidades = unidades;
  idItem!: string;
  dadosItem!: any;
  listaNaturezas!: any;
  editarItemForm!: FormGroup;
  dadosAlterados = false;
  payload!: any;
  

  ngOnInit() {
    this.editarItemForm = new FormGroup({
      descricao_item: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10)])),
      id_natureza: new FormControl('', Validators.required),
      marca_item: new FormControl('', Validators.required),
      un_medida_item: new FormControl('', Validators.required),
      estoque_item: new FormControl('', Validators.compose([Validators.required, Validators.min(1)]))
    });

    this.route.params.subscribe(
      (params: Params) => {
        this.idItem = params['id'];
        this.admin.abrirEdicaoItem(this.idItem).subscribe((response: any) => {
          this.dadosItem = response._data.dadosItem;
          this.listaNaturezas = response._data.listaNaturezas;
          this.editarItemForm.get('descricao_item')?.setValue(this.dadosItem.descricao_item);
          this.editarItemForm.get('id_natureza')?.setValue(this.dadosItem.id_natureza);
          this.editarItemForm.get('marca_item')?.setValue(this.dadosItem.marca_item);
          this.editarItemForm.get('un_medida_item')?.setValue(this.dadosItem.un_medida_item);
          this.editarItemForm.get('estoque_item')?.setValue(this.dadosItem.estoque_item);
        })
      }
    )

    this.editarItemForm.valueChanges.subscribe(objDados => {
        this.confereAlteracoes(objDados);
        this.payload = objDados;
        this.payload.descricao_item = this.payload.descricao_item.toUpperCase();
        this.payload.marca_item = this.payload.marca_item.toUpperCase();
    });
  }

  confereAlteracoes(objDados: any) {
    if(
      objDados.descricao_item.toUpperCase() == this.dadosItem.descricao_item &&
      objDados.id_natureza == this.dadosItem.id_natureza &&
      objDados.marca_item.toUpperCase() == this.dadosItem.marca_item &&
      objDados.un_medida_item == this.dadosItem.un_medida_item &&
      objDados.estoque_item == this.dadosItem.estoque_item
    ) {
      this.dadosAlterados = false;
    } else {
      this.dadosAlterados = true;
    }
  }

  submit() {
    this.payload.id_item = this.dadosItem.id_item;
    this.admin.concluirEdicaoItem(this.payload);
  }
}
