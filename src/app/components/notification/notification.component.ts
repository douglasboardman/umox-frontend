import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  @Input() message!: string;
  @Input() class!: string;
  @Input() toggleNotification!: string;
  @Output() hide: EventEmitter<any> = new EventEmitter();

  visibility: string = 'hide';
  //classes!: Array<string>;

  ngOnInit() {
    if(this.message != ''){
      this.showMessage();
    }
  }

  ngOnChanges() {
    if(this.toggleNotification == 'show'){
      this.showMessage();
    }
  }

  showMessage() {
    this.visibility = 'visible';
    setTimeout(() => { this.closeMessage(); }, 10000);
    this.toggleNotification = '';
  }

  onDeleteButtonClicked() {
    this.closeMessage();
  }

  closeMessage() {
    this.visibility = 'hide';
    this.hide.emit();
  }
}
