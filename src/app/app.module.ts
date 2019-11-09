import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import {HttpService} from './services/http.service';
import {WeatherService} from './weather/weather.service';
import {HttpClientModule} from '@angular/common/http';
import { ToggleComponent } from './shared/toggle/toggle.component';


@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    ToggleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    HttpService,
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
