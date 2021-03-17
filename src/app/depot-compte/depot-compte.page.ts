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

  constructor(private formBuilder: FormBuilder, private depotService: DepotService, private authService: AuthService,
              private alertController: AlertController, private router: Router, private loadingController: LoadingController) { }

  ngOnInit() {
    this.formMontant = this.formBuilder.group({
      montantDeDepot: ['', [Validators.required]]
    });
    this.montantDeDepot = this.formMontant.controls.montantDeDepot;
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

  async successDepot(successMessage: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Opération reussie!',
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
      await loading.present();
      console.log(this.formMontant.value);
      if (this.formMontant.value.montantDeDepot < 0) {
          this.errorMessage = 'Le montant ne peut pas être négatif!';
          return;
      } else if (this.formMontant.value.montantDeDepot === 0) {
          this.errorMessage = 'Le montant ne peut pas être null';
          return;
      }
      this.depotService.depot(this.formMontant.value).subscribe(data => {
         this.successDepot(data);
         this.router.navigate(['homepage']);
         loading.dismiss();
         this.formMontant.reset();
      }, error => {
          console.log(error);
          loading.dismiss();
      });
  }
}
