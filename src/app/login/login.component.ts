import { Component, OnInit, Injectable } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { MatDialog } from '@angular/material/dialog';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { DialogGuestUserComponent } from '../dialog-guest-user/dialog-guest-user.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService, public dialog: MatDialog) { }

  contactForm = new FormGroup({
    password: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
  });

  ngOnInit(): void {
    this.contactForm;
  }

  /**
   * Opens the forgot password dialog
   */
  openForgotPasswordDialog() {
    this.dialog.open(ForgotPasswordComponent);
  }

  /**
   * Opens the guest login dialog
   */
  openGuestUserDialog() {
    this.dialog.open(DialogGuestUserComponent);
  }
}
