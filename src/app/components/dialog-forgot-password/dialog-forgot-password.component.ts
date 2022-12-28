import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  resetPasswordForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
  });

  ngOnInit(): void { }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      this.authService.forgotPassword(this.resetPasswordForm.value.email);
      this.dialog.close();
    }
  }
}
