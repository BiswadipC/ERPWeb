import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ICompany, IFinYear } from '../ClassesAndInterfaces/CompanyAndFinYear';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  http = inject(HttpClient);
  path: string = '';

  GetCompanies() : Observable<ICompany[]>
  {
    this.path = environment.API_PATH + `company`;
    return this.http.get<ICompany[]>(this.path, {withCredentials: true});
  } // GetCompanies...

  GetFinYearsByCompanyId(companyId: number) : Observable<IFinYear[]>
  {
    this.path = environment.API_PATH + `company/years/${companyId}`;
    return this.http.get<IFinYear[]>(this.path, {withCredentials: true})
  } // GetFinYearsByCompanyId...
} // class...
