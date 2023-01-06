import { ItemPedidoPL } from "./ItemPedidoPL";

export class PedidoPL {
    finalidade!: string;
    itens!: Array<ItemPedidoPL>;

    constructor(finalidade: string, itens: Array<ItemPedidoPL>){
        this.finalidade = finalidade;
        this.itens = itens;
    }

    getFinalidade(): string {
        return this.finalidade;
    }

    getItens(): Array<ItemPedidoPL> {
        return this.itens;
    }

    setFinalidade(textoFinalidade: string) {
        this.finalidade = textoFinalidade;
    }

    setItens(itens: Array<ItemPedidoPL>) {
        this.itens = itens;
    }

    public addItemPL(item: ItemPedidoPL) {
        this.itens.push(item);
    }

    public addItem(id: number, qtd: number) {
        let item = new ItemPedidoPL(id, qtd);
        this.itens.push(item);
    }

    public removeItem(id: number) {
        this.itens = this.itens.filter((item) => {
            return item.idItem != id;
        });
    }
}