import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoadingController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

   registrationForm: FormGroup;
   username: AbstractControl;
   password: AbstractControl;
   errorData = false;
   submitted = false;

   constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService,
               private navController: NavController, public loadingController: LoadingController) { }

    ngOnInit() {
        this.registrationForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.username = this.registrationForm.controls.username;
        this.password = this.registrationForm.controls.password;
    }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 400
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

    connect() {
        this.submitted = true;
        // if (this.registrationForm.controls.username.errors) {
        //   console.log('errors username');
        // }
        this.presentLoading().then( () => {
          // tslint:disable-next-line:max-line-length
            this.authService.Authentification(this.registrationForm.value.username, this.registrationForm.value.password).subscribe(data => {
                  // console.log(data);
             }, error => {
              this.errorData = true;
              return;
            });
         });
    }
}
