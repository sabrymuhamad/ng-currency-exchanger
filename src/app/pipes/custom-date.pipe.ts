import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: string) {
    let year = new Date(value).getFullYear();
    let month = new Date(value).getMonth() > 8 ? new Date(value).getMonth() + 1 : '0' + (new Date(value).getMonth() + 1);
    let day = new Date(new Date(value).getFullYear(), new Date(value).getMonth() + 1, 0).getDate();

    return `${year}-${month}-${day}`;
  }

}
