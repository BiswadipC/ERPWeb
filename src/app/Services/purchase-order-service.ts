import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPurchaseOrderHead } from '../ClassesAndInterfaces/IPurchaseOrder';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderService {
  http = inject(HttpClient);
  path: string = '';

  GetOrders() : Observable<IPurchaseOrderHead[]>
  {
    this.path = environment.API_PATH + `po`;
    let httpParams = new HttpParams().set('companyId', Number(sessionStorage.getItem('CompanyId')));
    return this.http.get<IPurchaseOrderHead[]>(this.path, {withCredentials: true, params: httpParams});
  } // GetOrders...

  GetOrderByOrderId(orderId: number) : Observable<IPurchaseOrderHead>
  {
    this.path = environment.API_PATH + `po/${orderId}`;
    return this.http.get<IPurchaseOrderHead>(this.path, {withCredentials: true});
  } // GetOrderByOrderId...

  Save(head: IPurchaseOrderHead) : Observable<any>
  {
    this.path = environment.API_PATH + `po`;
    return this.http.post<any>(this.path, head, {withCredentials: true});
  } // Save...
} // class...
