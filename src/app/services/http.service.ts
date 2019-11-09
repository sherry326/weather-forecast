import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  get(url: string, headers?: any): Promise<any> {
    return this.http.get(url).toPromise()
      .then(response => {
        console.log('response', response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // private err(err) {
  //   console.log('request error');
  //   console.log(err);
  // }
  //
  // private catch(err) {
  //   console.log('request error', err);
  //   return Observable.of({err});
  // }


}
