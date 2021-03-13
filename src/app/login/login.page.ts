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
               private navController: NavController) { }

    ngOnInit() {
        this.registrationForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
        });

        this.username = this.registrationForm.controls.username;
        this.password = this.registrationForm.controls.password;
    }

    connect() {
      this.submitted = true;
      // if (this.registrationForm.controls.username.errors) {
      //   console.log('errors username');
      // }
      this.authService.Authentification(this.registrationForm.value.username, this.registrationForm.value.password).subscribe(data => {
            console.log(data);
       }, error => {
        this.errorData = true;
        return;
      });
    }
}
