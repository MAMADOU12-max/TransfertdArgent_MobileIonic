import { Component } from '@angular/core';
import {CompteService} from '../../services/compte.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage{

  constructor(private compteService: CompteService, private router: Router) {}

  home() {
    // window.location.reload();
   // console.log('cool');
    this.router.navigate(['/homepage']);
   // window.stop();
  }
}
