import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './entry-menu';

@Component({
  selector: 'ngx-entry',
  styleUrls: ['entry.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class EntryComponent implements OnInit {
  menu = MENU_ITEMS;
  constructor() { }

  ngOnInit() {
  }

}
