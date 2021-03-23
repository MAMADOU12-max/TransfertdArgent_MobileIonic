import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAgencePageRoutingModule } from './edit-agence-routing.module';

import { EditAgencePage } from './edit-agence.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAgencePageRoutingModule
  ],
  declarations: [EditAgencePage]
})
export class EditAgencePageModule {}
