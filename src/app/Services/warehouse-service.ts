import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IWarehouse } from '../ClassesAndInterfaces/IWarehouse';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  http = inject(HttpClient);
  path: string = '';

  GetWarehouses() : Observable<IWarehouse[]>
  {
    this.path = environment.API_PATH + `warehouses`;
    let params = new HttpParams().set('companyId', String(sessionStorage.getItem('CompanyId')));
    return this.http.get<IWarehouse[]>(this.path, {withCredentials: true, params: params});
  } // GetWarehouses...

  GetWarehouseById(id: number) : Observable<IWarehouse>
  {
    this.path = environment.API_PATH + `warehouses/${id}`;
    return this.http.get<IWarehouse>(this.path, {withCredentials: true});
  } // GetWarehouseById...

  Save(wh: IWarehouse) : Observable<any>
  {
    this.path = environment.API_PATH + `warehouses`;
    return this.http.post<any>(this.path, wh, {withCredentials: true});
  } // Save...
} // class...
