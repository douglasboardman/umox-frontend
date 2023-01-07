import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private messenger: MessengerService){}

  msgClass!: string;
  message!: string;

  ngOnInit(){
    this.messenger.receiveMessage().subscribe((msg) => {
      this.message = msg.message;
      this.msgClass = msg.msgType;
    })
  }
}
