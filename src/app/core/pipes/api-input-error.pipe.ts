import { Pipe, PipeTransform } from '@angular/core';
import { IAPIValidationError } from '../types/api-validation-error.interface';

@Pipe({
  standalone: true,
  name: 'inputError'
})
export class ValiadationInputError implements PipeTransform {
  transform(errors: IAPIValidationError[], property: string): string {
    const error = errors.find((error) => error.property === property);
    return error ? error.message : '';
  }
}
