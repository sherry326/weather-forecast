import { Component, OnInit } from '@angular/core';
import {WeatherService} from './weather.service';
import {getWeatherRequest} from '../models/request.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  cityName: string;
  units: string;

  constructor(private weatherService: WeatherService) {
    this.cityName = 'Toronto';
  }

  ngOnInit() {
    this.getWeatherByCityName();
  }

  getWeatherByCityName() {
    // this.units = 'imperial';
    this.units = 'metric';
    const getWeatherReq = new getWeatherRequest(this.cityName, this.units);
    return this.weatherService.getWeather(getWeatherReq).then(data => {
      console.log('data', data);
    });
  }
}
