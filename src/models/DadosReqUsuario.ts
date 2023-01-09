export class DadosReqUsuario {
    _nome: string;
    _id: string;

    constructor(nome: string, id: string) {
        this._nome = nome;
        this._id = id;
    }

    get nome(): string {
        return this._nome;
    }

    get id(): string {
        return this._id;
    }

    set nome(nome: string) {
        this._nome = nome;
    }

    set id(id: string) {
        this._id = id;
    }
}