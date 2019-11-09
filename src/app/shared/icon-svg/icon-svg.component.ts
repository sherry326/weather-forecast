import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-icon-svg',
  templateUrl: './icon-svg.component.html',
  styleUrls: ['./icon-svg.component.css']
})
export class IconSvgComponent implements OnInit {
  @Input() iconId: string;

  constructor() { }

  ngOnInit() {
  }

}
