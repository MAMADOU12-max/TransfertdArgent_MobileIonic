import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    // redirectTo: 'home',
    // pathMatch: 'full',
    component: TabsPage,
    children: [
      // {
      //   path: '',
      //   loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      // },
      {
        path: 'homepage',
        loadChildren: () => import('../homepage/homepage.module').then(m => m.HomepagePageModule)
      },
      {
        path: 'calculator',
        loadChildren: () => import('../calculator/calculator.module').then(m => m.CalculatorPageModule)
      },
      {
        path: 'depot',
        loadChildren: () => import('../Transaction/depot/depot.module').then(m => m.DepotPageModule)
      },
      {
        path: 'retrait',
        loadChildren: () => import('../Transaction/retrait/retrait.module').then(m => m.RetraitPageModule)
      },
      {
        path: 'mes-transactions',
        loadChildren: () => import('../Transaction/mes-transactions/mes-transactions.module').then(m => m.MesTransactionsPageModule)
      },
      {
        path: 'toutesles-transactions',
        loadChildren: () => import('../Transaction/toutesles-transactions/toutesles-transactions.module').then(m => m.TouteslesTransactionsPageModule)
      },
      {
        path: 'mes-commissions',
        loadChildren: () => import('../mes-commissions/mes-commissions.module').then( m => m.MesCommissionsPageModule)
      },
      {
        path: 'depot-compte',
        loadChildren: () => import('../depot-compte/depot-compte.module').then( m => m.DepotComptePageModule)
      },
      {
        path: 'add-user',
        loadChildren: () => import('../add-user/add-user.module').then( m => m.AddUserPageModule)
      },
      {
        path: 'detail-user/:id',
        loadChildren: () => import('../detail-user/detail-user.module').then( m => m.DetailUserPageModule)
      },
      {
        path: 'list-user',
        loadChildren: () => import('../list-user/list-user.module').then( m => m.ListUserPageModule)
      },
      {
        path: 'agence',
        loadChildren: () => import('../Agence/agence/agence.module').then( m => m.AgencePageModule)
      },
      {
        path: 'edit-agence',
        loadChildren: () => import('../Agence/edit-agence/edit-agence.module').then( m => m.EditAgencePageModule)
      },
      {
        path: 'add-agence',
        loadChildren: () => import('../Agence/add-agence/add-agence.module').then( m => m.AddAgencePageModule)
      },
      {
        path: 'list-comptes',
        loadChildren: () => import('../Compte/list-comptes/list-comptes.module').then( m => m.ListComptesPageModule)
      },
      {
        path: 'list-tarifs',
        loadChildren: () => import('../Tarifs/list-tarifs/list-tarifs.module').then( m => m.ListTarifsPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then( m => m.SettingsPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
