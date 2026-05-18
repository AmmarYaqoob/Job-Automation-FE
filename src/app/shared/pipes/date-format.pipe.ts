import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: false
})
export class DateFormatPipe implements PipeTransform {
  transform(value: Date | string | null | undefined, format: string = 'short'): string {
    if (!value) {
      return '';
    }
    
    const date = typeof value === 'string' ? new Date(value) : value;
    
    if (isNaN(date.getTime())) {
      return '';
    }
    
    const options: Intl.DateTimeFormatOptions = {
      dateStyle: format === 'short' ? 'short' : format === 'long' ? 'long' : 'short',
      timeStyle: format.includes('time') ? 'short' : undefined
    };
    
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
}
