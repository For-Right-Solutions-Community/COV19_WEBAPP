import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.scss']
})
export class LocalisationComponent implements OnInit {
  lat = 34.43367;
  lng = 8.7907988;
  constructor() { }

  ngOnInit() {
  }

}
