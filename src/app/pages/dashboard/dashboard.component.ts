import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessengerService } from 'src/app/services/messenger.service';
import { TopMessage } from 'src/models/TopMessage';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(private messenger: MessengerService){}

  notification: TopMessage = new TopMessage('','','');
  $subs!: Subscription;

  ngOnInit(){
    this.$subs = this.messenger.receiveMessage().subscribe((msg) => {
      if(msg.target == 'dashboard'){
        this.notification = msg;
      }
    })
  }

  ngOnDestroy(){
    this.$subs.unsubscribe();
    //this.messenger.cleanMessage();
  }
}
