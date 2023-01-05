import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessangerService {
  private subject = new BehaviorSubject<string>('Umox'); //('Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur dicta nesciunt minima, harum pariatur, excepturi velit adipisci minus, aliquam quasi molestias placeat facere doloribus incidunt reprehenderit nobis atque quo? Repellat.');
  constructor() { }

  sendMessage(message: string){
    this.subject.next(message);
  }

  receiveMessage(): Observable<string> {
    return this.subject.asObservable();
  }
}
