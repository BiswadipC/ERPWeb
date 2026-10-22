import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUnit } from '../ClassesAndInterfaces/IUnit';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  http = inject(HttpClient);
  path: string = '';

  GetUnits() : Observable<IUnit[]>
  {
    const companyId = sessionStorage.getItem('CompanyId');
    this.path = environment.API_PATH + `units`;
    let params = new HttpParams().set('companyId', String(companyId));
    return this.http.get<IUnit[]>(this.path, {withCredentials: true, params: params});
  } // GetUnits...

  GetUnitByUnitId(unitId: number) : Observable<IUnit>
  {
    this.path = environment.API_PATH + `units/${unitId}`;
    return this.http.get<IUnit>(this.path, {withCredentials: true});
  } // GetUnitByUnitId...

  Save(unit: IUnit) : Observable<any>
  {
    this.path = environment.API_PATH + `units`;
    return this.http.post<any>(this.path, unit, {withCredentials: true});
  } // Save...
} // class...
