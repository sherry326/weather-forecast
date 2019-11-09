import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import {HttpService} from './services/http.service';
import {WeatherService} from './weather/weather.service';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from './shared/shared.module';
import { CityFilterPipe } from './weather/cityfilter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
	  CityFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
	  SharedModule
  ],
  providers: [
    HttpService,
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
