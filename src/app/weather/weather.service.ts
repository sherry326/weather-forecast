import { Injectable } from '@angular/core';
import {HttpService} from '../services/http.service';
import {getWeatherRequest} from '../models/request.model';

@Injectable()
export class WeatherService {
  endPoint: string;
  appid: string;


  constructor(private httpService: HttpService) {
    // api.openweathermap.org/data/2.5/forecast?q=Toronto,ca&appid=a94ace9be7994ce0beb8b5e27cefcd7b
    // api.openweathermap.org/data/2.5/forecast/daily?q={city name},{country code}&cnt={cnt}
    // api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=xml&units=metric&cnt=7
    this.endPoint = 'https://api.openweathermap.org/data/2.5/forecast?';
    // this.appid = 'a94ace9be7994ce0beb8b5e27cefcd7b';
    this.appid = 'a94ace9be7994ce0beb8b5e27cefcd7b';

  }

  getWeather(request: getWeatherRequest): Promise<any> {
    return this.httpService.get(`${this.endPoint}q=${request.cityName},ca&units=${request.units}&appid=${this.appid}`);
  }
}
