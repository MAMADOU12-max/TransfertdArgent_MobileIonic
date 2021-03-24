import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private urlEnv = environment.Url_base;
    constructor(private httpClient: HttpClient) { }

    getUserById(id: number) {
       return this.httpClient.get(this.urlEnv + '/admin/user/' + id);
    }
    addnewUser(user: FormData) {
       return this.httpClient.post(this.urlEnv + '/admin/users', user);
    }
    deleteUser(id: number) {
       return this.httpClient.delete(this.urlEnv + '/admin/user/' + id);
    }
    getAllUsersActifs() {
       return this.httpClient.get(this.urlEnv + '/admin/users?archivage=0');
    }
    getAllUsersArchived() {
       return this.httpClient.get(this.urlEnv + '/admin/users?archivage=1');
    }
    getNoWorkUsers() {
       return this.httpClient.get(this.urlEnv + '/admin/users?working=0');
    }
    // getAllAdminSystem() {
    //    return this.httpClient.get(this.urlEnv + '/admin/users?type=adminsystem');
    // }
    // getAllCaissier() {
    //   return this.httpClient.get(this.urlEnv + '/admin/users?type=caissier');
    // }
    // getAllUserAgence() {
    //    return this.httpClient.get(this.urlEnv + '/admin/users?type=useragence');
    // }
    // getAllAdminAgence() {
    //    return this.httpClient.get(this.urlEnv + '/admin/users?type=adminagence');
    // }
}
