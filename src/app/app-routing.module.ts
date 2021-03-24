// @ts-ignore
import { NgModule } from '@angular/core';
// @ts-ignore
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'header',
    loadChildren: () => import('./header/header.module').then( m => m.HeaderPageModule)
  },
  {
    path: 'calculator',
    loadChildren: () => import('./calculator/calculator.module').then( m => m.CalculatorPageModule)
  },
  {
    path: 'depot',
    loadChildren: () => import('./Transaction/depot/depot.module').then(m => m.DepotPageModule)
  },
  {
    path: 'historique',
    loadChildren: () => import('./historique/historique.module').then( m => m.HistoriquePageModule)
  },
  {
    path: 'retrait',
    loadChildren: () => import('./Transaction/retrait/retrait.module').then(m => m.RetraitPageModule)
  },
  {
    path: 'mes-transactions',
    loadChildren: () => import('./Transaction/mes-transactions/mes-transactions.module').then(m => m.MesTransactionsPageModule)
  },
  {
    path: 'toutesles-transactions',
    // tslint:disable-next-line:max-line-length
    loadChildren: () => import('./Transaction/toutesles-transactions/toutesles-transactions.module').then(m => m.TouteslesTransactionsPageModule)
  },
  {
    path: 'mes-commissions',
    loadChildren: () => import('./mes-commissions/mes-commissions.module').then( m => m.MesCommissionsPageModule)
  },
  {
    path: 'depot-compte',
    loadChildren: () => import('./depot-compte/depot-compte.module').then( m => m.DepotComptePageModule)
  },
  {
    path: 'homepage',
    loadChildren: () => import('./homepage/homepage.module').then( m => m.HomepagePageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'add-user',
    loadChildren: () => import('./add-user/add-user.module').then( m => m.AddUserPageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'info-app-diouf-codeur',
    loadChildren: () => import('./info-app-diouf-codeur/info-app-diouf-codeur.module').then( m => m.InfoAppDioufCodeurPageModule)
  },
  {
    path: 'detail-user/:id',
    loadChildren: () => import('./detail-user/detail-user.module').then( m => m.DetailUserPageModule)
  },
  {
    path: 'list-user',
    loadChildren: () => import('./list-user/list-user.module').then( m => m.ListUserPageModule)
  },
  {
    path: 'detail-transaction',
    loadChildren: () => import('./IonicModal/detail-transaction/detail-transaction.module').then( m => m.DetailTransactionPageModule)
  },
  {
    path: 'agence',
    loadChildren: () => import('./Agence/agence/agence.module').then( m => m.AgencePageModule)
  },
  {
    path: 'detail-agence',
    loadChildren: () => import('./Agence/detail-agence/detail-agence.module').then( m => m.DetailAgencePageModule)
  },
  {
    path: 'edit-agence',
    loadChildren: () => import('./Agence/edit-agence/edit-agence.module').then( m => m.EditAgencePageModule)
  },
  {
    path: 'add-agence',
    loadChildren: () => import('./Agence/add-agence/add-agence.module').then( m => m.AddAgencePageModule)
  },
  {
    path: 'list-comptes',
    loadChildren: () => import('./Compte/list-comptes/list-comptes.module').then( m => m.ListComptesPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
