import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Route } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-editar-item',
  templateUrl: './editar-item.component.html',
  styleUrls: ['./editar-item.component.scss']
})
export class EditarItemComponent {
  constructor(private admin: AdminService, private route: ActivatedRoute){}

  idItem!: string;
  dadosItem!: any;
  listaNaturezas!: any;
  editarItemForm!: FormGroup;
  unidades = [ "UNIDADE","PACOTE","CAIXA","KG","GR","L","ML","M" ]; // tenho que arrumar isso. Colocar em um lugar mais adequado

  ngOnInit() {
    this.editarItemForm = new FormGroup({
      descricao: new FormControl('', Validators.required),
      natureza: new FormControl('', Validators.required),
      marca: new FormControl('', Validators.required),
      unMedida: new FormControl('', Validators.required),
      estoque: new FormControl('', Validators.required)
    });

    this.route.params.subscribe(
      (params: Params) => {
        this.idItem = params['id'];
        this.admin.editarItem(this.idItem).subscribe((response: any) => {
          console.log(response);
          this.dadosItem = response._data.dadosItem;
          this.listaNaturezas = response._data.listaNaturezas;
          this.editarItemForm.get('descricao')?.setValue(this.dadosItem.descricao_item);
          this.editarItemForm.get('natureza')?.setValue(this.dadosItem.id_natureza);
          this.editarItemForm.get('marca')?.setValue(this.dadosItem.marca_item);
          this.editarItemForm.get('unMedida')?.setValue(this.dadosItem.un_medida_item);
          this.editarItemForm.get('estoque')?.setValue(this.dadosItem.estoque_item);
        })
      }
    )
  }

  submit() {

  }
}
