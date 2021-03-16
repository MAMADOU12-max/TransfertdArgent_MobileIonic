import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DepotService} from '../../services/depot.service';
import {AuthService} from '../../services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
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
  montant: AbstractControl;
  helper = new JwtHelperService() ;
  idUser: number;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private depotService: DepotService, private authService: AuthService,
              private alertController: AlertController, private router: Router, private loadingController: LoadingController) { }

  ngOnInit() {
    this.formMontant = this.formBuilder.group({
      montant: ['', [Validators.required]]
    });
    this.montant = this.formMontant.controls.montant;

    // get id user
    const token = this.authService.getToken() ;
    this.idUser = this.helper.decodeToken(token).id ;
  //  console.log(this.idUser);
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
  async loadingDepot() {
    // console.log(this.connected);
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'depot encours ...',
      duration: 200
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }

  deposer() {
      if (this.formMontant.value.montant < 0) {
          this.errorMessage = 'Le montant ne peut pas être négatif!';
          return;
      } else if (this.formMontant.value.montant === 0) {
          this.errorMessage = 'Le montant ne peut pas être null';
          return;
      }
      this.depotService.depot(this.formMontant.value.montant, this.idUser).subscribe(data => {
         this.loadingDepot();
         this.successDepot(data);
         this.router.navigate(['homepage']);
         this.formMontant.reset();
      });
  }
}
