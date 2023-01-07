import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { TopMessage } from 'src/models/TopMessage';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  private subject = new BehaviorSubject<TopMessage>(new TopMessage('Umox', 'is-sucess')); //('Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur dicta nesciunt minima, harum pariatur, excepturi velit adipisci minus, aliquam quasi molestias placeat facere doloribus incidunt reprehenderit nobis atque quo? Repellat.');
  constructor() { }

  sendMessage(message: TopMessage){
    this.subject.next(message);
  }

  receiveMessage(): Observable<TopMessage> {
    return this.subject.asObservable();
  }
}
