import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  transform(items: any, searchTerm: any) {
    if (searchTerm === undefined) {
      return items;
    }

    return items.filter((item: string) => {
      const array = JSON.stringify(item);
      return array.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }
}
