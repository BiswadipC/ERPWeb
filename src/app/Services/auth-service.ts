import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { IAuthenticateUser } from '../ClassesAndInterfaces/IAuthenticateUser';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  path: string = '';

  Authenticate(user: IAuthenticateUser) : Observable<boolean>
  {
    this.path = environment.API_PATH + `authenticate-user`;
    return this.http.post<boolean>(this.path, user, {withCredentials: true});
  } // Authenticate...

  CompanyFinYearSelection(companyId: number, finYearId: number, username: string) : Observable<any>
  {
    this.path = environment.API_PATH + `authenticate-company-fin-year`;
    let httpParams = new HttpParams().set('companyId',companyId)
                          .set('finYearId', finYearId).set('username', username);

    return this.http.post<any>(this.path, '', {withCredentials: true, params: httpParams});
  }

  Logout() : Observable<void>
  {
    this.path = environment.API_PATH + `logout`;
    return this.http.post<void>(this.path, '', {withCredentials: true});
  }
} // class...
