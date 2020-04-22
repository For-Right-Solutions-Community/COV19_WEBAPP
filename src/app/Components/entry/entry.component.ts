import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/services/token-storage.service';
import { MENU_ITEM_ADMIN, MENU_ITEM_BENEVOLENT } from './entry-menu';

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
  menu:any ;
  private role: string;
  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.role = this.tokenStorage.getRole();
        console.log(this.role);
        if (this.role === 'ADMIN') {
          this.menu=MENU_ITEM_ADMIN;
          return true;
        } else{
          this.menu=MENU_ITEM_BENEVOLENT;
          return true;
        }
    }
  }
}
