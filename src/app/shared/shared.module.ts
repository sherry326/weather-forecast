import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToggleComponent} from './toggle/toggle.component';
import { IconSvgComponent } from './icon-svg/icon-svg.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ToggleComponent,
    IconSvgComponent
  ],
  exports: [
    ToggleComponent,
    IconSvgComponent
  ]
})
export class SharedModule { }
