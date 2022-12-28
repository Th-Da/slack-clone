import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/_services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-guest-user',
  templateUrl: './dialog-guest-user.component.html',
  styleUrls: ['./dialog-guest-user.component.scss'],
})
export class DialogGuestUserComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public dialogRef: MatDialogRef<DialogGuestUserComponent>
  ) { }

  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.contactForm;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.authService.guestLogin(this.contactForm.value.name);
      this.dialogRef.close();
    }
  }
}
