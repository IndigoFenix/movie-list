import { AbstractControl, ValidatorFn } from '@angular/forms';

export function isIMDBLink(): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      let value = control.value as string;
      let ok = value.match(/https?:\/\/(?:.*\.|.*)\.imdb.com\/(?:t|T)itle(?:\?|\/)(..\d+)/i);

      if (ok) return null;
      else return { 'notIMDBLink' : true }
    };
  }


  export function isPosterLink(): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      let value = control.value as string;
      let ok = value.match(/https:\/\/(?:.*\.|.*)\.imdb.com\/(?:t|T)itle(?:\?|\/)(..\d+)/i);

      console.log('match',value,ok);
      
      if (ok) return null;
      else return { 'notPosterLink' : true }
    };
  }