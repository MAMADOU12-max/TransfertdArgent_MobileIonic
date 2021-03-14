import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController} from '@ionic/angular';
import Swal from 'sweetalert2';
import {AuthService} from '../../services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {TransactionService} from '../../services/transaction.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.page.html',
  styleUrls: ['./depot.page.scss'],
})
export class DepotPage implements OnInit {

  activeBenefice = false;
  activeEmetteur = true;
  montant: AbstractControl;
  frais: AbstractControl;
  total: AbstractControl;
  user: number;
  nomCompletEmetteur: string;
  nomCompletBeneficiaire: string;
  nomEmetteur: AbstractControl;
  prenomEmetteur: AbstractControl;
  phoneEmetteur: AbstractControl;
  nomBeneficaire: AbstractControl;
  prenomBeneficaire: AbstractControl;
  identityNumberEmetteur: AbstractControl;
  phoneBeneficiaire: AbstractControl;
  depotForm: FormGroup;
  helper = new JwtHelperService() ;

  constructor(private formBuilder: FormBuilder, public alertController: AlertController, private router: Router,
              private authService: AuthService, private transactionService: TransactionService) { }

  ngOnInit() {
      const token = this.authService.getToken() ;
      const tokenDecoded = this.helper.decodeToken(token) ;
       // console.log(tokenDecoded['id']);
      this.depotForm = this.formBuilder.group({
          // frais: [''],
          user: [tokenDecoded.id, []],
          montant: ['', [Validators.required]],
          // total: ['', [Validators.required]],
          nomEmetteur: ['', [Validators.required]],
          prenomEmetteur: ['', [Validators.required]],
          nomBeneficaire: ['', [Validators.required]],
          prenomBeneficaire: ['', [Validators.required]],
          identityNumberEmetteur: ['', [Validators.required]],
          phoneEmetteur: ['', [Validators.required]],
          phoneBeneficiaire: ['', [Validators.required]]
      });
      // this.frais = this.depotForm.controls.frais;
      this.montant = this.depotForm.controls.montant;
      // this.total = this.depotForm.controls.total;
      this.nomEmetteur = this.depotForm.controls.nomEmetteur;
      this.prenomEmetteur = this.depotForm.controls.prenomEmetteur;
      this.phoneEmetteur = this.depotForm.controls.phoneEmetteur;
      this.nomBeneficaire = this.depotForm.controls.nomBeneficaire;
      this.prenomBeneficaire = this.depotForm.controls.prenomBeneficaire;
      this.phoneBeneficiaire = this.depotForm.controls.phoneBeneficiaire;
      this.identityNumberEmetteur = this.depotForm.controls.identityNumberEmetteur;
  }

    segmentChanged(ev: any) {
         if (ev.detail.value === 'bénéficiaire'){
            this.activeBenefice = true;
            this.activeEmetteur = false;
            // console.log(ev);
         } else {
             this.activeBenefice = false;
             this.activeEmetteur = true;
             // console.log('Emetteur');
         }
    }

    Suivant() {
        this.activeBenefice = true;
        this.activeEmetteur = false;
    }

    async GoodTransaction() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Reussie',
        message: 'Le dépôt s\'est bien effectué. Merci',
        buttons: ['OK']
      });

      await alert.present();
    }

  async Terminer() {
        // this.nomCompletEmetteur = this.depotForm.value.prenom + ' ' + this.depotForm.value.nom;
        // console.log(this.nomCompletEmetteur);
       console.log(this.depotForm.value);
       const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirmation',
        message: ` <br>EMETTEUR <h4>${this.depotForm.value.prenomEmetteur} ${this.depotForm.value.nomEmetteur}</h4>
                    <br> TELEPHONE<h4>${this.depotForm.value.phoneEmetteur}</h4>
                    <br> N° CNI<h4>${this.depotForm.value.identityNumberEmetteur}</h4>
                    <br> MONTANT A ENVOYER<h4>${this.depotForm.value.montant}</h4>
                    <br> RECEPTEUR<h4>${this.depotForm.value.prenomBeneficaire} ${this.depotForm.value.nomBeneficaire}</h4>
                    <br> NUMERO RECEPTEUR<h4>${this.depotForm.value.phoneBeneficiaire}</h4> `,
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Valider',
            handler: () => {

              this.transactionService.depot(this.depotForm.value).subscribe(data => {
                  this.GoodTransaction();
                  this.router.navigate(['/home']);
                }, error => {
                console.log('ERROR!!!!');
              });
            }
          }
        ]
      });

       await alert.present();

    }
}
