import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../app-service.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(data: Item[], search: string): Item[] {
    if(!search.trim()) {
      return data
    }else {
      return data.filter(item => {
        return item.name.toLowerCase().includes(search.toLowerCase())
              || item.email.toLowerCase().includes(search.toLowerCase()) 
      })
    }
  };

}
