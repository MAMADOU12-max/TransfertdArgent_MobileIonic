import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepotService {

  private urlEnv = environment.Url_base;
  constructor(private httpClient: HttpClient) { }

  depot(montantDeDepot: number, utilisateur: number) {
     return this.httpClient.post(this.urlEnv + '/depot', {montantDeDepot, utilisateur} );
  }
}
