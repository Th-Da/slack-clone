import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteUserComponent } from '../dialog-delete-user/dialog-delete-user.component';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /**
   * Opens a dialog to confirm the deletion of the user
   */
  openDeleteUserDialog() {
    this.dialog.open(DialogDeleteUserComponent);
  }

}
