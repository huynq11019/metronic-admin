import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IUserModel} from "../../auth";
import {UserService} from "../../auth/services/user.service";
import {Observable, of} from "rxjs";

const USER_FIELD = {
  id: 'id',
  // username: 'username',
  fullname: 'fullname',
  email: 'email',
  pic: 'pic',
  roles: 'roles',
  phone: 'phone',
  // address: 'address',
  language: 'language',
  timeZone: 'timeZone',
  createdAt: 'createdAt',
  communication: 'communication',
}

@Component({
  selector: 'app-user-command',
  templateUrl: './user-command.component.html',
  styleUrls: ['./user-command.component.scss']
})
export class UserCommandComponent implements OnInit {


  /*
     * =================   Constants   =================
     * @description Block code for Fixed values
     * @note: uppercase
     */
  readonly USER_FIELD = USER_FIELD;
  /*
   * =================   Logic Data   =================
   * @description Block code for Data for logic: form, domainData,...
   */

  /*
   * =================   Extra Data   =================
   * @description Block code for Data for component: data for autocomplete, search
   */

  form?: FormGroup;
  domainData?: IUserModel;

  /*
   * =================   Life Cycle   =================
   * @description Block code for Execute when load component
   */
  constructor(
    public dialogRef: MatDialogRef<UserCommandComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('data', data)
    this.domainData = data.domainData;
  }


  ngOnInit(): void {
    this.initForm();
  }

  /*
   * =================   Handler Form   =================
   * @description Block code for Handler form: Init form, subscribe form change, ...
   */
  initForm(): void {
    this.form = this.fb.group({
      [USER_FIELD.id]: [this.domainData?.id],
      // [USER_FIELD.username]: [this.domainData?.username],
      [USER_FIELD.fullname]: [this.domainData?.fullname],
      [USER_FIELD.email]: [this.domainData?.email],
      [USER_FIELD.pic]: [this.domainData?.pic],
      [USER_FIELD.roles]: [this.domainData?.roles],
      [USER_FIELD.phone]: [this.domainData?.phone],
      // [USER_FIELD.address]: [this.domainData?.address],
      [USER_FIELD.language]: [this.domainData?.language],
      [USER_FIELD.timeZone]: [this.domainData?.timeZone],
      [USER_FIELD.createdAt]: [this.domainData?.createdAt],
      [USER_FIELD.communication]: [this.domainData?.communication],
    })
  }

  /*
   * =================   Actions   =================
   * @description Block code for Handler actions
   * @syntax on<Name>: onCreate, onUpdate
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;

    }
    this.dialogRef.close(this.form.value);
  }

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

  createCommand$(): Observable<string> {
    return of('createCommand');
  }

  updateCommand(): Observable<string> {
    return of('updateCommand');
  }


  /*
   * =================   FetchAPI   ===================
   * @description Block code for Execute when call API for fetch data: GET
   * @syntax fetch<name>: fetchBuilding
   */

  /*
   * =================   Utils   =================
   * @description Block code for Function support for component
   */
}
