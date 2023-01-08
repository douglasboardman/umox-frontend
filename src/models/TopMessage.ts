export class TopMessage {
  private _message: string;
  private _msgClass: string;
  private _target: string;

  constructor(message: string, msgClass: string, target: string) {
    this._message = message;
    this._msgClass = msgClass;
    this._target = target;
  }

  get message(): string {
    return this._message;
  }

  set message(message: string) {
    this._message = message;
  }

  get msgClass(): string {
    return this._msgClass;
  }

  set msgClass(msgClass: string) {
    this._msgClass = msgClass;
  }

  get target(): string {
    return this._target;
  }

  set target(target: string) {
    this._target = target;
  }

  resetMessage() {
    this._message = '';
    this._msgClass = '';
    this._target = '';
  }
}