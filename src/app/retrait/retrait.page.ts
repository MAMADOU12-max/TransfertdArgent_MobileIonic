import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../../services/transaction.service';
import {AbstractControl, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {AlertController, LoadingController} from '@ionic/angular';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss'],
})
export class RetraitPage implements OnInit {

  activeEmetteur = true;
  activeBenefice = false;
  validerCode = false;
  codeTransaction: AbstractControl;
  errorCode = '';
  formCode: FormGroup;
  dataClient: any;
  dataBeneficiaire: any;
  helper = new JwtHelperService() ;
  form: FormGroup;
  identifiantBeneficiaire: any;
  notcni = false;
  badcni = false;

  constructor(private transactionService: TransactionService, private formBuilder: FormBuilder,
              private loadingController: LoadingController, private authService: AuthService, private alertController: AlertController,
              private router: Router) {}

      ngOnInit() {
          this.formCode = this.formBuilder.group({
            codeTransaction: ['', [Validators.required]]
          });
          this.codeTransaction = this.formCode.controls.codeTransaction;
      }
      async valider() {
            const loading = await this.loadingController.create({
              cssClass: 'my-loading',
              message: 'chargement...'
            });
            await loading.present();
            // console.log(this.formCode.value.codeTransaction);

            if (this.formCode.value.codeTransaction === '') {
              this.errorCode = 'Veuillez entrer le code de transaction!';
              loading.dismiss();
              return;
           }
          // console.log(this.formCode.value.codeTransaction); return;
            this.transactionService.getRetraitByCode(this.formCode.value.codeTransaction).subscribe(data => {
                    console.log(data);
                    this.dataClient = data[1] ;
                    this.dataBeneficiaire = data[2];
                    this.validerCode = true;
                    this.activeEmetteur = true;
                    this.activeBenefice = false;
                    loading.dismiss();
                }, error => {
                loading.dismiss();
                this.errorCode = error.error;
          });
      }
      segmentChanged(ev: any) {
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
      async generikAlert(successMessage: any, head: any) {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: head,
          message: successMessage,
          buttons: ['OK']
        });
        await alert.present();
      }
      async confirmRetrait() {
          if (this.identifiantBeneficiaire === null || this.identifiantBeneficiaire === undefined) {
             this.notcni = true;
             this.generikAlert('Vous devez rentrer le numéro d\'identité du bénéficiaire avant de valider!', 'Erreur');
             return;
          } else if (this.identifiantBeneficiaire < 100000 || this.identifiantBeneficiaire > 999999999) {
                this.badcni = true;
                this.notcni = false;
                return;
          }

          const loading = await this.loadingController.create({
            cssClass: 'my-loading',
            message: 'chargement...'
          });
          await loading.present();
          // console.log(this.formCode.value.codeTransaction);
        // tslint:disable-next-line:max-line-length
          this.transactionService.doRetrait(this.formCode.value.codeTransaction, {identifiantBeneficiaire: this.identifiantBeneficiaire}).subscribe(data => {
              this.generikAlert(data, 'Opération reussie!');
              this.formCode.reset();
              this.errorCode = '';
              this.validerCode = false;
              this.activeEmetteur = false;
              this.activeBenefice = false;
              this.router.navigate(['homepage']);
              loading.dismiss();
          }, error => {
            console.log(error);
            loading.dismiss();
          });
      }
}
