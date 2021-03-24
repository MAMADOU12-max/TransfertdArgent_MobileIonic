import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

    private urlEnv = environment.Url_base;
    private refres$ = new Subject<void>() ;

    // tslint:disable-next-line:typedef
    get refresNeeded$() {
        return this.refres$ ;
    }
    constructor(private httpClient: HttpClient) { }

    compteByidAgence(id: number) {
       return this.httpClient.get(this.urlEnv + '/compte/' + id + '/agence');
    }
    allCompte() {
      return this.httpClient.get(this.urlEnv + '/comptes?disabled=0');
    }
    // other routes are releted with agence!!
}
