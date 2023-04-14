import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const unidades = [ "UNIDADE","PACOTE","CAIXA","KG","GR","L","ML","M" ]

export function matchValidator(
  matchTo: string,
  reverse?: boolean
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.parent && reverse) {
      const c = (control.parent?.controls as any)[matchTo];
      AbstractControl;
      if (c) {
        c.updateValueAndValidity();
      }
      return null;
    }
    return !!control.parent &&
      !!control.parent.value &&
      control.value === (control.parent?.controls as any)[matchTo].value
      ? null
      : { matching: true };
  };
}

// FUNÇÕES AUXILIARES

export function Left(str: string, n: number) {
  if (n <= 0) return '';
  else if (n > String(str).length) return str;
  else return String(str).substring(0, n);
}


export function Right(str: string, n: number) {
  if (n <= 0) return '';
  else if (n > String(str).length) return str;
  else {
    var iLen = String(str).length;
    return String(str).substring(iLen, iLen - n);
  }
}


export function emailValido(emailUsuario: string) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailUsuario);
}


export function checaInputQtd(input: HTMLInputElement) {
  let max = parseInt(input.max);
  let min = input.min == '' ? 0 : parseInt(input.min);
  let val = parseInt(input.value);

  let regEx = /[1-9]{1,5}/;

  if (val > max) {
    input.value = String(max);
  }

  if (val < min) {
    input.value = String(min);
  }

  if (!input.value.match(regEx)) {
    input.value = '';
  }
}

export function dateToBD(dt: Date) {
  let dia = dt.getDate();
  let mes = dt.getMonth() + 1;
  let ano = dt.getFullYear();
  let d: string;
  let m: string;

  d = dia < 10 ? '0' + dia : String(dia);
  m = mes < 10 ? '0' + mes : String(mes);

  return `${ano}-${m}-${d}`;
}

export function dateToView(dt: Date) {
  if (dt == null) {
    return '-';
  } else {
    let date = new Date(dt);
    let dia = date.getDate();
    let mes = date.getMonth() + 1;
    let ano = date.getFullYear();
    let d: string;
    let m: string;

    d = dia < 10 ? '0' + dia : String(dia);
    m = mes < 10 ? '0' + mes : String(mes);

    return `${d}/${m}/${ano}`;
  }
}

export function formatIdPedido(id: string) {
  let l = id.length;
  let s = '0';
  let formattedId = s.repeat(4 - l) + id;
  return formattedId;
}

export function screenSizeAjust(width: number) {
  let viewMode!: string;
  if(width > 1480) {
    viewMode = 'normal-view';
  } else if(width <= 950) {
    viewMode = 'responsive';
  } else {
    viewMode = 'minimalist';
  }

  localStorage.setItem('view-mode', viewMode);
}

export function replaceSpecialChars(str: string)
{
    str = str.replace(/[ÀÁÂÃÄÅ]/,"A");
    str = str.replace(/[ÈÉÊË]/,"E");
    str = str.replace(/[IÍÌÏÎ]/,"I");
    str = str.replace(/[OÓÒÕÖÔ]/,"O");
    str = str.replace(/[UÚÙÜÛ]/,"U");
    str = str.replace(/[Ç]/,"C");

    return str.replace(/[^a-z0-9]/gi,''); 
}
