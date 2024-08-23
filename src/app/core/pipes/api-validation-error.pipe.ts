import { Pipe, PipeTransform } from '@angular/core';
import { IAPIValidationError } from '../types/api-validation-error.interface';

@Pipe({
  standalone: true,
  name: 'APIValidationError'
})
export class APIValiadationError implements PipeTransform {
  transform(errors: IAPIValidationError[]): string {
    return errors
      .map((error) => error.message)
      .join(', ')
      .toLocaleLowerCase()
      .replace(/^[a-z]/, (firstLetter) => firstLetter.toUpperCase());
  }
}
