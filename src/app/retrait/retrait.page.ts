import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../../services/transaction.service';
import {AbstractControl, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {AlertController, LoadingController} from '@ionic/angular';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {CompteService} from '../../services/compte.service';

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss'],
})
export class RetraitPage implements OnInit {

  activeEmetteur = true;
  activeBenefice = false;
  validerCode = false;
  nomBeneficiaire: string;
  codeTransaction: AbstractControl;
  errorCode = '';
  formCode: FormGroup;
  dataClient: any;
  dataBeneficiaire: any;
  helper = new JwtHelperService() ;
  idUser: number;

  constructor(private transactionService: TransactionService, private formBuilder: FormBuilder,
              private loadingController: LoadingController, private authService: AuthService, private alertController: AlertController,
              private router: Router, private compteService: CompteService) {}

      ngOnInit() {
          this.formCode = this.formBuilder.group({
            codeTransaction: ['', [Validators.required]]
          });
          this.codeTransaction = this.formCode.controls.codeTransaction;

        // get id user
          const token = this.authService.getToken() ;
          this.idUser = this.helper.decodeToken(token).id ;
      }

      async presentLoading() {
        // console.log(this.connected);
        const loading = await this.loadingController.create({
          cssClass: 'my-loading',
          message: 'chargement...',
          duration: 5
        });
        await loading.present();

        const { role, data } = await loading.onDidDismiss();
        console.log('Loading dismissed!');
      }

      valider() {
            // console.log(this.formCode.value.codeTransaction);
         //   return;
            if (this.formCode.value.codeTransaction === '') {
              this.errorCode = 'Veuillez entrer le code de transaction!';
              return;
           }
            this.presentLoading().then( () => {
              // console.log(this.formCode.value.codeTransaction); return;
              this.transactionService.getRetraitByCode(this.formCode.value.codeTransaction).subscribe(data => {
                  //  console.log(data);
                  this.dataClient = data[1] ;
                  this.dataBeneficiaire = data[2];
                  this.validerCode = true;
                  this.activeEmetteur = true;
                  this.activeBenefice = false;
              }, error => {
                 // console.log(error);
                  this.errorCode = error.error;
              });
          });
      }
      segmentChanged(ev: any) {
         // console.log(this.validerCode);
        if (ev.detail.value === 'bénéficiaire'){
              this.activeBenefice = true;
              this.activeEmetteur = false;
          } else {
              this.activeBenefice = false;
              this.activeEmetteur = true;
          }
      }
      Suivant() {
        this.activeBenefice = true;
        this.activeEmetteur = false;
      }
      cancelRetrait() {
         this.validerCode = false;
         this.activeEmetteur = false;
         this.activeBenefice = false;
         this.formCode.reset();
         this.errorCode = '';
         this.router.navigate(['/homepage']);
      }
      async successRetrait(successMessage: any) {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Opération reussie!',
          message: successMessage,
          buttons: ['OK']
        });
        await alert.present();
      }
      confirmRetrait() {

          // console.log(this.formCode.value.codeTransaction);
          this.transactionService.doRetrait(this.formCode.value.codeTransaction, {user: this.idUser}).subscribe(data => {
              this.successRetrait(data);
              this.formCode.reset();
              this.errorCode = '';
              this.validerCode = false;
              this.activeEmetteur = false;
              this.activeBenefice = false;
              this.router.navigate(['homepage']);
          });
      }
}
