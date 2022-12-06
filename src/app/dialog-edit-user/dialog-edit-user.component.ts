import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogDeleteUserComponent } from '../dialog-delete-user/dialog-delete-user.component';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {

  constructor(public authService: AuthService, public dialog: MatDialog, public dialogRef: MatDialogRef<DialogEditUserComponent>) {
    this.authService.newDisplayName = this.authService.userData.displayName;
  }

  ngOnInit(): void {
  }

  /**
 * Opens a dialog to confirm the deletion of the user
 */
  openDeleteUserDialog() {
    this.dialog.open(DialogDeleteUserComponent);
  }

}
