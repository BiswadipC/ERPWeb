import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItemDtl, IItemGst, IItemHead, IItemOpStock } from '../ClassesAndInterfaces/IItem';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  http = inject(HttpClient);
  path: string = '';

  GetItems(companyId: number) : Observable<IItemHead[]>
  {
    this.path = environment.API_PATH + `items`;
    let params = new HttpParams().set('companyId', String(sessionStorage.getItem("CompanyId")));
    return this.http.get<IItemHead[]>(this.path, {withCredentials: true, params: params});
  } // GetItems...

  GetItemDtlsByItemId(itemId: number) : Observable<IItemDtl[]>
  {
    this.path = environment.API_PATH + `items/dtls/${itemId}`;
    return this.http.get<IItemDtl[]>(this.path, {withCredentials: true});
  } // GetItemDtlsByItemId...

  GetItemGstByItemId(itemId: number) : Observable<IItemGst>
  {
    this.path = environment.API_PATH + `items/gst/${itemId}`;
    return this.http.get<IItemGst>(this.path, {withCredentials: true});
  } // GetItemGstByItemId...

  GetItemOpStockByItemId(itemId: number) : Observable<IItemOpStock[]>
  {
    this.path = environment.API_PATH + `items/opstock/${itemId}`;
    return this.http.get<IItemOpStock[]>(this.path, {withCredentials: true});
  } // GetItemOpStockByItemId...

  GetItemByItemId(itemId: number) : Observable<IItemHead>
  {
    this.path = environment.API_PATH + `items/${itemId}`;
    return this.http.get<IItemHead>(this.path, {withCredentials: true});
  } // GetItemByItemId...

  Save(item: IItemHead) : Observable<any>
  {
    this.path = environment.API_PATH + `items`;
    return this.http.post(this.path, item, {withCredentials: true});
  } // Save...
} // class...
