import { Component, OnInit } from '@angular/core';
import {AgenceService} from '../../services/agence.service';
import {ProfilsService} from '../../services/profils.service';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

    allAgences: any;
    allProfis: any;
    formUser: FormGroup | any;
    otherForm: FormGroup;
    submitted = false;
    errorSubmitted = false;
    selectedFile: any ;
    url: any;
    msg = '';
    firstname: string | undefined;
    lastname: string | undefined;
    email: string | undefined;
    phone: number;
    password: string | undefined;
    confirmPassword: string | undefined;
    errorConfirmPassword: boolean;
    avatar: string | undefined;
    username: string | undefined;
    profil = '' ;
    address: string;
    agence: number;

    constructor(private agenceService: AgenceService, private profilsService: ProfilsService, private userService: UserService,
                private formBuilder: FormBuilder, private router: Router, private alertController: AlertController) { }

    ngOnInit() {
       this.agenceService.allAgences().subscribe(agences => {
         this.allAgences = agences ;
       });

       this.profilsService.allprofils().subscribe(profils => {
         this.allProfis = profils ;
       });

       this.formUser = this.formBuilder.group({
          firstname: ['', [Validators.required, Validators.minLength(3)]],
          lastname: ['', [Validators.required, Validators.minLength(2)]],
          password: ['', [Validators.required, Validators.minLength(5)]],
          profil: ['', [Validators.required]],
          username: ['', [Validators.required, Validators.minLength(4)]],
          phone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
          identityNum: ['', [Validators.required, Validators.minLength(9)]],
          avatar: [''],
          agence: [''],
          address: ['']
       }) ;
       this.otherForm = this.formBuilder.group({
          confirmPassword: ['', [Validators.required]],
       });
    }

    // tslint:disable-next-line:typedef
    get Validations() {
        return this.formUser.controls;
    }
    get Val() {
        return this.otherForm.controls;
    }

    Uploadefiler(event: any): any {
        // tslint:disable-next-line:triple-equals
        if (!event.target.files[0] || event.target.files[0].length == 0) {
          this.msg = 'You must select an image';
          console.log('You must select an image');
          return;
        }
        this.selectedFile = event.target.files[0] ;

        const mimeType = event.target.files[0].type;

        if (mimeType.match(/image\/*/) == null) {
          this.msg = 'Only images are supported';
          return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        // tslint:disable-next-line:variable-name
        reader.onload = (_event) => {
          this.msg = '';
          this.url = reader.result;
        };
    }

    confirmPasswordVerify($event: KeyboardEvent) {
       // console.log(this.password);
       if (this.confirmPassword !== this.password) {
           this.errorConfirmPassword = true;
       } else  {
          this.errorConfirmPassword = false;
       }
     //  console.log(this.confirmPassword);
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


    async CreateUser() {
        if (this.errorConfirmPassword === true) {
          return;
        }

        const formValue = this.formUser.value ;
        const formData = new FormData();
        for (const key of Object.keys(formValue)) {
          if (key !== 'photo') {
            const value =  formValue[key] ;
            // console.log(value);
            formData.append(key, value) ;
          }
          // console.log(formData) ;
        }
        if (this.selectedFile) {
            formData.append('photo',  this.selectedFile) ;
        }
        // console.log(this.formUser.value); return;
        this.userService.addnewUser(formData).subscribe(data => {
            this.router.navigate(['homepage']);
            this.GoodTransaction('L\'utilisateur a été ajouté avec succés!');
            this.formUser.reset();
            this.otherForm.reset();
        }, error => {
            console.log(error);
        });
    }
}
