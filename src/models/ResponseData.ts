import { DadosReqUsuario } from "./DadosReqUsuario";

export class ResponseData {
    _dadosUsuario: DadosReqUsuario;
    _dados: Array<any>;
    _message: string;
    _error: boolean;

    constructor(dadosUsuario: DadosReqUsuario, dados: Array<any>, message: string, error: boolean) {
        this._dadosUsuario = dadosUsuario;
        this._dados = dados;
        this._message = message;
        this._error = error;
    }

    
    set dadosUsuario(dadosUsuario: DadosReqUsuario) {
        this._dadosUsuario = dadosUsuario;
    }

    set dados(dados: Array<any>) {
        this._dados = dados;
    }

    set message(message: string) {
        this._message = message;
    }

    set error(error: boolean) {
        this._error = error;
    }

    get dadosUsuario() {
        return this._dadosUsuario;
    }

    get dados() {
        return this._dados;
    }

    get message() {
        return this._message;
    }

    get error() {
        return this._error;
    }
}

class DadosUsuario {

}