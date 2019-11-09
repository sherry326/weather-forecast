import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToggleComponent} from './toggle/toggle.component';
import { IconSvgComponent } from './icon-svg/icon-svg.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
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
