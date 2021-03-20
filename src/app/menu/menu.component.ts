import { Component, OnInit } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  helper = new JwtHelperService() ;
  dataUser: any;
  idAgence: number;
  compte: any;
  photoExist = false;
  tokenDecoded: any;

  constructor(private authService: AuthService, private userService: UserService) {}
  ngOnInit() {
    // console.log('homepage!!!!!!!');
    const token =  localStorage.getItem('token') ;
    this.tokenDecoded = this.helper.decodeToken(token) ;
    // console.log(tokenDecoded.id);
    this.userService.getUserById(this.tokenDecoded.id).subscribe(data => {
        //  avatar user;
        this.dataUser = data;
        if (this.dataUser.avatar != null) {
          this.photoExist = true;
        }
    });
  }

}
