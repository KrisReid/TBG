import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'contentFilter'})
export class ContentFilterPipe implements PipeTransform {
  transform(value: any[], searchFor: string): any[] {
    if (!searchFor) return value;
    searchFor = searchFor.toLowerCase();
    return value.filter(player =>
      player.fullName.toLowerCase().indexOf(searchFor) >= 0);
  }
}
