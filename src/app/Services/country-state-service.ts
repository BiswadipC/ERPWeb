import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICountry, IState } from '../ClassesAndInterfaces/CountryAndState';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountryStateService {
  http = inject(HttpClient);
  path: string = '';

  GetCountries() : Observable<ICountry[]>
  {
    this.path = environment.API_PATH + `countries`;
    return this.http.get<ICountry[]>(this.path, {withCredentials: true});
  } // GetCountries...

  GetStatesByCountryCode(countryCode: string) : Observable<IState[]>
  {
    this.path = environment.API_PATH + `countries/states/${countryCode}`;
    return this.http.get<IState[]>(this.path, {withCredentials: true});
  } // GetStatesByCountryCode...
} // class...
