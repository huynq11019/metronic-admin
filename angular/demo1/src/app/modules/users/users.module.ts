import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UserCommandComponent } from './user-command/user-command.component';
import {RouterModule, Routes} from "@angular/router";
import {DropdownMenusModule, ModalsModule, WidgetsModule} from "../../_metronic/partials";
import {InlineSVGModule} from "ng-inline-svg";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
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
    InlineSVGModule,
    ModalsModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
  ]
})
export class UsersModule { }
