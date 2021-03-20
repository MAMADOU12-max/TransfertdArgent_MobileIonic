import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgenceService {

  private urlEnv = environment.Url_base;
  constructor(private httpClient: HttpClient) { }
  allAgences() {
    return this.httpClient.get(this.urlEnv + '/agences?disabled=0');
  }
}
