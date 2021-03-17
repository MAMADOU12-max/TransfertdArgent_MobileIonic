import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

    private urlEnv = environment.Url_base;
    constructor(private httpClient: HttpClient) { }
    compteByidAgence(id: number) {
       return this.httpClient.get(this.urlEnv + '/compte/' + id + '/agence');
    }
}
