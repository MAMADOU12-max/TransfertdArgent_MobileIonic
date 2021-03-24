import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAgencePageRoutingModule } from './add-agence-routing.module';

import { AddAgencePage } from './add-agence.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddAgencePageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [AddAgencePage]
})
export class AddAgencePageModule {}
