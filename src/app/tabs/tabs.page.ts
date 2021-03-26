import { Component } from '@angular/core';
import {CompteService} from '../../services/compte.service';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage{

    useragence = false;
    adminSystem = false;
    adminagence = false;
    caissier = false;
    helper = new JwtHelperService() ;

    constructor(private compteService: CompteService, private router: Router) {
        const token =  localStorage.getItem('token') ;
        const tokenDecoded = this.helper.decodeToken(token) ;
        // console.log(tokenDecoded?.id);
        if (tokenDecoded.roles[0] === 'ROLE_USERAGENCE') {
          this.useragence = true;
        } else if (tokenDecoded.roles[0] === 'ROLE_ADMINSYSTEM') {
          this.adminSystem = true;
        } else if (tokenDecoded.roles[0] === 'ROLE_ADMINAGENCE') {
          this.adminagence = true;
        } else if (tokenDecoded.roles[0] === 'ROLE_CAISSIER') {
          this.caissier = true;
        }
    }

}
