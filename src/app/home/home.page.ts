import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {UserService} from '../../services/user.service';
import {CompteService} from '../../services/compte.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  helper = new JwtHelperService() ;
  avatar: any;
  idAgence: number;
  solde: number;
  miseajour: any;
  photoExist = false;
  constructor(public alertController: AlertController, private router: Router, private authService: AuthService
            , private userService: UserService, private compteService: CompteService) {}

  ngOnInit() {
      const token = this.authService.getToken() ;
      const tokenDecoded = this.helper.decodeToken(token) ;
      // console.log(tokenDecoded.id);
      this.userService.getUserById(tokenDecoded.id).subscribe(data => {
          this.avatar = data['avatar'];
          if (this.avatar != null) {
            this.photoExist = true;
          }
          this.idAgence = data['agence']['id'] ;
          // console.log(this.idAgence);
        // tslint:disable-next-line:no-shadowed-variable
          this.compteService.compteByidAgence(this.idAgence).subscribe(compte => {
              this.solde = compte['solde'];
              this.miseajour = compte['miseajour'];
          });
      });
  }

  async disconnect() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirmation!',
        message: 'Voulez vous vraiment déconnecter?',
        buttons: [
          {
            text: 'Non',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              // console.log('Confirm Cancel: NONNN');
            }
          }, {
            text: 'Oui',
            handler: () => {
              this.authService.logout();
              this.router.navigate(['']);
            }
          }
        ]
      });

      await alert.present();
  }

}
