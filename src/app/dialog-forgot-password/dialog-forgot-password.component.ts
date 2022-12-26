import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-forgot-password',
  templateUrl: './dialog-forgot-password.component.html',
  styleUrls: ['./dialog-forgot-password.component.scss'],
})
export class DialogForgotPasswordComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public dialog: MatDialogRef<DialogForgotPasswordComponent>
  ) { }

  ngOnInit(): void { }
}
