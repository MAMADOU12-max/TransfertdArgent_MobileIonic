import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {DepotModal} from '../modal/depot.modal';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

    private urlEnv = environment.Url_base;
    constructor(private httpClient: HttpClient) { }

    depot(depot: DepotModal) {
       return this.httpClient.post(this.urlEnv + '/transactionClient', depot);
    }
}
