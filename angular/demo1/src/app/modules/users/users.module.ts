import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UserCommandComponent } from './user-command/user-command.component';



@NgModule({
  declarations: [
    UsersListComponent,
    UserCommandComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsersModule { }
