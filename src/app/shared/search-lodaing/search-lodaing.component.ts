import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-search-lodaing',
  templateUrl: './search-lodaing.component.html',
  styleUrls: ['./search-lodaing.component.scss']
})
export class SearchLodaingComponent implements OnInit {
  @Input() searchLoadingFlag: boolean;
  @Input() weatherInfoSummary: any;

  constructor() {
    this.searchLoadingFlag = false;
  }

  ngOnInit() {
  }

}
