import { Injectable } from '@angular/core';
import {HttpService} from '../services/http.service';
import {GetWeatherRequest} from '../models/request.model';
import {API_KEY, ENDPOINT} from '../shared/analysis/analytic.constant';

@Injectable()
export class WeatherService {
  endPoint: string;
  appid: string;

  constructor(private httpService: HttpService) {
    this.endPoint = 'https://api.openweathermap.org/data/2.5/forecast?';
    this.appid = 'a94ace9be7994ce0beb8b5e27cefcd7b';
  }

  getWeather(request: GetWeatherRequest): Promise<any> {
    return this.httpService.get(`${this.endPoint}q=${request.cityName},${request.couctryCode}&units=${request.units}&appid=${this.appid}`);
  }
}
