export class TopMessage {
  private _message: string;
  private _msgType: string;

  constructor(message: string, msgType: string) {
    this._message = message;
    this._msgType = msgType;
  }

  get message(): string {
    return this._message;
  }

  set message(message: string) {
    this._message = message;
  }

  get msgType(): string {
    return this._msgType;
  }

  set msgType(msgType: string) {
    this._msgType = msgType;
  }

}