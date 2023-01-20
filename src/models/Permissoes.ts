export class Permissoes {
    public atender_pedidos: boolean
    public consultar_estoque: boolean
    public consultar_pedidos: boolean
    public fazer_pedidos: boolean
    public gerenciar_estoque: boolean
    public gerenciar_pedidos: boolean
    public gerenciar_usuarios: boolean
    
    constructor(
        _atender_pedidos: boolean,
        _consultar_estoque: boolean,
        _consultar_pedidos: boolean,
        _fazer_pedidos: boolean,
        _gerenciar_estoque: boolean,
        _gerenciar_pedidos: boolean,
        _gerenciar_usuarios: boolean,
    ) {
        this.atender_pedidos = _atender_pedidos;
        this.consultar_estoque = _consultar_estoque;
        this.consultar_pedidos = _consultar_pedidos;
        this.fazer_pedidos = _fazer_pedidos;
        this.gerenciar_estoque = _gerenciar_estoque;
        this.gerenciar_pedidos = _gerenciar_pedidos;
        this.gerenciar_usuarios = _gerenciar_usuarios;
    }

    public isAtender_pedidos(): boolean {
        return this.atender_pedidos;
    }

    public setAtender_pedidos(atender_pedidos: boolean): void {
        this.atender_pedidos = atender_pedidos;
    }

    public isConsultar_estoque(): boolean {
        return this.consultar_estoque;
    }

    public setConsultar_estoque(consultar_estoque: boolean): void {
        this.consultar_estoque = consultar_estoque;
    }

    public isConsultar_pedidos(): boolean {
        return this.consultar_pedidos;
    }

    public setConsultar_pedidos(consultar_pedidos: boolean): void {
        this.consultar_pedidos = consultar_pedidos;
    }

    public isFazer_pedidos(): boolean {
        return this.fazer_pedidos;
    }

    public setFazer_pedidos(fazer_pedidos: boolean): void {
        this.fazer_pedidos = fazer_pedidos;
    }

    public isGerenciar_estoque(): boolean {
        return this.gerenciar_estoque;
    }

    public setGerenciar_estoque(gerenciar_estoque: boolean): void {
        this.gerenciar_estoque = gerenciar_estoque;
    }

    public isGerenciar_pedidos(): boolean {
        return this.gerenciar_pedidos;
    }

    public setGerenciar_pedidos(gerenciar_pedidos: boolean): void {
        this.gerenciar_pedidos = gerenciar_pedidos;
    }

    public isGerenciar_usuarios(): boolean {
        return this.gerenciar_usuarios;
    }

    public setGerenciar_usuarios(gerenciar_usuarios: boolean): void {
        this.gerenciar_usuarios = gerenciar_usuarios;
    }
}