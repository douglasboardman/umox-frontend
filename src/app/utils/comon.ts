import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function matchValidator(
  matchTo: string, 
  reverse?: boolean
): ValidatorFn {
  return (control: AbstractControl): 
  ValidationErrors | null => {
    if (control.parent && reverse) {
      const c = (control.parent?.controls as any)[matchTo] 
       AbstractControl;
      if (c) {
        c.updateValueAndValidity();
      }
      return null;
    }
    return !!control.parent &&
      !!control.parent.value &&
      control.value === 
      (control.parent?.controls as any)[matchTo].value
      ? null
      : { matching: true };
  };
}

// FUNÇÕES AUXILIARES
/**
 * 
 * @param {string} str 
 * @param {number} n 
 * @returns a partial string of 'n' letters picked from the left of the 'str'
 */
export function Left(str: string, n: number){
	if (n <= 0)
	    return "";
	else if (n > String(str).length)
	    return str;
	else
	    return String(str).substring(0,n);
}

/**
 * 
 * @param {string} str 
 * @param {number} n 
 * @returns a partial string of 'n' letters picked from the right of the 'str'
 */
export function Right(str: string, n: number){
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}

/**
 * 
 * @param {string} emailUsuario 
 * @returns boolean as a result of the regex email string test
 */
export function emailValido(emailUsuario: string) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailUsuario);
}

// IMPEDE A INSERÇÃO DE VALORES INDESEJADOS NO CAMPO QUANTITATIVO DO ITEM
/**
 * 
 * @param {HTMLInputElement} input 
 */
export function checaInputQtd(input: HTMLInputElement) {
    let max = parseInt(input.max);
    let min = input.min == "" ? 0 : parseInt(input.min);
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