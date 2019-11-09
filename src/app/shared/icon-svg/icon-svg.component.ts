import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-icon-svg',
  templateUrl: './icon-svg.component.html',
  styleUrls: ['./icon-svg.component.css']
})
export class IconSvgComponent implements OnInit {
  @Input() iconId: string;
  weatherIconArr: string[];

  constructor() {
    this.weatherIconArr = ['13n', '13d', '10n', '04n'];
    this.iconId = this.weatherIconArr.includes(this.iconId) ? this.iconId : '01';
  }

  ngOnInit() {
  }

}
