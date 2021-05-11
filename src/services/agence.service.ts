import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgenceService {

    private urlEnv = environment.Url_base;
    private refres$ = new Subject<void>() ;

    // tslint:disable-next-line:typedef
    get refresNeeded$() {
      return this.refres$ ;
    }

  constructor(private httpClient: HttpClient) { }

    allAgences() {
      return this.httpClient.get(this.urlEnv + '/agences?disabled=0');
    }

    getAgenceById(id: number) {
       return this.httpClient.get(this.urlEnv + '/agence/' + id);
    }

    deleteAgence(id: number) {
      return this.httpClient.delete(this.urlEnv + '/agence/' + id).pipe(
        tap(() => {
          this.refres$.next() ;
        })
      );
    }

    addAgence(nomAgence: string, adressAgence: string, compte: any, users: any) {
      return this.httpClient.post(this.urlEnv + '/agence', {nomAgence, adressAgence, compte, users}).pipe(
        tap(() => {
          this.refres$.next() ;
        })
      );
    }
}
