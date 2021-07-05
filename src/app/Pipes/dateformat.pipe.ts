import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateformat'
})
export class DateformatPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value) {
      let datePipe = new DatePipe("en-US");
      return  datePipe.transform(value, 'dd.MM.yyyy HH:mm');;
    }
    return '';
  }

}
