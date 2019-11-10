import {Component, OnInit} from '@angular/core';
import {WeatherService} from './weather.service';
import {GetWeatherRequest} from '../models/request.model';
import {UNITS_IMPERIAL, UNITS_MERTRIC} from '../shared/analysis/analytic.constant';
import {isDeepEmpty} from '../shared/utils/object.utils';
import {forEach} from '@angular/router/src/utils/collection';
import {City} from '../models/weather.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  indexCity: any;
  units: string;
  weatherInfoSummary: any;
  usedFahrenheitFlay: boolean;
  cityName: string = 'Toronto';
  cities = [];
  hideCityList = true;
  searchLoadingFlag = false;

  constructor(private weatherService: WeatherService) {
	  this.indexCity = new City('1', 'Toronto');
	  this.usedFahrenheitFlay = false;
    this.units = UNITS_MERTRIC;
    // I want to do a input search, but I don't have an interface to get a list of cities
    // So I have to define a city list first.
    this.cities = [{
      id: 1,
      cityName: 'Toronto'
    }, {
      id: 2,
      cityName: 'Ottawa'
    }, {
      id: 3,
      cityName: 'Shanghai'
    }, {
      id: 4,
      cityName: 'Vancouver'
    }, {
      id: 5,
      cityName: 'London'
    }];
  }

  ngOnInit() {
    this.getWeatherByCityName(this.indexCity, this.units);
  }

  /**
   * get city weather by city name
   * @param city, units
   */
  getWeatherByCityName(city, units): void {
	  this.searchLoadingFlag = true;
    this.weatherInfoSummary = null;
    const getWeatherReq = new GetWeatherRequest(city.cityName, units);

    this.weatherService.getWeather(getWeatherReq).then(data => {
      if (!isDeepEmpty(data) && !isDeepEmpty(data.list)) {
        this.weatherInfoSummary = data;
        this.weatherInfoSummary.list = this.getDailyWeatherGroup(this.weatherInfoSummary);
      } else {
        console.log('error', data);
      }
      this.searchLoadingFlag = false;
    }).catch(e => {
      console.error(e);
      this.searchLoadingFlag = true;
    });
  }

  /**
   * Re-integrate the weather in the return value on a daily basis
   * @param weatherInfo
   */
  getDailyWeatherGroup(weatherInfo: any): any {
    const dailyWeatherMap = new Map<string, any>();
    const result = [];

    if (!isDeepEmpty(weatherInfo) && !isDeepEmpty(weatherInfo.list)) {
      weatherInfo.list.forEach(item => setDailyWeatherGroup(item));
    }

    dailyWeatherMap.forEach(value => result.push(value));
    return result;

    // Integrate all weatherInfo for each day
    function setDailyWeatherGroup(item: any): void {
      const day = item.dt_txt.trim().substring(8, 10);
      let dailySummary = dailyWeatherMap.get(day);

      if (!dailySummary) {
        dailySummary = setDailyWeather(item);
        dailyWeatherMap.set(day, dailySummary);
      }
      dailySummary.weatherInfos.push(item);
    }

    // convert to the DailyWeatherSummary model
    function setDailyWeather(item: any): any {
      return {
        day: item.dt_txt,
        weatherInfos: []
      };
    }
  }

  /**
   * When the user chooses to view the Fahrenheit re-call interface
   * @param usedFahrenheitFlay
   */
  changedToFahrenheit(usedFahrenheitFlay: boolean): void {
    this.units = usedFahrenheitFlay ? UNITS_IMPERIAL : UNITS_MERTRIC;
    this.getWeatherByCityName(this.indexCity, this.units);
  }

  /**
   * search city weather by input form
   */
  toSearchCityWeather(event: Event) {
    if (this.indexCity) {
       this.getWeatherByCityName(this.indexCity,  this.units);
       this.hideCityList = true;
    }
  }

  /**
   * click city item to search selected city weather
   * @param city
   */
  SearchCityWeather(city: City): void {
    this.indexCity = Object.assign({}, city);
    this.cityName = city.cityName;
    this.getWeatherByCityName(city, this.units);
    this.hideCityList = true;
  }

  /**
   * search input box changed
   */
  inputNameChange(): void {
    this.hideCityList = false;
  }

}
