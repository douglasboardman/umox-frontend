import { Left } from '../app/utils/comon';
import { AppStructLevel2, AppStructLevel3 } from './AppStruct';

class Breadcrumb {
    pageName: string;
    link: string;
  
    constructor(pageName: string, link: string) {
      this.pageName = pageName;
      this.link = link;
    }
  }


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