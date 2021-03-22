import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepotService {

  private urlEnv = environment.Url_base;
  private refres$ = new Subject<void>() ;

  // tslint:disable-next-line:typedef
  get refresNeeded$() {
     return this.refres$ ;
  }

  constructor(private httpClient: HttpClient) { }

  depot(montantDeDepot: number) {
     return this.httpClient.post(this.urlEnv + '/depot', montantDeDepot ).pipe(
       tap(() => {
         this.refres$.next() ;
       })
     );
  }
  listDepot() {
     return this.httpClient.get(this.urlEnv + '/caissiers?Archivage=0');
  }
  annulerDepot() {
    return this.httpClient.get(this.urlEnv + '/depot/annuler').pipe(
      tap(() => {
        this.refres$.next() ;
      })
    );
  }
}
