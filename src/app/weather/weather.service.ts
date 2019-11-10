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
    this.appid = API_KEY;
  }

  getWeather(request: GetWeatherRequest): Promise<any> {
    return this.httpService.get(`${this.endPoint}q=${request.cityName}&units=${request.units}&appid=${this.appid}`);
  }
}
