import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.page.html',
  styleUrls: ['./detail-user.page.scss'],
})
export class DetailUserPage implements OnInit {

    avatar = false;
    dataUser: any;
    permitted = false;
    tokenDecoded: any;
    helper = new JwtHelperService() ;

    constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router,
                private authService: AuthService, private alertController: AlertController) { }

    ngOnInit() {
        // get id from url
        const idUser = +this.activatedRoute.snapshot.params.id ;
        const token = this.authService.getToken();
        this.tokenDecoded = this.helper.decodeToken(token) ;
        console.log(this.tokenDecoded.roles[0]);

        if (this.tokenDecoded.id === idUser || this.tokenDecoded.roles[0] === 'ROLE_ADMINSYSTEM' || this.tokenDecoded.roles[0] === 'ROLE_ADMINAGENCE') {
              this.permitted = true;
        }
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

  async delete(id: number) {
        console.log(id, this.tokenDecoded?.id);
        if (id === this.tokenDecoded?.id) {
            // console.log(this.depotForm.value); return;
          // tslint:disable-next-line:no-shadowed-variable
              const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Confirmation',
              // tslint:disable-next-line:max-line-length
              message: 'Attention, cette action est irréversible, si vous supprimez votre compte vous n\'aurez plus accès à l\'application!',
              buttons: [
                {
                  text: 'Annuler',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: () => {
                     console.log('Confirm Cancel');
                  }
                }, {
                  text: 'Confirmer',
                  handler: () => {

                    this.userService.deleteUser(id).subscribe(data => {
                      this.router.navigate(['/']);
                      this.authService.logout();
                      return;
                    }, error => {
                       console.log(error);
                    });
                  }
                }
              ]
            });
              await alert.present();
        }
        console.log(id);

        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Confirmation',
          // tslint:disable-next-line:max-line-length
          message: 'Voulez vous vraiment blloquer cette utilisateur?',
          buttons: [
            {
              text: 'Annuler',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel');
              }
            }, {
              text: 'Confirmer',
              handler: () => {

                this.userService.deleteUser(id).subscribe(data => {
                    this.router.navigate(['/homepage']);
                    return;
                }, error => {
                  console.log(error);
                });
              }
            }
          ]
        });
        await alert.present();
    }
}
