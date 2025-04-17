import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortNumber'
})
export class ShortNumberPipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || value === undefined) return '';
    if (value < 1000) {
      return value.toString();
    } else {
      const shortValue = value / 1000;
      const formatted = shortValue % 1 === 0 ? shortValue.toString() : shortValue.toFixed(1).replace('.', ',');
      return `${formatted}k`;
    }
  }
}
