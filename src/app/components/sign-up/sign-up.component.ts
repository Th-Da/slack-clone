import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UtilsService } from 'src/app/services/utils.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DialogGuestUserComponent } from '../dialog-guest-user/dialog-guest-user.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    public authService: AuthService,
    public utils: UtilsService,
    public dialog: MatDialog
  ) {
    this.signUpForm = new FormGroup({
      password: new FormControl('', Validators.required),
      userDisplayName: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
    });
  }

  ngOnInit(): void {
    this.authService.checkAlreadyLoggedIn();
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.authService.signUp(
        this.signUpForm.value.userDisplayName,
        this.signUpForm.value.email,
        this.signUpForm.value.password
      );
    }
  }

  /**
   * Opens the guest login dialog
   */
  openGuestUserDialog() {
    this.dialog.open(DialogGuestUserComponent);
  }
}
