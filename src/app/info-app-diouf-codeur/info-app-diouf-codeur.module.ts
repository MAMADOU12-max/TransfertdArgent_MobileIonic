import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoAppDioufCodeurPageRoutingModule } from './info-app-diouf-codeur-routing.module';

import { InfoAppDioufCodeurPage } from './info-app-diouf-codeur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoAppDioufCodeurPageRoutingModule
  ],
  declarations: [InfoAppDioufCodeurPage]
})
export class InfoAppDioufCodeurPageModule {}
