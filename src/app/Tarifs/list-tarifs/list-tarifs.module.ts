import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListTarifsPageRoutingModule } from './list-tarifs-routing.module';

import { ListTarifsPage } from './list-tarifs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListTarifsPageRoutingModule
  ],
  declarations: [ListTarifsPage]
})
export class ListTarifsPageModule {}
