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
  cityName: string = "Toronto";
  cities =  [{
      id: 1,
      cityName: 'Toronto'
    }, {
      id: 2,
      cityName: 'London'
    }];
  hideCityList = true;
  searchLoadingFlag = false;

  constructor(private weatherService: WeatherService) {
	this.indexCity = new City('1', 'Toronto');    this.usedFahrenheitFlay = false;
    this.units = UNITS_MERTRIC;
  }

  ngOnInit() {
    this.getWeatherByCityName(this.indexCity, this.units);
    // this.weatherInfo = {
    //   'cod': '200',
    //   'message': 0,
    //   'cnt': 40,
    //   'list': [
    //     {
    //       'dt': 1573300800,
    //       'main': {
    //         'temp': 269.51,
    //         'temp_min': 269.51,
    //         'temp_max': 273.29,
    //         'pressure': 1021,
    //         'sea_level': 1021,
    //         'grnd_level': 1011,
    //         'humidity': 85,
    //         'temp_kf': -3.79
    //       },
    //       'weather': [
    //         {
    //           'id': 600,
    //           'main': 'Snow',
    //           'description': 'light snow',
    //           'icon': '13n'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 97
    //       },
    //       'wind': {
    //         'speed': 5.33,
    //         'deg': 203
    //       },
    //       'snow': {
    //         '3h': 0.13
    //       },
    //       'sys': {
    //         'pod': 'n'
    //       },
    //       'dt_txt': '2019-11-09 12:00:00'
    //     },
    //     {
    //       'dt': 1573311600,
    //       'main': {
    //         'temp': 272.8,
    //         'temp_min': 272.8,
    //         'temp_max': 275.64,
    //         'pressure': 1020,
    //         'sea_level': 1020,
    //         'grnd_level': 1010,
    //         'humidity': 68,
    //         'temp_kf': -2.84
    //       },
    //       'weather': [
    //         {
    //           'id': 600,
    //           'main': 'Snow',
    //           'description': 'light snow',
    //           'icon': '13d'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 100
    //       },
    //       'wind': {
    //         'speed': 6.94,
    //         'deg': 226
    //       },
    //       'snow': {
    //         '3h': 0.19
    //       },
    //       'sys': {
    //         'pod': 'd'
    //       },
    //       'dt_txt': '2019-11-09 15:00:00'
    //     },
    //     {
    //       'dt': 1573322400,
    //       'main': {
    //         'temp': 275.23,
    //         'temp_min': 275.23,
    //         'temp_max': 277.12,
    //         'pressure': 1017,
    //         'sea_level': 1017,
    //         'grnd_level': 1007,
    //         'humidity': 58,
    //         'temp_kf': -1.9
    //       },
    //       'weather': [
    //         {
    //           'id': 600,
    //           'main': 'Snow',
    //           'description': 'light snow',
    //           'icon': '13d'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 100
    //       },
    //       'wind': {
    //         'speed': 9.32,
    //         'deg': 216
    //       },
    //       'snow': {
    //         '3h': 0.06
    //       },
    //       'sys': {
    //         'pod': 'd'
    //       },
    //       'dt_txt': '2019-11-09 18:00:00'
    //     },
    //     {
    //       'dt': 1573333200,
    //       'main': {
    //         'temp': 276.41,
    //         'temp_min': 276.41,
    //         'temp_max': 277.36,
    //         'pressure': 1015,
    //         'sea_level': 1015,
    //         'grnd_level': 1005,
    //         'humidity': 61,
    //         'temp_kf': -0.95
    //       },
    //       'weather': [
    //         {
    //           'id': 804,
    //           'main': 'Clouds',
    //           'description': 'overcast clouds',
    //           'icon': '04d'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 100
    //       },
    //       'wind': {
    //         'speed': 8.88,
    //         'deg': 226
    //       },
    //       'sys': {
    //         'pod': 'd'
    //       },
    //       'dt_txt': '2019-11-09 21:00:00'
    //     },
    //     {
    //       'dt': 1573344000,
    //       'main': {
    //         'temp': 277.87,
    //         'temp_min': 277.87,
    //         'temp_max': 277.87,
    //         'pressure': 1015,
    //         'sea_level': 1015,
    //         'grnd_level': 1005,
    //         'humidity': 61,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 804,
    //           'main': 'Clouds',
    //           'description': 'overcast clouds',
    //           'icon': '04n'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 99
    //       },
    //       'wind': {
    //         'speed': 8.55,
    //         'deg': 227
    //       },
    //       'sys': {
    //         'pod': 'n'
    //       },
    //       'dt_txt': '2019-11-10 00:00:00'
    //     },
    //     {
    //       'dt': 1573354800,
    //       'main': {
    //         'temp': 277.99,
    //         'temp_min': 277.99,
    //         'temp_max': 277.99,
    //         'pressure': 1015,
    //         'sea_level': 1015,
    //         'grnd_level': 1004,
    //         'humidity': 65,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 803,
    //           'main': 'Clouds',
    //           'description': 'broken clouds',
    //           'icon': '04n'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 81
    //       },
    //       'wind': {
    //         'speed': 6.96,
    //         'deg': 238
    //       },
    //       'sys': {
    //         'pod': 'n'
    //       },
    //       'dt_txt': '2019-11-10 03:00:00'
    //     },
    //     {
    //       'dt': 1573365600,
    //       'main': {
    //         'temp': 277.92,
    //         'temp_min': 277.92,
    //         'temp_max': 277.92,
    //         'pressure': 1013,
    //         'sea_level': 1013,
    //         'grnd_level': 1002,
    //         'humidity': 59,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 803,
    //           'main': 'Clouds',
    //           'description': 'broken clouds',
    //           'icon': '04n'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 77
    //       },
    //       'wind': {
    //         'speed': 6.86,
    //         'deg': 241
    //       },
    //       'sys': {
    //         'pod': 'n'
    //       },
    //       'dt_txt': '2019-11-10 06:00:00'
    //     },
    //     {
    //       'dt': 1573376400,
    //       'main': {
    //         'temp': 278.05,
    //         'temp_min': 278.05,
    //         'temp_max': 278.05,
    //         'pressure': 1012,
    //         'sea_level': 1012,
    //         'grnd_level': 1002,
    //         'humidity': 59,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 804,
    //           'main': 'Clouds',
    //           'description': 'overcast clouds',
    //           'icon': '04n'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 100
    //       },
    //       'wind': {
    //         'speed': 6.61,
    //         'deg': 249
    //       },
    //       'sys': {
    //         'pod': 'n'
    //       },
    //       'dt_txt': '2019-11-10 09:00:00'
    //     },
    //     {
    //       'dt': 1573387200,
    //       'main': {
    //         'temp': 277.52,
    //         'temp_min': 277.52,
    //         'temp_max': 277.52,
    //         'pressure': 1012,
    //         'sea_level': 1012,
    //         'grnd_level': 1002,
    //         'humidity': 66,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 804,
    //           'main': 'Clouds',
    //           'description': 'overcast clouds',
    //           'icon': '04n'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 94
    //       },
    //       'wind': {
    //         'speed': 5.83,
    //         'deg': 254
    //       },
    //       'sys': {
    //         'pod': 'n'
    //       },
    //       'dt_txt': '2019-11-10 12:00:00'
    //     },
    //     {
    //       'dt': 1573398000,
    //       'main': {
    //         'temp': 278.08,
    //         'temp_min': 278.08,
    //         'temp_max': 278.08,
    //         'pressure': 1013,
    //         'sea_level': 1013,
    //         'grnd_level': 1003,
    //         'humidity': 70,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 804,
    //           'main': 'Clouds',
    //           'description': 'overcast clouds',
    //           'icon': '04d'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 86
    //       },
    //       'wind': {
    //         'speed': 5.68,
    //         'deg': 261
    //       },
    //       'sys': {
    //         'pod': 'd'
    //       },
    //       'dt_txt': '2019-11-10 15:00:00'
    //     },
    //     {
    //       'dt': 1573408800,
    //       'main': {
    //         'temp': 279.13,
    //         'temp_min': 279.13,
    //         'temp_max': 279.13,
    //         'pressure': 1013,
    //         'sea_level': 1013,
    //         'grnd_level': 1003,
    //         'humidity': 70,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 804,
    //           'main': 'Clouds',
    //           'description': 'overcast clouds',
    //           'icon': '04d'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 93
    //       },
    //       'wind': {
    //         'speed': 5.34,
    //         'deg': 263
    //       },
    //       'sys': {
    //         'pod': 'd'
    //       },
    //       'dt_txt': '2019-11-10 18:00:00'
    //     },
    //     {
    //       'dt': 1573419600,
    //       'main': {
    //         'temp': 278.93,
    //         'temp_min': 278.93,
    //         'temp_max': 278.93,
    //         'pressure': 1014,
    //         'sea_level': 1014,
    //         'grnd_level': 1004,
    //         'humidity': 73,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 804,
    //           'main': 'Clouds',
    //           'description': 'overcast clouds',
    //           'icon': '04d'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 100
    //       },
    //       'wind': {
    //         'speed': 5.33,
    //         'deg': 259
    //       },
    //       'sys': {
    //         'pod': 'd'
    //       },
    //       'dt_txt': '2019-11-10 21:00:00'
    //     },
    //     {
    //       'dt': 1573430400,
    //       'main': {
    //         'temp': 277.23,
    //         'temp_min': 277.23,
    //         'temp_max': 277.23,
    //         'pressure': 1015,
    //         'sea_level': 1015,
    //         'grnd_level': 1005,
    //         'humidity': 94,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 500,
    //           'main': 'Rain',
    //           'description': 'light rain',
    //           'icon': '10n'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 100
    //       },
    //       'wind': {
    //         'speed': 4.08,
    //         'deg': 266
    //       },
    //       'rain': {
    //         '3h': 1.31
    //       },
    //       'sys': {
    //         'pod': 'n'
    //       },
    //       'dt_txt': '2019-11-11 00:00:00'
    //     },
    //     {
    //       'dt': 1573441200,
    //       'main': {
    //         'temp': 276.18,
    //         'temp_min': 276.18,
    //         'temp_max': 276.18,
    //         'pressure': 1016,
    //         'sea_level': 1016,
    //         'grnd_level': 1006,
    //         'humidity': 95,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 500,
    //           'main': 'Rain',
    //           'description': 'light rain',
    //           'icon': '10n'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 100
    //       },
    //       'wind': {
    //         'speed': 3.82,
    //         'deg': 21
    //       },
    //       'rain': {
    //         '3h': 2.38
    //       },
    //       'sys': {
    //         'pod': 'n'
    //       },
    //       'dt_txt': '2019-11-11 03:00:00'
    //     },
    //     {
    //       'dt': 1573452000,
    //       'main': {
    //         'temp': 274.43,
    //         'temp_min': 274.43,
    //         'temp_max': 274.43,
    //         'pressure': 1017,
    //         'sea_level': 1017,
    //         'grnd_level': 1007,
    //         'humidity': 95,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 601,
    //           'main': 'Snow',
    //           'description': 'snow',
    //           'icon': '13n'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 100
    //       },
    //       'wind': {
    //         'speed': 5.46,
    //         'deg': 22
    //       },
    //       'snow': {
    //         '3h': 1.69
    //       },
    //       'sys': {
    //         'pod': 'n'
    //       },
    //       'dt_txt': '2019-11-11 06:00:00'
    //     },
    //     {
    //       'dt': 1573462800,
    //       'main': {
    //         'temp': 274.36,
    //         'temp_min': 274.36,
    //         'temp_max': 274.36,
    //         'pressure': 1018,
    //         'sea_level': 1018,
    //         'grnd_level': 1008,
    //         'humidity': 95,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 600,
    //           'main': 'Snow',
    //           'description': 'light snow',
    //           'icon': '13n'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 100
    //       },
    //       'wind': {
    //         'speed': 5.27,
    //         'deg': 33
    //       },
    //       'snow': {
    //         '3h': 0.94
    //       },
    //       'sys': {
    //         'pod': 'n'
    //       },
    //       'dt_txt': '2019-11-11 09:00:00'
    //     },
    //     {
    //       'dt': 1573473600,
    //       'main': {
    //         'temp': 272.3,
    //         'temp_min': 272.3,
    //         'temp_max': 272.3,
    //         'pressure': 1020,
    //         'sea_level': 1020,
    //         'grnd_level': 1010,
    //         'humidity': 91,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 600,
    //           'main': 'Snow',
    //           'description': 'light snow',
    //           'icon': '13n'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 100
    //       },
    //       'wind': {
    //         'speed': 6.55,
    //         'deg': 27
    //       },
    //       'snow': {
    //         '3h': 0.87
    //       },
    //       'sys': {
    //         'pod': 'n'
    //       },
    //       'dt_txt': '2019-11-11 12:00:00'
    //     },
    //     {
    //       'dt': 1573484400,
    //       'main': {
    //         'temp': 271.36,
    //         'temp_min': 271.36,
    //         'temp_max': 271.36,
    //         'pressure': 1021,
    //         'sea_level': 1021,
    //         'grnd_level': 1012,
    //         'humidity': 91,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 600,
    //           'main': 'Snow',
    //           'description': 'light snow',
    //           'icon': '13d'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 100
    //       },
    //       'wind': {
    //         'speed': 6.89,
    //         'deg': 29
    //       },
    //       'snow': {
    //         '3h': 1.38
    //       },
    //       'sys': {
    //         'pod': 'd'
    //       },
    //       'dt_txt': '2019-11-11 15:00:00'
    //     },
    //     {
    //       'dt': 1573495200,
    //       'main': {
    //         'temp': 271.34,
    //         'temp_min': 271.34,
    //         'temp_max': 271.34,
    //         'pressure': 1021,
    //         'sea_level': 1021,
    //         'grnd_level': 1011,
    //         'humidity': 89,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 601,
    //           'main': 'Snow',
    //           'description': 'snow',
    //           'icon': '13d'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 100
    //       },
    //       'wind': {
    //         'speed': 6.24,
    //         'deg': 24
    //       },
    //       'snow': {
    //         '3h': 1.81
    //       },
    //       'sys': {
    //         'pod': 'd'
    //       },
    //       'dt_txt': '2019-11-11 18:00:00'
    //     },
    //     {
    //       'dt': 1573506000,
    //       'main': {
    //         'temp': 270.8,
    //         'temp_min': 270.8,
    //         'temp_max': 270.8,
    //         'pressure': 1021,
    //         'sea_level': 1021,
    //         'grnd_level': 1011,
    //         'humidity': 91,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 600,
    //           'main': 'Snow',
    //           'description': 'light snow',
    //           'icon': '13d'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 100
    //       },
    //       'wind': {
    //         'speed': 6.54,
    //         'deg': 13
    //       },
    //       'snow': {
    //         '3h': 1.19
    //       },
    //       'sys': {
    //         'pod': 'd'
    //       },
    //       'dt_txt': '2019-11-11 21:00:00'
    //     },
    //     {
    //       'dt': 1573516800,
    //       'main': {
    //         'temp': 270.14,
    //         'temp_min': 270.14,
    //         'temp_max': 270.14,
    //         'pressure': 1023,
    //         'sea_level': 1023,
    //         'grnd_level': 1012,
    //         'humidity': 83,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 600,
    //           'main': 'Snow',
    //           'description': 'light snow',
    //           'icon': '13n'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 100
    //       },
    //       'wind': {
    //         'speed': 5.23,
    //         'deg': 3
    //       },
    //       'snow': {
    //         '3h': 1.12
    //       },
    //       'sys': {
    //         'pod': 'n'
    //       },
    //       'dt_txt': '2019-11-12 00:00:00'
    //     },
    //     {
    //       'dt': 1573527600,
    //       'main': {
    //         'temp': 269.37,
    //         'temp_min': 269.37,
    //         'temp_max': 269.37,
    //         'pressure': 1023,
    //         'sea_level': 1023,
    //         'grnd_level': 1012,
    //         'humidity': 74,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 804,
    //           'main': 'Clouds',
    //           'description': 'overcast clouds',
    //           'icon': '04n'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 100
    //       },
    //       'wind': {
    //         'speed': 5.67,
    //         'deg': 353
    //       },
    //       'sys': {
    //         'pod': 'n'
    //       },
    //       'dt_txt': '2019-11-12 03:00:00'
    //     },
    //     {
    //       'dt': 1573538400,
    //       'main': {
    //         'temp': 268.11,
    //         'temp_min': 268.11,
    //         'temp_max': 268.11,
    //         'pressure': 1023,
    //         'sea_level': 1023,
    //         'grnd_level': 1013,
    //         'humidity': 75,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 804,
    //           'main': 'Clouds',
    //           'description': 'overcast clouds',
    //           'icon': '04n'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 99
    //       },
    //       'wind': {
    //         'speed': 5.7,
    //         'deg': 351
    //       },
    //       'sys': {
    //         'pod': 'n'
    //       },
    //       'dt_txt': '2019-11-12 06:00:00'
    //     },
    //     {
    //       'dt': 1573549200,
    //       'main': {
    //         'temp': 266.75,
    //         'temp_min': 266.75,
    //         'temp_max': 266.75,
    //         'pressure': 1023,
    //         'sea_level': 1023,
    //         'grnd_level': 1013,
    //         'humidity': 73,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 803,
    //           'main': 'Clouds',
    //           'description': 'broken clouds',
    //           'icon': '04n'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 54
    //       },
    //       'wind': {
    //         'speed': 5.62,
    //         'deg': 351
    //       },
    //       'sys': {
    //         'pod': 'n'
    //       },
    //       'dt_txt': '2019-11-12 09:00:00'
    //     },
    //     {
    //       'dt': 1573560000,
    //       'main': {
    //         'temp': 266.24,
    //         'temp_min': 266.24,
    //         'temp_max': 266.24,
    //         'pressure': 1024,
    //         'sea_level': 1024,
    //         'grnd_level': 1013,
    //         'humidity': 70,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 802,
    //           'main': 'Clouds',
    //           'description': 'scattered clouds',
    //           'icon': '03n'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 27
    //       },
    //       'wind': {
    //         'speed': 5.13,
    //         'deg': 360
    //       },
    //       'sys': {
    //         'pod': 'n'
    //       },
    //       'dt_txt': '2019-11-12 12:00:00'
    //     },
    //     {
    //       'dt': 1573570800,
    //       'main': {
    //         'temp': 266.57,
    //         'temp_min': 266.57,
    //         'temp_max': 266.57,
    //         'pressure': 1024,
    //         'sea_level': 1024,
    //         'grnd_level': 1014,
    //         'humidity': 65,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 800,
    //           'main': 'Clear',
    //           'description': 'clear sky',
    //           'icon': '01d'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 0
    //       },
    //       'wind': {
    //         'speed': 4.34,
    //         'deg': 350
    //       },
    //       'sys': {
    //         'pod': 'd'
    //       },
    //       'dt_txt': '2019-11-12 15:00:00'
    //     },
    //     {
    //       'dt': 1573581600,
    //       'main': {
    //         'temp': 268.01,
    //         'temp_min': 268.01,
    //         'temp_max': 268.01,
    //         'pressure': 1023,
    //         'sea_level': 1023,
    //         'grnd_level': 1013,
    //         'humidity': 62,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 802,
    //           'main': 'Clouds',
    //           'description': 'scattered clouds',
    //           'icon': '03d'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 50
    //       },
    //       'wind': {
    //         'speed': 4.62,
    //         'deg': 341
    //       },
    //       'sys': {
    //         'pod': 'd'
    //       },
    //       'dt_txt': '2019-11-12 18:00:00'
    //     },
    //     {
    //       'dt': 1573592400,
    //       'main': {
    //         'temp': 268.64,
    //         'temp_min': 268.64,
    //         'temp_max': 268.64,
    //         'pressure': 1023,
    //         'sea_level': 1023,
    //         'grnd_level': 1013,
    //         'humidity': 62,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 600,
    //           'main': 'Snow',
    //           'description': 'light snow',
    //           'icon': '13d'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 95
    //       },
    //       'wind': {
    //         'speed': 3.83,
    //         'deg': 312
    //       },
    //       'snow': {
    //         '3h': 0.06
    //       },
    //       'sys': {
    //         'pod': 'd'
    //       },
    //       'dt_txt': '2019-11-12 21:00:00'
    //     },
    //     {
    //       'dt': 1573603200,
    //       'main': {
    //         'temp': 267.67,
    //         'temp_min': 267.67,
    //         'temp_max': 267.67,
    //         'pressure': 1024,
    //         'sea_level': 1024,
    //         'grnd_level': 1014,
    //         'humidity': 59,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 600,
    //           'main': 'Snow',
    //           'description': 'light snow',
    //           'icon': '13n'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 82
    //       },
    //       'wind': {
    //         'speed': 6.61,
    //         'deg': 312
    //       },
    //       'snow': {
    //         '3h': 0.25
    //       },
    //       'sys': {
    //         'pod': 'n'
    //       },
    //       'dt_txt': '2019-11-13 00:00:00'
    //     },
    //     {
    //       'dt': 1573614000,
    //       'main': {
    //         'temp': 265.49,
    //         'temp_min': 265.49,
    //         'temp_max': 265.49,
    //         'pressure': 1025,
    //         'sea_level': 1025,
    //         'grnd_level': 1015,
    //         'humidity': 80,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 801,
    //           'main': 'Clouds',
    //           'description': 'few clouds',
    //           'icon': '02n'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 15
    //       },
    //       'wind': {
    //         'speed': 6.15,
    //         'deg': 321
    //       },
    //       'sys': {
    //         'pod': 'n'
    //       },
    //       'dt_txt': '2019-11-13 03:00:00'
    //     },
    //     {
    //       'dt': 1573624800,
    //       'main': {
    //         'temp': 265.44,
    //         'temp_min': 265.44,
    //         'temp_max': 265.44,
    //         'pressure': 1026,
    //         'sea_level': 1026,
    //         'grnd_level': 1015,
    //         'humidity': 69,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 801,
    //           'main': 'Clouds',
    //           'description': 'few clouds',
    //           'icon': '02n'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 19
    //       },
    //       'wind': {
    //         'speed': 5.62,
    //         'deg': 330
    //       },
    //       'sys': {
    //         'pod': 'n'
    //       },
    //       'dt_txt': '2019-11-13 06:00:00'
    //     },
    //     {
    //       'dt': 1573635600,
    //       'main': {
    //         'temp': 265.01,
    //         'temp_min': 265.01,
    //         'temp_max': 265.01,
    //         'pressure': 1027,
    //         'sea_level': 1027,
    //         'grnd_level': 1016,
    //         'humidity': 81,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 801,
    //           'main': 'Clouds',
    //           'description': 'few clouds',
    //           'icon': '02n'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 16
    //       },
    //       'wind': {
    //         'speed': 4.23,
    //         'deg': 323
    //       },
    //       'sys': {
    //         'pod': 'n'
    //       },
    //       'dt_txt': '2019-11-13 09:00:00'
    //     },
    //     {
    //       'dt': 1573646400,
    //       'main': {
    //         'temp': 265.76,
    //         'temp_min': 265.76,
    //         'temp_max': 265.76,
    //         'pressure': 1029,
    //         'sea_level': 1029,
    //         'grnd_level': 1018,
    //         'humidity': 81,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 801,
    //           'main': 'Clouds',
    //           'description': 'few clouds',
    //           'icon': '02n'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 18
    //       },
    //       'wind': {
    //         'speed': 5.62,
    //         'deg': 318
    //       },
    //       'sys': {
    //         'pod': 'n'
    //       },
    //       'dt_txt': '2019-11-13 12:00:00'
    //     },
    //     {
    //       'dt': 1573657200,
    //       'main': {
    //         'temp': 267.69,
    //         'temp_min': 267.69,
    //         'temp_max': 267.69,
    //         'pressure': 1030,
    //         'sea_level': 1030,
    //         'grnd_level': 1020,
    //         'humidity': 74,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 802,
    //           'main': 'Clouds',
    //           'description': 'scattered clouds',
    //           'icon': '03d'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 25
    //       },
    //       'wind': {
    //         'speed': 5.49,
    //         'deg': 331
    //       },
    //       'sys': {
    //         'pod': 'd'
    //       },
    //       'dt_txt': '2019-11-13 15:00:00'
    //     },
    //     {
    //       'dt': 1573668000,
    //       'main': {
    //         'temp': 269.82,
    //         'temp_min': 269.82,
    //         'temp_max': 269.82,
    //         'pressure': 1030,
    //         'sea_level': 1030,
    //         'grnd_level': 1019,
    //         'humidity': 58,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 801,
    //           'main': 'Clouds',
    //           'description': 'few clouds',
    //           'icon': '02d'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 17
    //       },
    //       'wind': {
    //         'speed': 3.4,
    //         'deg': 329
    //       },
    //       'sys': {
    //         'pod': 'd'
    //       },
    //       'dt_txt': '2019-11-13 18:00:00'
    //     },
    //     {
    //       'dt': 1573678800,
    //       'main': {
    //         'temp': 270.28,
    //         'temp_min': 270.28,
    //         'temp_max': 270.28,
    //         'pressure': 1030,
    //         'sea_level': 1030,
    //         'grnd_level': 1020,
    //         'humidity': 58,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 800,
    //           'main': 'Clear',
    //           'description': 'clear sky',
    //           'icon': '01d'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 0
    //       },
    //       'wind': {
    //         'speed': 2.69,
    //         'deg': 317
    //       },
    //       'sys': {
    //         'pod': 'd'
    //       },
    //       'dt_txt': '2019-11-13 21:00:00'
    //     },
    //     {
    //       'dt': 1573689600,
    //       'main': {
    //         'temp': 269.73,
    //         'temp_min': 269.73,
    //         'temp_max': 269.73,
    //         'pressure': 1031,
    //         'sea_level': 1031,
    //         'grnd_level': 1020,
    //         'humidity': 60,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 800,
    //           'main': 'Clear',
    //           'description': 'clear sky',
    //           'icon': '01n'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 1
    //       },
    //       'wind': {
    //         'speed': 1.53,
    //         'deg': 305
    //       },
    //       'sys': {
    //         'pod': 'n'
    //       },
    //       'dt_txt': '2019-11-14 00:00:00'
    //     },
    //     {
    //       'dt': 1573700400,
    //       'main': {
    //         'temp': 269.7,
    //         'temp_min': 269.7,
    //         'temp_max': 269.7,
    //         'pressure': 1031,
    //         'sea_level': 1031,
    //         'grnd_level': 1020,
    //         'humidity': 64,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 802,
    //           'main': 'Clouds',
    //           'description': 'scattered clouds',
    //           'icon': '03n'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 50
    //       },
    //       'wind': {
    //         'speed': 1.58,
    //         'deg': 257
    //       },
    //       'sys': {
    //         'pod': 'n'
    //       },
    //       'dt_txt': '2019-11-14 03:00:00'
    //     },
    //     {
    //       'dt': 1573711200,
    //       'main': {
    //         'temp': 270.6,
    //         'temp_min': 270.6,
    //         'temp_max': 270.6,
    //         'pressure': 1030,
    //         'sea_level': 1030,
    //         'grnd_level': 1020,
    //         'humidity': 59,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 803,
    //           'main': 'Clouds',
    //           'description': 'broken clouds',
    //           'icon': '04n'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 74
    //       },
    //       'wind': {
    //         'speed': 3.29,
    //         'deg': 187
    //       },
    //       'sys': {
    //         'pod': 'n'
    //       },
    //       'dt_txt': '2019-11-14 06:00:00'
    //     },
    //     {
    //       'dt': 1573722000,
    //       'main': {
    //         'temp': 271.5,
    //         'temp_min': 271.5,
    //         'temp_max': 271.5,
    //         'pressure': 1029,
    //         'sea_level': 1029,
    //         'grnd_level': 1018,
    //         'humidity': 59,
    //         'temp_kf': 0
    //       },
    //       'weather': [
    //         {
    //           'id': 804,
    //           'main': 'Clouds',
    //           'description': 'overcast clouds',
    //           'icon': '04n'
    //         }
    //       ],
    //       'clouds': {
    //         'all': 100
    //       },
    //       'wind': {
    //         'speed': 7.31,
    //         'deg': 161
    //       },
    //       'sys': {
    //         'pod': 'n'
    //       },
    //       'dt_txt': '2019-11-14 09:00:00'
    //     }
    //   ],
    //   'city': {
    //     'id': 6167865,
    //     'name': 'Toronto',
    //     'coord': {
    //       'lat': 43.654,
    //       'lon': -79.3873
    //     },
    //     'country': 'CA',
    //     'population': 4612191,
    //     'timezone': -18000,
    //     'sunrise': 1573301012,
    //     'sunset': 1573336756
    //   }
    // }
  }

  /**
   * get city weather by city name
   * @param city, units
   */
  getWeatherByCityName(city, units): void {
	this.searchLoadingFlag = true;
    this.weatherInfoSummary = null;	const getWeatherReq = new GetWeatherRequest(city.cityName, units);    this.weatherService.getWeather(getWeatherReq).then(data => {
      if (!isDeepEmpty(data)) {
        this.weatherInfoSummary = data;
        this.weatherInfoSummary.list = this.getDailyWeatherGroup(this.weatherInfoSummary);

        console.log('weatherInfoSummary', this.weatherInfoSummary);
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

  // search city weather
  toSearchCityWeather(event: Event) {
    if(this.cityName) {
       this.indexCity = new City(this.cityName);
       this.getWeatherByCityName(this.indexCity,  this.units);
       this.hideCityList = true;
    }
  }

  // click city item to search selected city weather
  SearchCityWeather(city: City) {
    this.indexCity = city;
    this.cityName = city.cityName;
    this.getWeatherByCityName(city,  this.units);
    this.hideCityList = true;
  }

  // search input box changed
  inputNameChange() {
    this.hideCityList = false;
  }

}
