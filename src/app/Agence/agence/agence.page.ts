import { Component, OnInit } from '@angular/core';
import {AgenceService} from '../../../services/agence.service';
import {LoadingController, ModalController} from '@ionic/angular';
import {DetailAgencePage} from '../detail-agence/detail-agence.page';
import {AddAgencePage} from '../add-agence/add-agence.page';
import {Router} from '@angular/router';

@Component({
  selector: 'app-agence',
  templateUrl: './agence.page.html',
  styleUrls: ['./agence.page.scss'],
})
export class AgencePage implements OnInit {

    allAgences: any;
    // pagination
    page: number | undefined = 1;
    totalDepots: number | undefined;
    sortNom = false;
    sortAddress = false;
    sortKey = null;
    recherch = false;
    searching: any;
    oneAgence: any;

    // tslint:disable-next-line:max-line-length
    constructor(private agenceService: AgenceService, private modalController: ModalController, private loadingController: LoadingController,
                private router: Router) { }

    ngOnInit() {
      this.agenceService.refresNeeded$.subscribe(() => {
        this.listAgene();
      });
      this.listAgene();
    }

    async listAgene() {
        const loading = await this.loadingController.create({
          cssClass: 'my-custom-class',
          message: 'chargement ...'
        });
        await loading.present();
        this.agenceService.allAgences().subscribe(data => {
           // console.log(data);
           this.allAgences = data;
           loading.dismiss();
        }, error => {
          loading.dismiss();
        });
    }

    sortBy(key) {
        // console.log(key);
        if (key === 'nomAgence') {
            this.sortKey = key;
            this.sortNom  = !this.sortNom;
            this.sort(this.sortNom);
        } else if (key === 'adressAgence') {
            this.sortKey = key;
            this.sortAddress  = !this.sortAddress;
            this.sort(this.sortAddress);
        }
    }

    sort(valueA) {
        if (valueA) {
            this.allAgences = this.allAgences.sort((a, b) => {
                // console.log(a);
                const valA = a[this.sortKey];
                const valB = b[this.sortKey];
                return valA.localeCompare(valB);
            });
        } else {
            this.allAgences = this.allAgences.sort((a, b) => {
                // console.log(a);
                const valA = a[this.sortKey];
                const valB = b[this.sortKey];
                return valB.localeCompare(valA);
            });
        }
    }

    async presentModal(data: any) {
        const modal = await this.modalController.create({
            component: DetailAgencePage,
            cssClass: 'my-custom-class',
            componentProps: {
              agenceselected: data,
            }
        });
        return await modal.present();
    }

    async rowselect(id: number) {
        // console.log(id);
        const loading = await this.loadingController.create({
          cssClass: 'my-custom-class',
          message: 'chargement ...'
        });
        await loading.present();
        this.agenceService.getAgenceById(id).subscribe( data => {
          this.oneAgence = data;
          this.presentModal(this.oneAgence);
          loading.dismiss();
          // console.log(data);
        }, error => {
          console.log(error);
          loading.dismiss();
        });
    }

    searchActve() { this.recherch = !this.recherch; }

    async newAgence() {
        this.router.navigate(['/tabs/add-agence']);
    }

    ToSearch() {
        // no search
      // tslint:disable-next-line:triple-equals
        if (this.searching == '') {
          this.ngOnInit();
        } else {
          // if research
          this.agenceService.allAgences().subscribe( data => {
            this.allAgences = data;

            this.allAgences = Object.values(this.allAgences).filter( (res: any) => {
              return res.nomAgence.toLocaleLowerCase().match(this.searching.toLocaleLowerCase());
            });
          });
        }
    }

}
