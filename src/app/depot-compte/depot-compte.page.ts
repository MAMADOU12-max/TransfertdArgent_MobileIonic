import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DepotService} from '../../services/depot.service';
import {AuthService} from '../../services/auth.service';
import {AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-depot-compte',
  templateUrl: './depot-compte.page.html',
  styleUrls: ['./depot-compte.page.scss'],
})
export class DepotComptePage implements OnInit {

  activeListe = true;
  activeNouveau = false;
  formMontant: FormGroup;
  montantDeDepot: AbstractControl;
  errorMessage: string;
  alldepot: any;
  // pagination
  page: number | undefined = 1;
  totalDepots: number | undefined;

  constructor(private formBuilder: FormBuilder, private depotService: DepotService, private authService: AuthService,
              private alertController: AlertController, private router: Router, private loadingController: LoadingController) { }

    ngOnInit() {
      this.formMontant = this.formBuilder.group({
        montantDeDepot: ['', [Validators.required]]
      });
      this.montantDeDepot = this.formMontant.controls.montantDeDepot;

      this.depotService.refresNeeded$.subscribe(() => {
          this.listDepot();
      });
      this.listDepot();
    }

    async listDepot() {
        const loading = await this.loadingController.create({
          cssClass: 'my-custom-class',
          message: 'chargement ...'
        });
        await loading.present();
        this.depotService.listDepot().subscribe(async data => {
           this.alldepot = data;
           this.totalDepots = this.alldepot.length;
           await loading.dismiss();
           // console.log(this.alldepot);
           // this.lenghtdata = this.alldepot.length;
           // console.log(this.lenghtdata);
        }, async error => {
           await loading.dismiss();
        });
    }

    segmentChanged(ev: any) {
      if (ev.detail.value === 'liste'){
        this.activeListe = true;
        this.activeNouveau = false;
      } else {
        this.activeListe = false;
        this.activeNouveau = true;
      }
    }

    async successDepot(successMessage: any, appreciation: string) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: appreciation,
        message: successMessage,
        buttons: ['OK']
      });

      await alert.present();
    }
    async deposer() {
        const loading = await this.loadingController.create({
          cssClass: 'my-custom-class',
          message: 'depot encours ...'
        });

        // console.log(this.formMontant.value);
        if (this.formMontant.value.montantDeDepot < 0) {
            this.errorMessage = 'Le montant ne peut pas être négatif!';
            return;
        } else if (this.formMontant.value.montantDeDepot === 0) {
            this.errorMessage = 'Le montant ne peut pas être null';
            return;
        }
        await loading.present();
        this.depotService.depot(this.formMontant.value).subscribe(data => {
           loading.dismiss();
           this.successDepot(data, 'Opération reussie!');
           this.router.navigate(['homepage']);
           this.formMontant.reset();
        }, error => {
            console.log(error);
            loading.dismiss();
        });
    }

  async annulerDepot() {

    // const loading = await this.loadingController.create({
    //   cssClass: 'my-custom-class',
    //   message: 'annulation encours ...'
    // });

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: 'Etes vous sûr de vouloir annuler ce dépôt?',
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

            // loading.present();

            this.depotService.annulerDepot().subscribe(data => {
                this.successDepot(data, 'Opération reussie!');
              //  loading.dismiss();
              }, error => {
                this.successDepot(error.error, 'Opération non reussie');
               // loading.dismiss();
              });

          }
        }
      ]
    });
    await alert.present();
  }

  rowselect(id: number) {

  }
}
