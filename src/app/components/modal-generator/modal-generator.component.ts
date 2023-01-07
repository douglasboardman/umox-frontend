import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'app-modal-generator',
    templateUrl: './modal-generator.component.html',
    styleUrls: ['./modal-generator.component.scss']
})
export class ModalGeneratorComponent {
    @Input() abrirModal!: string;
    @Input() tituloModal!: string;
    @Input() msgModal!: string;

    @Output() OkButtonClicked: EventEmitter<any> = new EventEmitter();
    @Output() CancelButtonClicked: EventEmitter<any> = new EventEmitter();
    @Output() ConfirmButtonClicked: EventEmitter<any> = new EventEmitter();


    fecharModal() {
        this.abrirModal = '';
    }

    okButtonClicked() {
        this.OkButtonClicked.emit();
        this.fecharModal();
    }

    cancelButtonClicked(){
        this.CancelButtonClicked.emit();
        this.fecharModal();
    }

    confirmButtonClicked(){
        this.ConfirmButtonClicked.emit();
        this.fecharModal();
    }

}
