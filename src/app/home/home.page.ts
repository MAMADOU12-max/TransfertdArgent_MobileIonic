import {Component, OnInit} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {NavigationEnd, Router} from '@angular/router';
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

  caissier = false;
  adminSystem = false;
  useragence = false;
  adminagence = false;
  helper = new JwtHelperService() ;
  avatar: any;
  idAgence: number;
  compte: any;
  photoExist = false;

  constructor(public alertController: AlertController, private router: Router, private authService: AuthService
            , private userService: UserService, private compteService: CompteService) {}
  ngOnInit() {
   console.log('HOME Page');
    //
      const token = this.authService.getToken() ;
      const tokenDecoded = this.helper.decodeToken(token) ;

      if (tokenDecoded.roles[0] === 'ROLE_USERAGENCE') {
          this.useragence = true;
      } else if (tokenDecoded.roles[0] === 'ROLE_ADMINSYSTEM') {
          this.adminSystem = true;
      } else if (tokenDecoded.roles[0] === 'ROLE_ADMINAGENCE') {
        this.adminagence = true;
      } else if (tokenDecoded.roles[0] === 'ROLE_CAISSIER') {
         this.caissier = true;
      }

    // console.log(tokenDecoded.id);
      this.userService.getUserById(tokenDecoded.id).subscribe(data => {
          this.avatar = data['avatar'];
          if (this.avatar != null) {
            this.photoExist = true;
          }
          this.idAgence = data['agence']['id'] ;
      });
      this.compteService.compteByidAgence(4).subscribe(compte => {
        this.compte = compte;
        // console.log(this.compte);
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

  // ngAfterViewInit(){
  //   console.log('Home ngAfterViewInit');
  // }

}
