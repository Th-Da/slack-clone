import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-dialog-account',
  templateUrl: './dialog-account.component.html',
  styleUrls: ['./dialog-account.component.scss']
})
export class DialogAccountComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogAccountComponent>
  ) { }

  ngOnInit(): void {
  }

  /**
   * Opens a dialog to edit the user
   */
  openEditUserDialog() {
    this.dialog.open(DialogEditUserComponent);
  }

}
