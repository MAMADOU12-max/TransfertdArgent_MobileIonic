import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfilsService {

    private urlEnv = environment.Url_base;
    constructor(private httpClient: HttpClient) { }

    allprofils() {
        return this.httpClient.get(this.urlEnv + '/profils?archivage=0');
    }
}
