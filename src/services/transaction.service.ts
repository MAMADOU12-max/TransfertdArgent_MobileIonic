import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {DepotModal} from '../modal/depot.modal';
import {Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

    private urlEnv = environment.Url_base;
  //   private refresh$ = new Subject<void>() ;
  //
  //   get refresNeeded$() {
  //     console.log('refresh!!');
  //     return this.refresh$ ;
  // }
    constructor(private httpClient: HttpClient) { }

    depot(depot: DepotModal) {
       return this.httpClient.post(this.urlEnv + '/transactionClient', depot);
    }
    getRetraitByCode(code: number) {
      return this.httpClient.get(this.urlEnv + '/transaction/' + code);
    }
    doRetrait(code: number, user: any) {
       return this.httpClient.put(this.urlEnv + '/recupTransaction/' + code, user);
       //   .pipe(
       //   tap(() => {
       //     this.refresh$.next() ;
       //   })
       // );
    }
}
