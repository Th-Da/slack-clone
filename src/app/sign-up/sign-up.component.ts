import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    signupForm: FormGroup = new FormGroup({
        'displayName': new FormControl('', Validators.required),
        'email': new FormControl('', [Validators.required, Validators.email]),
        'password': new FormControl('', Validators.required)
    });

    firebaseErrorMessage: string;

    constructor(private authService: AuthService, private router: Router) {
        this.firebaseErrorMessage = '';
    }

    ngOnInit(): void {
    }

    signup() {
        if (this.signupForm.invalid) { // if there's an error in the form, don't submit it
            return;
        }

        this.authService.signupUser(this.signupForm.value).then((result) => {
            if (result == null)                                 // null is success, false means there was an error
                this.router.navigate(['/chat']);
            else if (result.isValid == false)
                this.firebaseErrorMessage = result.message;
        }).catch((error) => {
            console.log('Sign up error: ', error);
        });
    }
}

