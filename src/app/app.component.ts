/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { TokenStorageService } from './Components/auth/services/token-storage.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  private roles: string[];
  private authority: string;
  constructor(private analytics: AnalyticsService, private seoService: SeoService,private tokenStorage: TokenStorageService) {
  }
  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
    if (this.tokenStorage.getToken()) {
      this.roles = ['ROLE_BENEVOLENT']
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'ADMIN';
          return false;
        } else if (role === 'ROLE_BENEVOLENT') {
          this.authority = 'BENEVOLENT';
          return false;
        }
        else if (role === 'ROLE_SAMU') {
          this.authority = 'SAMU';
          return false;
        }
        this.authority = 'PATIENT';
        return true;
      });
    }
  }
}
