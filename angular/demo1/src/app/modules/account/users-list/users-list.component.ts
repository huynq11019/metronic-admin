import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from "../../auth/services/user.service";
import {IUserModel, RoleMap} from "../../auth";
import {MatDialog} from "@angular/material/dialog";
import {UserCommandComponent} from "../user-command/user-command.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {


  /*
     * =================   Constants   =================
     * @description Block code for Fixed values
     * @note: uppercase
     */
  protected readonly RoleMap = RoleMap;

  /*
   * =================   Logic Data   =================
   * @description Block code for Data for logic: form, domainData,...
   */
  result: IUserModel[] = [];
  /*
   * =================   Extra Data   =================
   * @description Block code for Data for component: data for autocomplete, search
   */


  /*
   * =================   Life Cycle   =================
   * @description Block code for Execute when load component
   */
  constructor(private userService: UserService,
              public dialog: MatDialog,
              private router: Router,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.onSearch()
  }

  /*
   * =================   Handler Form   =================
   * @description Block code for Handler form: Init form, subscribe form change, ...
   */

  /*
   * =================   Actions   =================
   * @description Block code for Handler actions
   * @syntax on<Name>: onCreate, onUpdate
   */

  /*
   * =================   Router   =================
   * @description Block code for Handler router: redirect
   * @syntax to<Name>: toDetail, toUpdate
   */

  /*
   * =================   PushAPI   ===================
   * @description Block code for Execute when call API for handle change data: POST, PUT, ...
   * @syntax <action><name>: createBuilding
   */


  /*
   * =================   FetchAPI   ===================
   * @description Block code for Execute when call API for fetch data: GET
   * @syntax fetch<name>: fetchBuilding
   */
  onSearch(): void {
    this.userService.search({
      keyword: '',
      pageSize: 10,
    }).subscribe(res => {
      console.log('xxxx', res)
      this.result = res;
      this.cdr.detectChanges()
    })
  }

  onDetail(item: IUserModel): void {
// this.router.navigate(['/crafted/account', item.id,'detail'])
    this.createAccount()

  }

  createAccount(): void {
    const dialogRef = this.dialog.open(UserCommandComponent, {
      data: {name: 'xxx'},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  /*
   * =================   Utils   =================
   * @description Block code for Function support for component
   */

}
