import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IParty } from '../ClassesAndInterfaces/IParty';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PartyService {
  path: string = '';
  http = inject(HttpClient);

  GetParties() : Observable<IParty[]>
  {
    this.path = environment.API_PATH + `party`;
    let params = new HttpParams().set('companyId', String(sessionStorage.getItem('CompanyId')));
    return this.http.get<IParty[]>(this.path, {withCredentials: true, params: params});
  } // GetParties...

  GetPartyByPartyCode(partyCode: number) : Observable<IParty>
  {
    this.path = environment.API_PATH + `party/${partyCode}`;
    return this.http.get<IParty>(this.path, {withCredentials: true});
  } // GetPartyByPartyCode...

  Save(party: IParty) : Observable<any>
  {
    this.path = environment.API_PATH + `party`;
    return this.http.post<any>(this.path, party, {withCredentials: true});
  } // Save...
} // class...
