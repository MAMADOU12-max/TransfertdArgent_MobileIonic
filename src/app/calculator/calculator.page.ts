import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController} from '@ionic/angular';
import {FraisService} from '../../services/frais.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {

    frais: FormGroup;
    montant: AbstractControl;
    errorNum = false;
    errorData = false;
    submitted = false;
    fraisofThisprice: number | any;

    constructor(private formBuilder: FormBuilder, private alertController: AlertController,
                private fraisService: FraisService) { }

    ngOnInit() {
        this.frais = this.formBuilder.group({
            montant: ['', Validators.required]
        });
        this.montant = this.frais.controls.username;
    }

    async _alert(price: number) {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Calculateur',
            message: 'Le frais de transaction est ' + price + 'fcfa',
            // message: `<h3>This is a custom alert</h3>
            //             <span>Lorem ipsum dolor sit.</span>
            //         <button color="primary">Go to second page</button>`,
            buttons: [{
                text: 'Ok',
                cssClass: 'retourAlert',
                handler: () => {
                  console.log('Confirm Okay');
                }
            }]
          });
        await alert.present();
    }

   async Calculer(){
        if (this.frais.value.montant < 0) {
            this.errorNum = true;
            console.log('not valid');
            return;
        }
        this.fraisService.returnFrais(this.frais.value.montant).subscribe(data => {
             this.fraisofThisprice = data;
             setTimeout( () => {
               this._alert(this.fraisofThisprice);
              }, 200);
        });
    }

}
