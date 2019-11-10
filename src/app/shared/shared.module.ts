import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToggleComponent} from './toggle/toggle.component';
import { IconSvgComponent } from './icon-svg/icon-svg.component';
import {FormsModule} from '@angular/forms';
import { SearchLodaingComponent } from './search-lodaing/search-lodaing.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ToggleComponent,
    IconSvgComponent,
    SearchLodaingComponent
  ],
  exports: [
    ToggleComponent,
    IconSvgComponent,
    SearchLodaingComponent
  ]
})
export class SharedModule { }
