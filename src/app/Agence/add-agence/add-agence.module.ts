import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAgencePageRoutingModule } from './add-agence-routing.module';

import { AddAgencePage } from './add-agence.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAgencePageRoutingModule
  ],
  declarations: [AddAgencePage]
})
export class AddAgencePageModule {}
