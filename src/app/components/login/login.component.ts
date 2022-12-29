import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { DialogForgotPasswordComponent } from '../dialog-forgot-password/dialog-forgot-password.component';
import { DialogGuestUserComponent } from '../dialog-guest-user/dialog-guest-user.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    public authService: AuthService,
    public dialog: MatDialog
  ) {
    this.loginForm = new FormGroup({
      password: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
    });
  }

  /**
   * checks if the form is valid befor signing in
   * @param userEmail value from intputfield email
   * @param userPassword value from intputfield password
   */
  onSubmit(userEmail: string, userPassword: string) {
    if (this.loginForm.valid) {
      this.authService.signIn(userEmail, userPassword);
    }
  }

  /**
   * Opens the forgot password dialog
   */
  openForgotPasswordDialog() {
    this.dialog.open(DialogForgotPasswordComponent);
  }

  /**
   * Opens the guest login dialog
   */
  openGuestUserDialog() {
    this.dialog.open(DialogGuestUserComponent);
  }
}
