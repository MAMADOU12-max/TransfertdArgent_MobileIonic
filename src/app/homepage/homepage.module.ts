import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomepagePageRoutingModule } from './homepage-routing.module';
import { HomepagePage } from './homepage.page';
import {MenuPageModule} from '../menu/menu.module';
import {MenuComponent} from '../menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomepagePageRoutingModule
    // MenuPageModule
  ],
  declarations: [HomepagePage, MenuComponent]
})
export class HomepagePageModule {}
