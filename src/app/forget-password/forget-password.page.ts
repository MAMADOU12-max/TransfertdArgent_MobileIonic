import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  username: string;
  emptyUsername = false;

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  async presentAlert(mess: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'MONEY-SA',
      message: mess,
      buttons: ['OK']
    });

    await alert.present();
  }

  verifUsername() {
     if (this.username === undefined) {
        this.emptyUsername = true;
        return;
     }
     this.emptyUsername = false;
     console.log(this.username);
  }

  async jeLignore() {
     const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Prompt!',
          message: 'Nous sommes désolé mais si vous ignorez votre username, vous devez vous rapprocher d\'un administrateur\n' +
            'Laissez nous votre email ou numéro, un de nos membre vous contactera ultérieurement!\n' +
            ' Merci!!!!',
          inputs: [
            {
              name: 'name',
              type: 'text',
              placeholder: 'Nom'
            },
            {
              name: 'name8',
              type: 'email',
              placeholder: 'Adresse email',
              cssClass: 'specialClass',
              attributes: {
                maxlength: 15,
                inputmode: 'decimal'
              }
            }
          ],
          buttons: [
            {
              text: 'Annuler',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {}
            }, {
              text: 'Ok',
              handler: (res) => {
                if (res.name && res.name8) {
                   console.log(res.name, res.name8);
                }
                this.presentAlert('Merci');
              }
            }
          ]
        });

     await alert.present();

    }
}
