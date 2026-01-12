import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { getErrorMessage, shouldShowError } from '../helpers/form.helper';

@Pipe({
  name: 'formError',
  standalone: true,
  pure: false
})
export class FormErrorPipe implements PipeTransform {
  transform(control: AbstractControl | null, customMessages?: Record<string, string>): string | null {
    if (!shouldShowError(control)) return null;
    return getErrorMessage(control, customMessages);
  }
}
