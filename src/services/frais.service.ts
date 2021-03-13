import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FraisService {

  private urlEnv = environment.Url_base;
  constructor(private httpClient: HttpClient) { }

  returnFrais(montant: number) {
    return  this.httpClient.post(this.urlEnv + '/fraisis', {
      montant
    });
  }

}
