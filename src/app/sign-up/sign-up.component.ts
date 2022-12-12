import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UtilsService } from '../_services/utils.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public utils: UtilsService,
    public dialog: MatDialog
  ) {}

  contactForm = new FormGroup({
    password: new FormControl('', Validators.required),
    userDisplayName: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
  });

  ngOnInit(): void {
    this.contactForm;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.authService.signUp(
        this.contactForm.value.password,
        this.contactForm.value.email,
        this.contactForm.value.userDisplayName
      );
    }
  }
}
