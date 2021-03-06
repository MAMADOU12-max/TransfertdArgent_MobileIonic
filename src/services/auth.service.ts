import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
// @ts-ignore
import {JwtHelperService} from '@auth0/angular-jwt';
// @ts-ignore
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  roleuser: string;
  private urlEnv = environment.Url_base;
  helper = new JwtHelperService() ;

  constructor(private httpClient: HttpClient, private router: Router) { }

  // tslint:disable-next-line:typedef
  Authentification(username: string, password: string) {
        return  this.httpClient.post(this.urlEnv + '/login', {
          username, password
        }).pipe(
            map((response: any) => {
                const tokenDecoded = this.helper.decodeToken(response.token) ;
                localStorage.setItem('token', response.token) ;
            })
        ) ;
  }
  // tslint:disable-next-line:typedef
  getToken() {
      const token = localStorage.getItem('token') ;
      if (token !== 'undefined') {
          return token ;
      }
      return null ;
  }
  // tslint:disable-next-line:typedef
  logout() {
      const token = localStorage.getItem('token') ;
      return  localStorage.clear();
  }
}
