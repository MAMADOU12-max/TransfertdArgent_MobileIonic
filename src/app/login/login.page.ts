import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoadingController, NavController} from '@ionic/angular';
import {JwtHelperService} from '@auth0/angular-jwt';

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
   connected = false;
   roleuser: string;
   helper = new JwtHelperService() ;

   constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService,
               private navController: NavController, public loadingController: LoadingController) { }

    ngOnInit() {
        // localStorage.clear();
        this.registrationForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.username = this.registrationForm.controls.username;
        this.password = this.registrationForm.controls.password;
    }

    async connect() {
        const loading = await this.loadingController.create({
          cssClass: 'my-custom-class',
          message: 'chargement...'
        });
        await loading.present();
        this.submitted = true;

         // tslint:disable-next-line:max-line-length
        this.authService.Authentification(this.registrationForm.value.username, this.registrationForm.value.password).subscribe(data => {
                  loading.dismiss();
                  const token = localStorage.getItem('token') ;
                     // this.response = data;
                  const tokenDecoded = this.helper.decodeToken(token) ;
                  this.roleuser = tokenDecoded.roles ;
                  console.log(this.roleuser[0]);
                  if (this.roleuser[0] === 'ROLE_CAISSIER') {
                       this.router.navigateByUrl('/homepage');
                  } else if (this.roleuser[0] === 'ROLE_ADMINSYSTEM') {
                       this.router.navigateByUrl('/homepage');
                  } else if (this.roleuser[0] === 'ROLE_USERAGENCE') {
                       this.router.navigateByUrl('/homepage');
                  }
             }, error => {
              this.errorData = true;
              loading.dismiss();
              return;
        });
    }
}
