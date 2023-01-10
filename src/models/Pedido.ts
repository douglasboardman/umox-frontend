import { ItemPedidoPL } from "./ItemPedido";
// import { dateToView } from "src/app/utils/comon";

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

// export function reduzirLista(result: any) {

//     let dados = result.reduce((acc: Array<any>, curr: any) => {
//         const pedido = acc.find(p => p.id_pedido === curr.id_pedido);
//         if (pedido) {
//             pedido.itens.push({
//                 id_item: curr.id_item,
//                 descricao_item: curr.descricao_item,
//                 marca_item: curr.marca_item,
//                 un_medida_item: curr.un_medida_item,
//                 estoque_item: curr.estoque_item,
//                 qtd_solicitada: curr.qtd_solicitada,
//                 qtd_atendida: curr.qtd_atendida
//             });
//         } else {
//             acc.push({
//                 id_pedido: curr.id_pedido,
//                 nome_usuario: curr.nome_usuario,
//                 finalidade_pedido: curr.finalidade_pedido,
//                 data_pedido: dateToView(curr.data_pedido),
//                 data_atendimento: curr.data_atendimento ? dateToView(curr.data_atendimento) : '-',
//                 status_pedido: curr.status_pedido,
//                 itens: [
//                     {
//                         id_item: curr.id_item,
//                         descricao_item: curr.descricao_item,
//                         marca_item: curr.marca_item,
//                         un_medida_item: curr.un_medida_item,
//                         estoque_item: curr.estoque_item,
//                         qtd_solicitada: curr.qtd_solicitada,
//                         qtd_atendida: curr.qtd_atendida
//                     }
//                 ]
//             })
//         }
//         return acc;
//     }, []);

//     return dados;
// }