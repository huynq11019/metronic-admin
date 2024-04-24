import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-user-command',
  templateUrl: './user-command.component.html',
  styleUrls: ['./user-command.component.scss']
})
export class UserCommandComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserCommandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('data', data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
