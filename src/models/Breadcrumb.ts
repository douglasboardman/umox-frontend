import { Left } from '../app/utils/comon';

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

class Breadcrumb {
    pageName: string;
    link: string;
  
    constructor(pageName: string, link: string) {
      this.pageName = pageName;
      this.link = link;
    }
  }

const appStruct = new AppStruct(
    'Home',
    '/home',
    'Home',
    [
        new AppStructMember(
            'operações',
            '/operacoes',
            'operações',
            'home',
            [
                new AppStructMember(
                    'itens',
                    '/operacoes/itens',
                    'itens',
                    'operações',
                    ['consultar estoque'],
                ),
                new AppStructMember(
                    'pedidos',
                    '/operacoes/pedidos',
                    'pedidos',
                    'operações',
                    ['consultar pedidos', 'meus pedidos', 'cadastrar pedido'],
                ),
            ],
        ),
        new AppStructMember(
            'administração',
            '/admin',
            'administração',
            'home',
            [
                new AppStructMember(
                    'itens',
                    '/admin/itens',
                    'estoque',
                    'administração',
                    ['editar item', 'cadastrar item', 'gerenciar estoque'],
                ),
                new AppStructMember(
                    'pedidos',
                    '/admin/pedidos',
                    'gerenciar Pedidos',
                    'administração',
                    ['atendimento', 'atender pedido'],
                ),
                new AppStructMember(
                    'usuários',
                    '/admin/usuarios',
                    'usuários',
                    'administração',
                    ['editar usuário'],
                ),
            ],
        ),
    ],
);


const AppStructLevel2 = (): AppStructMember[] => {
    let level2 = appStruct.members.map((member: AppStructMember) => {
      return { route: member.route, link: member.link, pageName: member.pageName, parent: member.parent, members: member.members };
    });
    return level2;
};
  
 const AppStructLevel3 = (): AppStructMember[] => {
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

function priMaiuscula(palavra: string): string {
    let pLetra = Left(palavra, 1);
    let str = palavra.substring(1, palavra.length);
    return pLetra.toUpperCase() + str;
}

export function setBreadcrumbs(tituloPagina: string): { pageName: string, link: string }[] {
    
    let str = tituloPagina.toLowerCase()
    let pm = priMaiuscula;
    let breadcrumb!: Array<Breadcrumb>;

    let level2 = AppStructLevel2()
    let level3 = AppStructLevel3()
    let level4: Array<{pageName: string, parent: string}> = [];
    let level2Pages: Array<string> = [], level3Pages: Array<string> = [], level4Pages: Array<string> = [];
    
    level2.forEach((item) => {
        level2Pages.push(item.pageName)
    })

    level3.forEach((item) => {
        level3Pages.push(item.pageName)
        item.members.forEach((m) => {
            level4.push({pageName: m, parent: item.pageName})
            level4Pages.push(m);
        })
    })

    
    if(level2Pages!.includes(str)) {
        let i = level2Pages!.indexOf(str)
        breadcrumb = [
            {pageName: 'Home', link: '/home'},
            {pageName: pm(level2[i].pageName), link: ''}
        ]
    } else if(level3Pages!.includes(str)) {
        let j = level3Pages!.indexOf(str)
        let i = level2Pages!.indexOf(level3[j].parent);
        breadcrumb = [
            {pageName: 'Home', link: '/home'},
            {pageName: pm(level2[i].route), link: level2[i].link},
            {pageName: pm(level3[j].pageName), link: ''}
        ]
    } else if(level4Pages!.includes(str)) {
        let k = level4Pages!.indexOf(str)
        let j = level3Pages!.indexOf(level4![k].parent)
        let i = level2Pages!.indexOf(level3[j].parent);
        breadcrumb = [
            {pageName: 'Home', link: '/home'},
            {pageName: pm(level2[i].route), link: level2[i].link},
            {pageName: pm(level3[j].route), link: level3[j].link},
            {pageName: pm(level4![k].pageName), link: ''}
        ]
    }

    return breadcrumb;
}