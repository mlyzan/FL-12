import { Injectable } from '@angular/core';

export interface Item {
  id: number,
  name: string,
  email: string,
  phone: string
}

@Injectable({
  providedIn: 'root',
})

export class AppService {
  data: Item[] = [];

  getData() {
    return this.data
  };

  deleteItem(id:number): void {
    let index = this.data.findIndex(e => e.id === id);
    this.data.splice(index, 1);
  };

  editItem(obj: Item): void {
    let index = this.data.findIndex(e => e.id === obj.id);
    this.data.splice(index, 1, obj);
  };

  addItem(obj: Item): void {
    this.data.unshift(obj);
  };

}
  