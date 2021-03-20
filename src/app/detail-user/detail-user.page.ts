import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.page.html',
  styleUrls: ['./detail-user.page.scss'],
})
export class DetailUserPage implements OnInit {

    avatar = false;
    dataUser: any;
    permitted = false;
    helper = new JwtHelperService() ;

    constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router,
                private authService: AuthService) { }

    ngOnInit() {
        // get id from url
        const idUser = +this.activatedRoute.snapshot.params.id ;
        const token = this.authService.getToken();
        const tokenDecoded = this.helper.decodeToken(token) ;
        // console.log(idUser);
        if (tokenDecoded.id === idUser) { this.permitted = true; }
        // console.log(idUser);
        this.userService.getUserById(idUser).subscribe(data => {
            this.dataUser = data;
            if (this.dataUser.avatar === null) {
                this.avatar = false;
                return;
            }
            this.avatar = true;
        });
    }

    modifierUser() {

    }

    delete(id: number) {
        console.log(id);
    }
}
