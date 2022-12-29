import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-guest-user',
  templateUrl: './dialog-guest-user.component.html',
  styleUrls: ['./dialog-guest-user.component.scss'],
})
export class DialogGuestUserComponent {
  constructor(
    public authService: AuthService,
    public dialogRef: MatDialogRef<DialogGuestUserComponent>
  ) { }

  contactForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.contactForm.valid) {
      this.authService.guestLogin(this.contactForm.value.name);
      this.dialogRef.close();
    }
  }
}
