import {Component, Input, OnInit} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {TransactionService} from '../../../services/transaction.service';

@Component({
  selector: 'app-detail-transaction',
  templateUrl: './detail-transaction.page.html',
  styleUrls: ['./detail-transaction.page.scss'],
})
export class DetailTransactionPage implements OnInit {

  // Data passed in by componentProps
  @Input() datapassed: string;
  transactionData: any;
  emetteurData: any;
  beneficiaireData: any;
  etat: any;

  constructor(private modalCtrl: ModalController, private router: Router, private alertController: AlertController,
              private transactionService: TransactionService) { }

  ngOnInit() {
    // console.log(this.datapassed);
    this.transactionData = this.datapassed[0];
    // console.log(this.transactionData.etat);
    this.etat = this.transactionData.etat;
    this.emetteurData = this.datapassed[1];
    this.beneficiaireData = this.datapassed[2];
  }

  dismissModal() {
     // console.log('click');
      this.modalCtrl.dismiss();
  }

  async GoodTransaction(messageTransaction: any, appreciation: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: appreciation,
      message: messageTransaction,
      buttons: ['OK']
    });

    await alert.present();
  }

  async annulerTransaction() {
    // console.log(this.depotForm.value); return;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: 'Vous êtes sur le point d\'annuler une transaction. Cette actiion est irréversible.' ,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('Confirm Cancel');
          }
        }, {
          text: 'Valider',
          handler: () => {
            // console.log(this.transactionData.codeTransaction);
            this.transactionService.annulerTransaction(this.transactionData.codeTransaction).subscribe(data => {
              this.GoodTransaction(data, 'Reussie');
              this.router.navigate(['/tabs/homepage']);
            }, error => {
              this.GoodTransaction(error.error, 'Erreur');
            });
          }
        }
      ]
    });
    await alert.present();
  }

  returnAcceuil() {
      this.modalCtrl.dismiss();
      this.router.navigate(['/tabs/homepage']);
  }
}
