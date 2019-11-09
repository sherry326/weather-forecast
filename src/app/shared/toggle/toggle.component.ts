import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent implements OnInit {
  @Input() checked: boolean;
  @Input() name: string;
  @Input() id: string;
  @Input() description: string;
  @Output() checkedChange: EventEmitter<boolean>;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  constructor() {
    this.checked = true;
    this.checkedChange = new EventEmitter<boolean>();
    this.name = '';
    this.id = '';
  }

  ngOnInit() {
  }

  changeValue() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }

  doButtonClick(): void {
    this.change.emit();
  }
}
