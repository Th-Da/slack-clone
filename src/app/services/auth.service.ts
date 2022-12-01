import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLoggedIn: boolean;
  userData: any;

  constructor(private router: Router, public afAuth: AngularFireAuth, private firstoreService: FirestoreService) {
    this.userLoggedIn = false;

    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    });
  }


  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.firstoreService.userData = result.user;
        console.log('User logged in: ', result.user);
        // console.log(result.user.uid);
        console.log('Auth Service: loginUser: success');
        this.router.navigate(['/chat']);
      })
      .catch(error => {
        console.log('Auth Service: login error...');
        console.log('error code', error.code);
        console.log('error', error);
        // if (error.code)
        //   return { isValid: false, message: error.message };
      });
  }


  signupUser(user: any): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        let emailLower = user.email.toLowerCase();
        if (result.user) {
          result.user.sendEmailVerification();                    // immediately send the user a verification email
        }
        this.firstoreService.userData = user;
        console.log('User signed up: ', this.firstoreService.userData);
      })
      .catch(error => {
        console.log('Auth Service: signup error', error);
        console.log('error code', error.code);
        console.log('error', error);
        // if (error.code)
        //   return { isValid: false, message: error.message };
      });
  }

}