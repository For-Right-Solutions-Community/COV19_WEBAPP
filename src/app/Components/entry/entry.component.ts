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
  private roles: string[];
  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.menu=MENU_ITEM_ADMIN;
          return true;
        } else{
          this.menu=MENU_ITEM_BENEVOLENT;
          return true;
        }
      });
    }
  }
}
