import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  @Input() message!: string;
  @Input() class!: string;

  classes!: Array<string>;

  ngOnInit() {
    if(this.message != ''){
      this.showMessage();
    }
  }

  showMessage() {
    this.classes = ['visible', this.class];
    setTimeout(() => { this.closeMessage(); }, 10000);
  }

  onDeleteButtonClicked() {
    this.closeMessage();
  }

  closeMessage() {
    this.classes = ['hide', this.class];
  }
}
