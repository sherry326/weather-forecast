import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import {HttpService} from './services/http.service';
import {WeatherService} from './weather/weather.service';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    HttpService,
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
