import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.page.html',
  styleUrls: ['./depot.page.scss'],
})
export class DepotPage implements OnInit {

  activeBenefice = false;
  activeEmetteur = true;
  montant: number;
  user: number;
  nom: string;
  prenom: string;
  nomCompletEmetteur: string;
  phoneEmetteur: number;
  identityNumberEmetteur: number;
  nomCompletBeneficiaire: string;
  phoneBeneficiaire: number;
  beneficiaireForm: FormGroup;
  emetteurForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.emetteurForm = this.formBuilder.group({
          montant: ['', [Validators.required]],
          nom: ['', [Validators.required]],
          prenom: ['', [Validators.required]],
          nomCompletEmetteur: ['', [Validators.required]],
          phoneEmetteur: ['', [Validators.required]],
          identityNumberEmetteur: ['', [Validators.required]]
      });
      this.beneficiaireForm = this.formBuilder.group({
          nomCompletBeneficiaire: ['', [Validators.required]],
          phoneBeneficiaire: ['', [Validators.required]]
      });
  }

    segmentChanged(ev: any) {
         if (ev.detail.value === 'bénéficiaire'){
            this.activeBenefice = true;
            this.activeEmetteur = false;
            // console.log('bénéficiaire');
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

    Terminer() {
        this.nomCompletEmetteur = this.emetteurForm.value.prenom + ' ' + this.emetteurForm.value.nom;
        console.log(this.nomCompletEmetteur);
        // console.log(this.emetteurForm.value);
    }
}
