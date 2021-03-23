import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailAgencePageRoutingModule } from './detail-agence-routing.module';

import { DetailAgencePage } from './detail-agence.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailAgencePageRoutingModule
  ],
  declarations: [DetailAgencePage]
})
export class DetailAgencePageModule {}
