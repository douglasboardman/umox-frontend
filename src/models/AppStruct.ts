import { PanelMenu } from "./PanelMenu";

class AppStructMember {
    route: string;
    link: string;
    pageName: string;
    parent: string;
    members: any[];

    constructor(route: string, link: string, pageName: string, parent: string, members: any[]) {
        this.route = route;
        this.link = link;
        this.pageName = pageName;
        this.parent = parent;
        this.members = members;
    }
}

class AppStruct {
    route: string;
    link: string;
    pageName: string;
    members: AppStructMember[];

    constructor(route: string, link: string, pageName: string, members: AppStructMember[]) {
        this.route = route;
        this.link = link;
        this.pageName = pageName;
        this.members = members;
    }
}

const appStruct = new AppStruct(
    'Dashboard',
    '/dashboard',
    'Dasboard',
    [
        new AppStructMember(
            'meuCadastro',
            '/meuCadastro',
            'Meu cadastro',
            'dashboard',
            []
        ),

        new AppStructMember(
            'operações',
            '/operacoes',
            'operações',
            'dashboard',
            [
                new AppStructMember(
                    'itens',
                    '/operacoes/itens',
                    'itens',
                    'operações',
                    ['consultar estoque']
                ),
                new AppStructMember(
                    'pedidos',
                    '/operacoes/pedidos',
                    'pedidos',
                    'operações',
                    ['consultar pedidos', 'meus pedidos', 'cadastrar pedido']
                ),
            ],
        ),
        new AppStructMember(
            'administração',
            '/admin',
            'administração',
            'dashboard',
            [
                new AppStructMember(
                    'itens',
                    '/admin/itens/gerenciarEstoque',
                    'estoque',
                    'administração',
                    ['editar item', 'cadastrar item', 'gerenciar estoque']
                ),
                new AppStructMember(
                    'pedidos',
                    '/admin/pedidos',
                    'gerenciar pedidos',
                    'administração',
                    ['atendimento', 'atender pedido']
                ),
                new AppStructMember(
                    'usuários',
                    '/admin/usuarios',
                    'gerenciar usuários',
                    'administração',
                    ['editar usuário']
                ),
            ],
        ),
    ],
);

export const AppStructLevel2 = (): AppStructMember[] => {
    let level2 = appStruct.members.map((member: AppStructMember) => {
      return { route: member.route, link: member.link, pageName: member.pageName, parent: member.parent, members: member.members };
    });
    return level2;
};
  
export const AppStructLevel3 = (): AppStructMember[] => {
    let l2 = AppStructLevel2();
    let level3 = l2.reduce((accum: AppStructMember[], { route, members }: AppStructMember) => {
      let parent = route;
      members.forEach((m: any) => {
        accum.push({ route: m.route, link: m.link, pageName: m.pageName, parent: parent, members: m.members });
      });
      return accum;
    }, []);
  
    return level3;
};

export const AppMenuGroups = {
    operacoes: [
        new PanelMenu(
            'Pedidos',
            'Fazer pedidos e consultar pedidos de material realizados na instituição.',
            'bxs-receipt',
            'pedidos'
        ),
        new PanelMenu(
            'Itens',
            'Consultar itens em estoque no almoxarifado do Campus',
            'bxs-component',
            'itens'
        )
    ],
    operacoes_pedidos: [
        new PanelMenu(
            'Criar Pedido',
            'Criar novo pedido de material e enviar para setor de atendimento.',
            'bxs-plus-square',
            'novoPedido'
        ),
        new PanelMenu(
            'Consultar Pedidos',
            'Consultar pedidos de material realizados no campus',
            'bx-search-alt',
            'consultarPedidos'
        ),
        new PanelMenu(
            'Meus Pedidos',
            'Acompanhe o andamento dos seus pedidos',
            'bxs-user-detail',
            'meusPedidos'
        )
    ],
    admin: [
        new PanelMenu(
            'Pedidos',
            'Fazer, consultar e atender pedidos de material realizados na instituição.',
            'bxs-inbox',
            '/admin/pedidos'
        ),
        new PanelMenu(
            'Itens',
            'Consultar, alterar e adicionar novos itens ao almoxarifado do campus',
            'bxs-component',
            'itens/gerenciarEstoque'
        ),
        new PanelMenu(
            'Usuarios',
            'Consultar e editar cadastro de usuários do sistema',
            'bxs-user-account',
            'usuarios'
        )
    ],
    admin_pedidos: [
        new PanelMenu(
            'Atender Pedidos',
            'Atender pedidos de material encaminhados ao setor.',
            'bxs-inbox',
            'atendimento'
        ),
        new PanelMenu(
            'Criar Pedido',
            'Criar novo pedido de material e enviar para setor de atendimento.',
            'bxs-plus-square',
            '/operacoes/pedidos/novoPedido'
        ),
        new PanelMenu(
            'Consultar Pedidos',
            'Consultar pedidos de material realizados no campus',
            'bx-search-alt',
            '/operacoes/pedidos/consultarPedidos'
        ),
        new PanelMenu(
            'Meus Pedidos',
            'Acompanhe o andamento dos seus pedidos',
            'bxs-user-detail',
            '/operacoes/pedidos/meusPedidos'
        )
    ]
}