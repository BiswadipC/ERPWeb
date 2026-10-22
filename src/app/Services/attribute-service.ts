import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAttributeDtl, IAttributeHead } from '../ClassesAndInterfaces/IAttribute';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AttributeService {
  http = inject(HttpClient);
  path: string = '';

  GetAttributes() : Observable<IAttributeHead[]>
  {
    this.path = environment.API_PATH + `attributes`;
    const companyId = sessionStorage.getItem('CompanyId');
    let params = new HttpParams().set("companyId", String(companyId));

    return this.http.get<IAttributeHead[]>(this.path, {withCredentials: true, params: params});
  }

  GetAttributeDtlsByAttrHeadId(headId: number) : Observable<IAttributeDtl[]>
  {
    this.path = environment.API_PATH + `attributes/dtls/${headId}`;
    return this.http.get<IAttributeDtl[]>(this.path, {withCredentials: true});
  } // GetAttributeDtlsByAttrHeadId...

  GetAttributeHeadByAttrHeadId(headId: number) : Observable<IAttributeHead>
  {
    this.path = environment.API_PATH + `attributes/${headId}`;
    return this.http.get<IAttributeHead>(this.path, {withCredentials: true});
  } // GetAttributeDtlsByAttrHeadId...

  Save(head: IAttributeHead) : Observable<any>
  {
    this.path = environment.API_PATH + `attributes`;
    return this.http.post<any>(this.path, head, {withCredentials: true});
  }
} // class...
