import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.page.html',
  styleUrls: ['./list-user.page.scss'],
})
export class ListUserPage implements OnInit {

  users: any;
  user: any;
  action = false;
  sortDate = false;
  sortKey = null;
  sortUsername = false;
  globaliste = true;
  search = '';
  usersSearch: any;
  typeChoised: any;

  constructor(private userService: UserService) { }

    ngOnInit() {
        this.getAll();
    }

    getAll() {
      this.userService.getAllUsersActifs().subscribe(data => {
        this.users = data;
      });
    }

    completeAction(){ this.action = !this.action; }

    sortBy(key) {
      // console.log(key);
      if (key === 'username') {
        this.sortKey = key;
        this.sortUsername  = !this.sortUsername;
        this.sort(this.sortUsername);
      }
    }

    sort(valueA) {
      if (valueA) {
        this.users = this.users.sort((a, b) => {
          // console.log(a);
          const valA = a[this.sortKey];
          const valB = b[this.sortKey];
          return valA.localeCompare(valB);
        });
      } else {
        // if (this.sortDirection === 2)
        this.users = this.users.sort((a, b) => {
          // console.log(a);
          const valA = a[this.sortKey];
          const valB = b[this.sortKey];
          return valB.localeCompare(valA);
        });
      }
    }

    // search function
    toSearch(){
      // no search
      if (this.search === '') {
          this.ngOnInit();
      } else {
          // if research
          this.userService.getAllUsersActifs().subscribe( data => {
              this.users = data;
              // console.log(data);
              this.users = Object.values(this.users).filter( (res: any) => {
                  return res.username.toLocaleLowerCase().match(this.search.toLocaleLowerCase());
              });
          });
      }
    }

    typeUserChoised() {
      // tslint:disable-next-line:triple-equals
      if (this.typeChoised == 0) {
            this.filterbyType('adminagence');
        // tslint:disable-next-line:triple-equals
       } else if (this.typeChoised == 1) {
           this.filterbyType('adminsystem');
        // tslint:disable-next-line:triple-equals
       }else if (this.typeChoised == 2) {
           this.filterbyType('caissier');
        // tslint:disable-next-line:triple-equals
       }else if (this.typeChoised == 3) {
            this.filterbyType('useragence');
        // tslint:disable-next-line:triple-equals
       }else if (this.typeChoised == 4) {
            this.getAll();
       }
    }
    filterbyType(type: string) {
      this.userService.getAllUsersActifs().subscribe( data => {
          this.users = data;
          // console.log(data);
          this.users = Object.values(this.users).filter( (res: any) => {
            return res.type.toLocaleLowerCase().match(type.toLocaleLowerCase());
          });
        });
    }
}
