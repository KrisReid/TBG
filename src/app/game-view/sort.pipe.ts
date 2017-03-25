import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: "sort"})
export class ArraySortPipe implements PipeTransform {
  transform(array: Array<any>): Array<string> {
    array.sort((a: any, b: any) => {
      if (a.date < b.date) {
        return -1;
      } else if (a.date > b.date) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
