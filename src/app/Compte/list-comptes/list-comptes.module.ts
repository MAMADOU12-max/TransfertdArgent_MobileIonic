import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListComptesPageRoutingModule } from './list-comptes-routing.module';

import { ListComptesPage } from './list-comptes.page';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListComptesPageRoutingModule,
        NgxPaginationModule
    ],
  declarations: [ListComptesPage]
})
export class ListComptesPageModule {}
