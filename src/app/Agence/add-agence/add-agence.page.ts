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
  allProfis: any;
  formAgence: FormGroup | any;
  submitted = false;
  errorSubmitted = false;
  selectedFile: any ;
  url: any;
  msg = '';
  nomAgence: string | undefined;
  adressAgence: string | undefined;
  solde: string | undefined;
  profil = '' ;
  agence: number;
  availableUsers: any;

  constructor(private agenceService: AgenceService, private userService: UserService,
              private formBuilder: FormBuilder, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.userService.getNoWorkUsers().subscribe(agences => {
      this.availableUsers = agences ;
    });

    this.formAgence = this.formBuilder.group({
        nomAgence: ['', [Validators.required, Validators.minLength(3)]],
        adressAgence: ['', [Validators.required, Validators.minLength(2)]],
        solde: ['', [Validators.required, Validators.minLength(5)]],
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


  async CreateGence() {
    console.log(this.formAgence.value);
    // const formValue = this.formUser.value ;
    // const formData = new FormData();
    // for (const key of Object.keys(formValue)) {
    //   if (key !== 'photo') {
    //     const value =  formValue[key] ;
    //     // console.log(value);
    //     formData.append(key, value) ;
    //   }
    //   // console.log(formData) ;
    // }
    // if (this.selectedFile) {
    //   formData.append('photo',  this.selectedFile) ;
    // }
    // // console.log(this.formUser.value); return;
    // this.userService.addnewUser(formData).subscribe(data => {
    //   this.router.navigate(['homepage']);
    //   this.GoodTransaction('L\'utilisateur a été ajouté avec succés!');
    //   this.formUser.reset();
    //   this.otherForm.reset();
    // }, error => {
    //   console.log(error);
    // });
  }
}
