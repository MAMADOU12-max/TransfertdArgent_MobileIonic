import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  helper = new JwtHelperService() ;
  dataUser: any;
  photoExist = false;
  constructor( private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
      const token =  localStorage.getItem('token') ;
      const tokenDecoded = this.helper.decodeToken(token) ;
      this.userService.getUserById(tokenDecoded.id).subscribe(data => {
          //  avatar user;
          this.dataUser = data;
          if (this.dataUser.avatar != null) {
              this.photoExist = true;
          }
      });
  }

}
