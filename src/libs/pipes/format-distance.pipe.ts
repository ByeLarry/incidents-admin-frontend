import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance',
  standalone: true,
})
export class FormatDistancePipe implements PipeTransform {
  transform(distance?: number): string {
    if (!distance) return '0 м';
    if (distance < 1000) return distance.toFixed(0) + ' м';
    else return (distance / 1000).toFixed(2) + ' км';
  }
}
