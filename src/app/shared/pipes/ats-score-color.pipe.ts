import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'atsScoreColor',
  standalone: false
})
export class AtsScoreColorPipe implements PipeTransform {
  transform(score: number): string {
    if (score < 50) {
      return 'warn'; // Red
    } else if (score >= 50 && score <= 70) {
      return 'accent'; // Orange
    } else {
      return 'primary'; // Green
    }
  }
}
