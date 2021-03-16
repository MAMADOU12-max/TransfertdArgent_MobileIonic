import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

    private urlEnv = environment.Url_base;

    //  private refresh$ = new Subject<void>() ;
    //
    // get refresNeeded$() {
    //   console.log('refresh!!');
    //   return this.refresh$ ;
    // }


  constructor(private httpClient: HttpClient) { }

      compteByidAgence(id: number) {
         return this.httpClient.get(this.urlEnv + '/compte/' + id + '/agence')
         //   .pipe(
         //     tap(() => {
         //          this.refresh$.next() ;
         //     })
         // );
     }
}
