import { Component, OnInit } from '@angular/core';
import { CompteService } from '../../../services/compte.service';
import {LoadingController, ModalController} from '@ionic/angular';
import {DetailAgencePage} from '../../Agence/detail-agence/detail-agence.page';
import {AgenceService} from '../../../services/agence.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-comptes',
  templateUrl: './list-comptes.page.html',
  styleUrls: ['./list-comptes.page.scss'],
})
export class ListComptesPage implements OnInit {

    comptes: any;
    page = 0;
    oneAgence: any;
    recherch = false;
    searching: any;

    constructor(private compteService: CompteService, private loadingController: LoadingController,
                private modalController: ModalController, private agenceService: AgenceService,
                private router: Router) { }

    ngOnInit() {
        this.compteService.refresNeeded$.subscribe(() => {
            this.allCompte();
        });
        this.allCompte();
    }

    async allCompte() {
        const loading = await this.loadingController.create({
          cssClass: 'my-custom-class',
          message: 'chargement ...'
        });
        await loading.present();
        this.compteService.allCompte().subscribe(data => {
              this.comptes = data;
              loading.dismiss();
        }, error => {
            loading.dismiss();
        });
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

    searchActve() { this.recherch = !this.recherch; }

    async rowselect(id) {
      console.log(id);
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

    ToSearch() {
      // // no search
      // // tslint:disable-next-line:triple-equals
      // if (this.searching == '') {
      //   this.ngOnInit();
      // } else {
      //   // if research
      //   this.compteService.allCompte().subscribe( data => {
      //     this.comptes = data;
      //
      //     this.comptes = Object.values(this.comptes).filter( (res: any) => {
      //         return res.identifiantCompte.toLocaleLowerCase().match(this.searching.toLocaleLowerCase());
      //     });
      //   });
      // }
    }

    newAgence() {
      this.router.navigate(['/tabs/add-agence']);
    }
}
