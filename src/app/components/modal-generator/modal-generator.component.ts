import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-modal-generator',
    templateUrl: './modal-generator.component.html',
    styleUrls: ['./modal-generator.component.scss']
})
export class ModalGeneratorComponent {
    show!: boolean;

    @Input() tituloModal!: string;
    @Input() msgModal!: string;
    @Input() mostrarModal!: boolean;

    @Output() OkButtonClicked: EventEmitter<any> = new EventEmitter();
    @Output() CancelButtonClicked: EventEmitter<any> = new EventEmitter();
    @Output() ConfirmButtonClicked: EventEmitter<any> = new EventEmitter();

    okButtonClicked() {
        this.OkButtonClicked.emit();
    }

    cancelButtonClicked(){
        this.CancelButtonClicked.emit();
    }

    confirmButtonClicked(){
        this.ConfirmButtonClicked.emit();
    }

}
