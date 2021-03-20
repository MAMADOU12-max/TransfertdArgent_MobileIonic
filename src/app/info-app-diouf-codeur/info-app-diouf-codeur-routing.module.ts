import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoAppDioufCodeurPage } from './info-app-diouf-codeur.page';

const routes: Routes = [
  {
    path: '',
    component: InfoAppDioufCodeurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoAppDioufCodeurPageRoutingModule {}
