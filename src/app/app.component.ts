/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { TokenStorageService } from './Components/auth/services/token-storage.service';
import { NotificationService } from './Services/notification.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  private role: string;
  private authority: string;
  constructor(private analytics: AnalyticsService, private seoService: SeoService,private tokenStorage: TokenStorageService,
    private toastrService: NbToastrService,private notificationService:NotificationService) {
  }
  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
    if (this.tokenStorage.getToken()) {
      this.role = this.tokenStorage.getRole();
        console.log(this.role);
        if (this.role === 'ADMIN') {
          this.authority = 'ADMIN';
        } else if (this.role === 'BENEVOLENT') {
          this.authority = 'BENEVOLENT';
        }
        else if (this.role === 'SAMU') {
          this.authority = 'SAMU';
        }else{
          this.authority = 'PATIENT';
        } 
    }
    
  }
  
}
