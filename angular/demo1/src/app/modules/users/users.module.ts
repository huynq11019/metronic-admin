import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UserCommandComponent } from './user-command/user-command.component';
import {RouterModule, Routes} from "@angular/router";
import {DropdownMenusModule, WidgetsModule} from "../../_metronic/partials";
import {InlineSVGModule} from "ng-inline-svg";

const routes: Routes = [{
  path: '',
  component: UsersListComponent,
},
  {
    path: 'add',
    component: UserCommandComponent,
  }
]

@NgModule({
  declarations: [
    UsersListComponent,
    UserCommandComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetsModule,
    DropdownMenusModule,
    InlineSVGModule
  ]
})
export class UsersModule { }
