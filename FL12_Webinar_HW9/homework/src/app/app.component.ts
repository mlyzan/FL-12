import {Component, OnInit} from '@angular/core';
import { AppService, Item } from './app-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data: Item[];
  public addUser = false;
  search = '';
  constructor(private appService: AppService){}

  ngOnInit(): void {
    this.data = this.appService.getData();
  }
}

