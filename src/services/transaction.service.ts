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
    getRetraitByCode(code: number) {
       return this.httpClient.get(this.urlEnv + '/transaction/' + code);
    }
    doRetrait(code: number, identifiantBeneficiaire: any) {
       return this.httpClient.put(this.urlEnv + '/recupTransaction/' + code, identifiantBeneficiaire);
    }
    mesTransactions() {
       return this.httpClient.get(this.urlEnv + '/transactionByUser');
    }
    touteslesTransactions() {
       return this.httpClient.get(this.urlEnv + '/transactionByCompte');
    }
    transactions() {
       return this.httpClient.get(this.urlEnv + '/transactions');
    }
    getNocontroltransaction(code: number) {
        return this.httpClient.get(this.urlEnv + '/getdirecttransaction/' + code);
    }
    annulerTransaction(code: number) {
       return this.httpClient.get(this.urlEnv + '/transaction/' + code + '/annuler');
    }
}
