import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Développé par l'équipe de <b><a href="http://www.frsdev.com/" target="_blank">FRS</a></b> 2020
    </span>
    <div class="socials">
      <a href="https://github.com/For-Right-Solutions-Community" target="_blank" class="ion ion-social-github"></a>
      <a href="https://www.facebook.com/frsdev/" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://www.linkedin.com/company/for-right-solutions/" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
