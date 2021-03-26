import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AgenceService} from '../../../services/agence.service';
import {ProfilsService} from '../../../services/profils.service';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-add-agence',
  templateUrl: './add-agence.page.html',
  styleUrls: ['./add-agence.page.scss'],
})
export class AddAgencePage implements OnInit {

  allAgences: any;
  formAgence: FormGroup | any;
  submitted = false;
  errorMessage: string | undefined;
  nomAgence: string | undefined;
  adressAgence: string | undefined;
  solde: number | undefined;
  identifiantCompte: number;
  profil = '' ;
  agence: number;
  availableUsers: any;

  constructor(private agenceService: AgenceService, private userService: UserService,
              private formBuilder: FormBuilder, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.userService.getNoWorkUsers().subscribe(agences => {
      this.availableUsers = agences ;
      // console.log(this.availableUsers);
    });

    this.formAgence = this.formBuilder.group({
        nomAgence: ['', [Validators.required, Validators.minLength(3)]],
        adressAgence: ['', [Validators.required, Validators.minLength(2)]],
        solde: ['', [Validators.required, Validators.min(700000)]],
        identifiantCompte: ['', [Validators.required]],
        users: ['', [Validators.required, Validators.minLength(4)]]
    }) ;
  }

  // tslint:disable-next-line:typedef
  get Validations() {
     return this.formAgence.controls;
  }

  async GoodTransaction(messageTransaction: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Reussie',
      message: messageTransaction,
      buttons: ['OK']
    });

    await alert.present();
  }

    entierAleatoire(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
// Utilisation
// La variable contient un nombre aléatoire compris entre 1 et 10
//   var entier = entierAleatoire(1, 10);

  async CreateAgence() {
     this.submitted = true;
     this.formAgence.value.identifiantCompte = this.entierAleatoire(1000, 100000);
     console.log(this.formAgence.value);

     const compte = {
        solde: this.formAgence.value.solde,
         identifiantCompte: this.formAgence.value.identifiantCompte
     };
    // tslint:disable-next-line:max-line-length
     this.agenceService.addAgence(this.formAgence.value.nomAgence, this.formAgence.value.adressAgence, compte, this.formAgence.value.users).subscribe(
       data => {
         this.GoodTransaction('Vous venez d\'ajouter une nouvélle agence.');
         this.formAgence.reset();
         this.router.navigate(['/tabs/agence']);
       }, error => {
           this.errorMessage = error.error;
           return;
       });
  }
}
