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


  export function isImageLink(): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      let value = control.value as string
      let ok = value.match(/^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gmi);
      
      if (ok) return null;
      else return { 'notImageLink' : true }
    };
  }

  export function isEnglish(): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      let value = control.value as string
      let ok = value.match(/^[~`!@#$%^&*()_+=[\]\{}|;':",.\/<>?a-zA-Z0-9-]+$/);
      
      if (ok) return null;
      else return { 'notEnglish' : true }
    };
  }