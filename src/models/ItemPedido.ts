export class ItemPedidoPL {
    idItem!: number;
    qtdItem!: number;
    
    constructor(idItem: number, qtdItem: number) {
        this.idItem = idItem;
        this.qtdItem = qtdItem;
    }
    
    getIdItem(): number {
        return this.idItem;
    }    

    getQtdItem(): number {
        return this.qtdItem;
    }

    setIdItem(id: number) {
        this.idItem = id;
    }

    setQtdItem(qtd: number) {
        this.qtdItem = qtd;
    }
}
