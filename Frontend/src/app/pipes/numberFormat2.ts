import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'numberFormat2' })
export class NumberFormat2Pipe implements PipeTransform {
  transform(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
