import {Component, Input, OnInit} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {TransactionService} from '../../../services/transaction.service';
import {element} from 'protractor';

@Component({
  selector: 'app-detail-agence',
  templateUrl: './detail-agence.page.html',
  styleUrls: ['./detail-agence.page.scss'],
})
export class DetailAgencePage implements OnInit {


  // Data passed in by componentProps
  @Input() agenceselected: string;
  users: any;
  compte: any;
  etat: any;
  data: any;

  constructor(private modalCtrl: ModalController, private router: Router, private alertController: AlertController,
              private transactionService: TransactionService) { }

  ngOnInit() {
    // console.log(this.agenceselected);
    console.log(this.agenceselected);
    this.data = this.agenceselected;
    // this.data.users.forEach(() => {
    //   console.log(element);
    // });
    // this.transactionData = this.datapassed[0];
    // console.log(this.transactionData.etat);
    // this.etat = this.transactionData.etat;
    // this.emetteurData = this.datapassed[1];
    // this.beneficiaireData = this.datapassed[2];
  }

  dismissModal() {
    console.log('click');
    this.modalCtrl.dismiss();
  }

  // async GoodTransaction(messageTransaction: any) {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Reussie',
  //     message: messageTransaction,
  //     buttons: ['OK']
  //   });
  //
  //   await alert.present();
  // }

  goTothisUser(id) {
    console.log(id);
    this.modalCtrl.dismiss();
    this.router.navigate(['detail-user/' + id]);
  }

  deleteAgence(id) {
    console.log(id);
  }

  updateAgence(id: number) {
    console.log(id);
  }
}
