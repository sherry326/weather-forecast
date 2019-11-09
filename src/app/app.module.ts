import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import {HttpService} from './services/http.service';
import {WeatherService} from './weather/weather.service';
import {HttpClientModule} from '@angular/common/http';
import { ToggleComponent } from './shared/toggle/toggle.component';
import { CityFilterPipe } from './weather/cityfilter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    ToggleComponent,
    CityFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    HttpService,
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
